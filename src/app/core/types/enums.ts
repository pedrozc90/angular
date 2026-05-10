import { enumToList } from "../utils";

export interface EnumMetadata {
	label: string;
}

/* --- Enums --- */

export enum Role {
	Admin = "admin",
	User = "user",
	Guest = "guest",
}

export type RoleKey = keyof typeof Role;

export type RoleMetadata = EnumMetadata & {
	color: string;
};

export const ROLE_METADATA: Record<Role, RoleMetadata> = {
	[Role.Admin]: { label: "Administrator", color: "red" },
	[Role.User]: { label: "User", color: "blue" },
	[Role.Guest]: { label: "Guest", color: "gray" },
};

export const ROLE_OPTIONS = enumToList(ROLE_METADATA);
