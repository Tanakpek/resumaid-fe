export interface User {
    email: string,
    name: string,
    given_name: string,
    family_name: string,
    cv_uploaded: boolean,
    cv: any
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
    }

}