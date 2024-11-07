
export interface ClientUserData {
    type: string;
    email: string;
    picture?: string;
    token: string;
    plan: string | null,
    billing_id: string | null,
}