/**
 * Albireo Navigation Constants Registry
 */

export interface NavItem {
  label: string;
  href: string;
  iconName?: string;
  badge?: string;
  roleReq?: string;
}

export const VISITOR_NAV_ITEMS: NavItem[] = [
  { label: "Blogs & Guides", href: "/blog" },
  { label: "Tools", href: "/tools" },
  { label: "Prop Firms", href: "/prop-firms" },
];

export const AUTHENTICATED_SIDEBAR_NAV: NavItem[] = [
  { label: "Personal Cockpit", href: "/dashboard", iconName: "LayoutDashboard" },
  { label: "Academy Catalog", href: "/academy", iconName: "GraduationCap" },
  { label: "Quantitative Tools", href: "/tools", iconName: "Wrench" },
  { label: "Trade Journal", href: "/journal", iconName: "FileText" },
  { label: "Albireo Pro SaaS", href: "/pricing", iconName: "Sparkles" },
  { label: "Professional Desk", href: "/professional", iconName: "Compass" },
  { label: "Quant Capital & Verification", href: "/capital", iconName: "Cpu" },
  { label: "Wealth Advisory (₹100 Cr AUM)", href: "/wealth", iconName: "Building2" },
  { label: "Group Ecosystem Hub", href: "/group", iconName: "Layers" },
];

export const ADMIN_SIDEBAR_NAV: NavItem[] = [
  { label: "CEO Control Tower", href: "/admin", iconName: "Crown" },
  { label: "User Database & RBAC", href: "/admin/users", iconName: "Users" },
  { label: "Role & Permission CRUD", href: "/admin/roles", iconName: "ShieldCheck" },
];
