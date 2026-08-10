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
  logout: () => Promise<void>;
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
    const savedUserStr = localStorage.getItem("albireo_user_session");
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
      if (found) {
        setCurrentUser(found);
      } else if (savedUserStr) {
        try {
          const parsed = JSON.parse(savedUserStr);
          if (parsed && parsed.id) {
            setCurrentUser({
              ...MOCK_USERS[0],
              ...parsed,
              role: parsed.role || "FREE",
              entitlements: parsed.entitlements || MOCK_USERS[0].entitlements,
              progress: parsed.progress || MOCK_USERS[0].progress,
            });
          }
        } catch (e) {
          // ignore error
        }
      }
    }
  }, []);

  const setAuthSession = (token: string, user: UserProfile, menus: MenuItem[]) => {
    const safeUser: UserProfile = {
      ...MOCK_USERS[0],
      ...(user || {}),
      role: user?.role || "FREE",
      entitlements: user?.entitlements || MOCK_USERS[0].entitlements,
      progress: user?.progress || MOCK_USERS[0].progress,
    };

    setCurrentUser(safeUser);
    setIsLoggedIn(true);
    setJwtToken(token);
    setAllowedMenus(menus || []);

    localStorage.setItem("albireo_active_user_id", safeUser.id);
    localStorage.setItem("albireo_user_session", JSON.stringify(safeUser));
    localStorage.setItem("albireo_is_logged_in", "true");
    localStorage.setItem("albireo_jwt_token", token);
    localStorage.setItem("albireo_allowed_menus", JSON.stringify(menus || []));
  };

  const switchUser = async (userId: string) => {
    const found = usersList.find((u) => u.id === userId);
    if (found) {
      try {
        const res = await fetch(`/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: found.email }),
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
      localStorage.setItem("albireo_user_session", JSON.stringify(found));
      localStorage.setItem("albireo_is_logged_in", "true");
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUser?.id }),
      });
    } catch (e) {
      // Ignore network errors on logout
    }

    setIsLoggedIn(false);
    setJwtToken(null);
    setAllowedMenus([]);
    if (typeof window !== "undefined") {
      localStorage.clear();
      sessionStorage.clear();
    }
    setCurrentUser(MOCK_USERS[0]);
  };

  const hasEntitlement = (key: EntitlementKey): boolean => {
    if (!isLoggedIn || !currentUser) return false;
    const userRole = currentUser?.role || "FREE";
    const userEntitlements = currentUser?.entitlements || [];
    return userEntitlements.includes(key) || userRole === "SUPER_ADMIN" || userRole === "CEO";
  };

  const updateUserProgress = (completedLessonId?: string, simulationRun?: boolean, tradeLogged?: boolean) => {
    setCurrentUser((prev) => {
      if (!prev) return MOCK_USERS[0];
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

  const isSuperAdmin = Boolean(
    currentUser && (currentUser.role === "SUPER_ADMIN" || currentUser.role === "CEO")
  );

  return (
    <AuthContext.Provider
      value={{
        user: currentUser || MOCK_USERS[0],
        isLoggedIn,
        jwtToken,
        allowedMenus,
        allMockUsers: usersList,
        switchUser,
        setAuthSession,
        logout,
        hasEntitlement,
        updateUserProgress,
        isSuperAdmin,
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
