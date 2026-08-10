/**
 * Albireo UI Component Library — Central Barrel Export
 *
 * Import everything from this file instead of individual paths:
 *
 *   import { Button, Badge, GlassCard, Dropdown, Modal, Switch, Slider,
 *            Input, Textarea, Menu, Tabs, IconWrapper,
 *            Toast, useToast, EmptyState, Spinner, Divider } from "@/components/ui";
 */

// ─── Atomic Primitives ────────────────────────────────────────────────────────
export { default as Button } from "./Button";
export type { ButtonProps } from "./Button";

export { default as Badge } from "./Badge";
export type { BadgeProps } from "./Badge";

export { GlassCard, default as Card } from "./Card";
export type { CardProps } from "./Card";

// ─── Form Inputs ──────────────────────────────────────────────────────────────
export { default as Input, Textarea } from "./Input";

export type { InputProps, TextareaProps } from "./Input";

// ─── Composed Pickers & Controls ─────────────────────────────────────────────
export { default as Dropdown } from "./Dropdown";
export type { DropdownProps, DropdownOption } from "./Dropdown";

export { default as Switch } from "./Switch";
export type { SwitchProps } from "./Switch";

export { default as Slider } from "./Slider";
export type { SliderProps } from "./Slider";

// ─── Navigation ───────────────────────────────────────────────────────────────
export { default as Menu } from "./Menu";
export type { MenuProps, MenuItem } from "./Menu";

export { default as Tabs } from "./Tabs";
export type { TabsProps, TabItem } from "./Tabs";

// ─── Overlays ─────────────────────────────────────────────────────────────────
export { default as Modal } from "./Modal";
export type { ModalProps } from "./Modal";

// ─── Feedback ────────────────────────────────────────────────────────────────
export { default as Toast, useToast } from "./Toast";
export type { ToastProps, ToastState, ToastVariant } from "./Toast";

// ─── Icon Container ───────────────────────────────────────────────────────────
export { default as IconWrapper } from "./IconWrapper";
export type { IconWrapperProps, IconSize } from "./IconWrapper";

// ─── Utility Components ───────────────────────────────────────────────────────
export { default as EmptyState, Spinner, Divider } from "./Utils";
export type { EmptyStateProps, SpinnerProps, DividerProps } from "./Utils";

// ─── Specialty ───────────────────────────────────────────────────────────────
export { default as FavoriteStar } from "./FavoriteStar";
export { default as LogoEmblem } from "./LogoEmblem";
export { default as ProUpgradeModal } from "./ProUpgradeModal";
