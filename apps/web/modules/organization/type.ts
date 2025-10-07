export type TeamMemberType = {
    avatar: string;
    name: string;
    email: string;
    role: string;
    status: "active" | "inactive" | "pending";
    lastLogin: string;
    actions?: string[];
}