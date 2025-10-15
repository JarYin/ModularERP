export type TeamMemberType = {
    avatar: string;
    name: string;
    email: string;
    role: string;
    status: "active" | "inactive" | "pending";
    lastLogin: string;
    actions?: string[];
}


export type UserRoleTeamMemberType = {
    user_id: string;
    role_id: string;
    org_id: string | null;
    assigned_by: string;
    assigned_at: string;
    id: string;
    user: {
        email: string;
        phone: string | null;
        user_id: string;
        is_active: boolean;
        last_name: string;
        avatar_url: string | null;
        created_at: string;
        first_name: string;
        last_login: string | null;
        updated_at: string;
    };
    role: {
        name: string;
        slug: string;
        org_id: string | null;
        role_id: string;
        created_at: string;
        is_builtin: boolean;
        updated_at: string;
        description: string | null;
    };
};
