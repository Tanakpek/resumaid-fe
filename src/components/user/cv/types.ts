export interface UserDetails {
    first_name: string;
    last_name: string;
    midde_name?: string;
    email: string;
    phone: string;
    bio: string;
    title?: string;
    github?: string;
    linkedin?: string;
    website?: string;
    // later
    // address?: {
    //     street: string;
    //     city: string;
    //     state?: string;
    //     country: string;
    //     postal_code: string;
    // };

}

export interface ListedItem{
    _id: string;
    immutable: boolean;
    description: string;
}