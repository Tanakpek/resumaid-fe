export interface User {
    email: string,
    name: string,
    given_name: string,
    family_name: string,
    cv_uploaded: boolean,
    cv: any,
    plan: string | null | undefined,
    subscription_status: string | null | undefined,
    billing_id: string | null | undefined,
    details: {
        family_name: string,
        given_name: string,
        name: string,
        bio:string,
        email: string,
        phone_number: string,
        website: string,
        linkedin: string,
        github: string
        location?: {
            city: string,
            country: string,
            line1?: string,
            line2?: string,
            postalCode?: string,
            state?: string
        } | null
    }

}