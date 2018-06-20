import { Extra } from './Extra';
import { User } from './User';

export class OrganizationAdmin {

    requestUserId: string;
    requestUserName: string;
    id: string;
    name: string;
    image_url: string;
    display_name: string;
    title: string;
    state: string;
    description: string;
    package_count: number;
    extras: Extra[];
    users: User[];

    constructor( ){ }
}