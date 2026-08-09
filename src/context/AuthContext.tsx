"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, EntitlementKey } from "@/types/auth";
import { MOCK_USERS } from "@/data/mockUserData";
import { MenuItem } from "@/backend/services/menuService";

interface AuthContextType {
  user: UserProfile;
  isLoggedIn: boolean;
  jwtToken: string | null;
  allowedMenus: MenuItem[];
  allMockUsers: UserProfile[];
  switchUser: (userId: string) => void;
  setAuthSession: (token: string, user: UserProfile, allowedMenus: MenuItem[]) => void;
  logout: () => void;
  hasEntitlement: (key: EntitlementKey) => boolean;
  updateUserProgress: (completedLessonId?: string, simulationRun?: boolean, tradeLogged?: boolean) => void;
  isSuperAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserProfile>(MOCK_USERS[0]);
  const [usersList, setUsersList] = useState<UserProfile[]>(MOCK_USERS);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [allowedMenus, setAllowedMenus] = useState<MenuItem[]>([]);

  useEffect(() => {
    // Sync from local storage if available
    const savedUserId = localStorage.getItem("albireo_active_user_id");
    const savedLoggedIn = localStorage.getItem("albireo_is_logged_in");
    const savedToken = localStorage.getItem("albireo_jwt_token");
    const savedMenus = localStorage.getItem("albireo_allowed_menus");

    if (savedLoggedIn === "true") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    if (savedToken) {
      setJwtToken(savedToken);
    }

    if (savedMenus) {
      try {
        setAllowedMenus(JSON.parse(savedMenus));
      } catch (e) {
        // ignore parse error
      }
    }

    if (savedUserId) {
      const found = usersList.find((u) => u.id === savedUserId);
      if (found) setCurrentUser(found);
    }
  }, []);

  const setAuthSession = (token: string, user: UserProfile, menus: MenuItem[]) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    setJwtToken(token);
    setAllowedMenus(menus);

    localStorage.setItem("albireo_active_user_id", user.id);
    localStorage.setItem("albireo_is_logged_in", "true");
    localStorage.setItem("albireo_jwt_token", token);
    localStorage.setItem("albireo_allowed_menus", JSON.stringify(menus));
  };

  const switchUser = async (userId: string) => {
    const found = usersList.find((u) => u.id === userId);
    if (found) {
      try {
        const res = await fetch(`/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: found.email })
        });
        const data = await res.json();
        if (data.success && data.token) {
          setAuthSession(data.token, data.user, data.allowedMenus);
          return;
        }
      } catch (e) {
        // fallback local set
      }

      setCurrentUser(found);
      setIsLoggedIn(true);
      localStorage.setItem("albireo_active_user_id", userId);
      localStorage.setItem("albireo_is_logged_in", "true");
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setJwtToken(null);
    setAllowedMenus([]);
    localStorage.setItem("albireo_is_logged_in", "false");
    localStorage.removeItem("albireo_jwt_token");
    localStorage.removeItem("albireo_allowed_menus");
  };

  const hasEntitlement = (key: EntitlementKey): boolean => {
    if (!isLoggedIn) return false;
    return currentUser.entitlements.includes(key) || currentUser.role === "SUPER_ADMIN" || currentUser.role === "CEO";
  };

  const updateUserProgress = (completedLessonId?: string, simulationRun?: boolean, tradeLogged?: boolean) => {
    setCurrentUser((prev) => {
      const updated = { ...prev } as any;

      if (updated.learningProgress) {
        if (completedLessonId && !updated.learningProgress.completedLessonIds.includes(completedLessonId)) {
          updated.learningProgress.completedLessonIds.push(completedLessonId);
          updated.learningProgress.overallProgressPct = Math.min(
            100,
            updated.learningProgress.overallProgressPct + 10
          );
        }
      }

      if (updated.tradingMetrics) {
        if (simulationRun) {
          updated.tradingMetrics.simulationsCount += 1;
        }

        if (tradeLogged) {
          updated.tradingMetrics.journalEntriesCount += 1;
        }
      }

      return updated;
    });
  };

  const isSuperAdmin = currentUser.role === "SUPER_ADMIN" || currentUser.role === "CEO";

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        isLoggedIn,
        jwtToken,
        allowedMenus,
        allMockUsers: usersList,
        switchUser,
        setAuthSession,
        logout,
        hasEntitlement,
        updateUserProgress,
        isSuperAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
