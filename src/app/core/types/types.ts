import { Role } from "./enums";

export interface Environment {
	name: string;
	version: string;
	mode: "development" | "production" | "stage";
	url: string;
}

/* --- Entities --- */

export interface User {
	id: number;
	uuid: string;
	inserted_at: Date;
	updated_at: Date;
	name: string;
	email: string;
	username: string;
	role: Role;
}
