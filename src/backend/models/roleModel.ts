/**
 * Role & Permission Matrix Model Definition
 */

export interface PermissionKeyModel {
  key: string;
  name: string;
  category: "Tools" | "Academy" | "Analytics" | "Admin";
  description: string;
}

export interface RoleModel {
  id: string;
  roleKey: string;
  displayName: string;
  description: string;
  isSystem: boolean;
  permissions: string[];
  userCount: number;
}
