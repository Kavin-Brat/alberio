export interface MenuItem {
  id: string;
  label: string;
  href: string;
  iconName: string;
  category: "GENERAL" | "PRO" | "ADMIN";
}

export class MenuService {
  /**
   * Return allowed menu list based on user role
   */
  public static getAllowedMenusForRole(role: string): MenuItem[] {
    const uppercaseRole = (role || "FREE").toUpperCase();

    const generalMenus: MenuItem[] = [
      { id: "dash", label: "Personal Cockpit", href: "/dashboard", iconName: "LayoutDashboard", category: "GENERAL" },
      { id: "academy", label: "Academy Catalog", href: "/academy", iconName: "GraduationCap", category: "GENERAL" },
      { id: "tools", label: "Quantitative Tools", href: "/tools", iconName: "Wrench", category: "GENERAL" },
      { id: "journal", label: "Trade Journal", href: "/journal", iconName: "FileText", category: "GENERAL" },
      { id: "pricing", label: "Albireo Pro SaaS", href: "/pricing", iconName: "Sparkles", category: "GENERAL" },
      { id: "group", label: "Group Ecosystem Hub", href: "/group", iconName: "Layers", category: "GENERAL" },
    ];

    const proMenus: MenuItem[] = [
      { id: "pro", label: "Professional Desk", href: "/professional", iconName: "Compass", category: "PRO" },
      { id: "capital", label: "Quant Capital & Verification", href: "/capital", iconName: "Cpu", category: "PRO" },
      { id: "wealth", label: "Wealth Advisory (₹100 Cr AUM)", href: "/wealth", iconName: "Building2", category: "PRO" },
    ];

    const adminMenus: MenuItem[] = [
      { id: "admin-tower", label: "CEO Control Tower", href: "/admin", iconName: "Crown", category: "ADMIN" },
      { id: "admin-users", label: "User Database & RBAC", href: "/admin/users", iconName: "Users", category: "ADMIN" },
      { id: "admin-roles", label: "Role & Permission CRUD", href: "/admin/roles", iconName: "ShieldCheck", category: "ADMIN" },
    ];

    if (uppercaseRole === "CEO" || uppercaseRole === "ADMIN" || uppercaseRole === "SUPERADMIN") {
      return [...generalMenus, ...proMenus, ...adminMenus];
    }

    if (uppercaseRole === "PRO" || uppercaseRole === "PROFESSIONAL") {
      return [...generalMenus, ...proMenus];
    }

    return generalMenus;
  }
}
