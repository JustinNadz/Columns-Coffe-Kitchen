export type Role = "customer" | "cashier" | "admin";

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    avatar?: string;
    position?: string;
}

export interface StaffMember extends User {
    role: "cashier" | "admin";
    position: string;
    clockedIn?: boolean;
    clockedInAt?: Date;
}
