export interface PermissionKey {
  key: string;
  name: string;
  category: "Tools" | "Academy" | "Analytics" | "Admin";
  description: string;
}

export interface RoleDefinition {
  id: string;
  roleKey: string;
  displayName: string;
  description: string;
  isSystem: boolean;
  permissions: string[];
  userCount: number;
}

export const ALL_PERMISSIONS: PermissionKey[] = [
  { key: "FREE_TOOLS", name: "Free Calculators & Lot Sizer", category: "Tools", description: "Access basic position sizer and margin tools" },
  { key: "BASIC_CALCULATORS", name: "Pip & Drawdown Calculators", category: "Tools", description: "Access basic drawdown math" },
  { key: "SAVE_JOURNAL", name: "Trade Journal (50 trades)", category: "Tools", description: "Log up to 50 trades" },
  { key: "UNLIMITED_JOURNAL", name: "Unlimited Trade Journal", category: "Tools", description: "Log unlimited trade entries" },
  { key: "MONTE_CARLO_BASIC", name: "Basic Monte Carlo (100 runs)", category: "Tools", description: "Run 100-iteration drawdown tests" },
  { key: "UNLIMITED_MONTE_CARLO", name: "Unlimited Monte Carlo (5,000 runs)", category: "Tools", description: "Run 5,000-iteration drawdown tests" },
  { key: "ACADEMY_BASIC", name: "Forex Basics Free Course", category: "Academy", description: "Access Level 1 free course & quizzes" },
  { key: "ACADEMY_PREMIUM", name: "Prop Firm & Advanced Masterclass", category: "Academy", description: "Access all paid academy courses" },
  { key: "HISTORICAL_COT_ALERTS", name: "CFTC Extreme Positioning Alerts", category: "Analytics", description: "Receive institutional smart money alerts" },
  { key: "API_ACCESS", name: "REST & WebSocket API Keys", category: "Analytics", description: "Query live risk & compliance API JSON" },
  { key: "INSTITUTIONAL_REPORTS", name: "PDF Risk Audit Exporters", category: "Analytics", description: "Export high-definition PDF risk cards" },
  { key: "CEO_COMMAND_CENTER", name: "CEO Command Center & OS", category: "Admin", description: "Access 10-year roadmap & executive OS" },
  { key: "USER_MANAGEMENT", name: "User & Entitlements Management", category: "Admin", description: "Manage signed-up users & role permissions" },
  { key: "ROLE_MANAGEMENT", name: "Role CRUD & Permission Manager", category: "Admin", description: "Create, edit, and assign custom system roles" }
];

let ROLES_DATABASE: RoleDefinition[] = [
  {
    id: "role-super-admin",
    roleKey: "SUPER_ADMIN",
    displayName: "Super Executive Admin",
    description: "Full system administrative control, user management, and role permission assignment.",
    isSystem: true,
    userCount: 1,
    permissions: ALL_PERMISSIONS.map((p) => p.key)
  },
  {
    id: "role-admin",
    roleKey: "ADMIN",
    displayName: "Platform Administrator",
    description: "Administrative access to user database and operational execution cascade.",
    isSystem: true,
    userCount: 2,
    permissions: [
      "FREE_TOOLS", "BASIC_CALCULATORS", "SAVE_JOURNAL", "UNLIMITED_JOURNAL",
      "UNLIMITED_MONTE_CARLO", "ACADEMY_BASIC", "ACADEMY_PREMIUM",
      "HISTORICAL_COT_ALERTS", "API_ACCESS", "INSTITUTIONAL_REPORTS",
      "CEO_COMMAND_CENTER", "USER_MANAGEMENT"
    ]
  },
  {
    id: "role-professional",
    roleKey: "PROFESSIONAL",
    displayName: "Professional Institutional Desk",
    description: "Built for small funds, advisors, and prop firm managers requiring REST API access.",
    isSystem: false,
    userCount: 14,
    permissions: [
      "FREE_TOOLS", "BASIC_CALCULATORS", "SAVE_JOURNAL", "UNLIMITED_JOURNAL",
      "UNLIMITED_MONTE_CARLO", "ACADEMY_BASIC", "ACADEMY_PREMIUM",
      "HISTORICAL_COT_ALERTS", "API_ACCESS", "INSTITUTIONAL_REPORTS"
    ]
  },
  {
    id: "role-pro",
    roleKey: "PRO",
    displayName: "Albireo Pro Trader",
    description: "Unlimited Monte Carlo drawdown simulations, AI research, and PDF audit reports.",
    isSystem: false,
    userCount: 67,
    permissions: [
      "FREE_TOOLS", "BASIC_CALCULATORS", "SAVE_JOURNAL", "UNLIMITED_JOURNAL",
      "UNLIMITED_MONTE_CARLO", "ACADEMY_BASIC", "ACADEMY_PREMIUM",
      "HISTORICAL_COT_ALERTS"
    ]
  },
  {
    id: "role-course-basic",
    roleKey: "COURSE_BASIC",
    displayName: "Academy Student",
    description: "Enrolled in Albireo Forex Masterclass courses with saved quiz progress.",
    isSystem: false,
    userCount: 193,
    permissions: [
      "FREE_TOOLS", "BASIC_CALCULATORS", "SAVE_JOURNAL", "ACADEMY_BASIC", "MONTE_CARLO_BASIC"
    ]
  },
  {
    id: "role-free",
    roleKey: "FREE",
    displayName: "Free Visitor Account",
    description: "Default Level 1/2 free visitor account with access to free tools.",
    isSystem: true,
    userCount: 1007,
    permissions: [
      "FREE_TOOLS", "BASIC_CALCULATORS"
    ]
  }
];

export function getAllRoles(): RoleDefinition[] {
  return [...ROLES_DATABASE];
}

export function getRoleById(id: string): RoleDefinition | undefined {
  return ROLES_DATABASE.find((r) => r.id === id || r.roleKey === id);
}

export function createRole(data: { displayName: string; roleKey: string; description: string; permissions: string[] }): RoleDefinition {
  const newRole: RoleDefinition = {
    id: `role-${Date.now()}`,
    roleKey: data.roleKey.toUpperCase().replace(/\s+/g, "_"),
    displayName: data.displayName,
    description: data.description,
    isSystem: false,
    userCount: 0,
    permissions: data.permissions
  };

  ROLES_DATABASE.push(newRole);
  return newRole;
}

export function updateRole(id: string, updates: Partial<RoleDefinition>): RoleDefinition | undefined {
  const idx = ROLES_DATABASE.findIndex((r) => r.id === id || r.roleKey === id);
  if (idx === -1) return undefined;

  ROLES_DATABASE[idx] = {
    ...ROLES_DATABASE[idx],
    ...updates
  };

  return ROLES_DATABASE[idx];
}

export function deleteRole(id: string): boolean {
  const role = getRoleById(id);
  if (role && role.isSystem) {
    return false; // Prevent deleting default system roles
  }

  const initialLen = ROLES_DATABASE.length;
  ROLES_DATABASE = ROLES_DATABASE.filter((r) => r.id !== id && r.roleKey !== id);
  return ROLES_DATABASE.length < initialLen;
}
