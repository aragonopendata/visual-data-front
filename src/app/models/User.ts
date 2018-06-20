import { Role } from './Role';

export class User {
    about: string;
    capacity: string;
    created: Date;
    activity_streams_email_notifications: boolean;
    email_hash: string;
    number_of_edits: number;
    number_administered_packages: number;
    display_name: string;
    id: number;
    openid: string;
    name: string;
    email: string;
    //ADMIN
    description: string;
    password: string;
    role: Role[];
    signupDate: Date;
    active: boolean = true;
    fullname: string;
    
    constructor() { }
}