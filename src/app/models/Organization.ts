import { Extra } from './Extra';
import { User } from './User';
import { Topic } from './Topic';
import { Dataset } from './Dataset';
import { Tag } from './Tag';

export class Organization {

    users: User[];
    display_name: string;
    description: string;
    title: string;
    package_count: number;
    created: Date;
    approval_status: string;
    is_organization: boolean;
    state: boolean;
    extras: Extra[];
    image_url: string;
    groups: Topic[];
    num_followers: boolean;
    revision_id: string;
    packages: Dataset[];
    type: string;
    id: string;
    tags: Tag[];
    name: string;  

    constructor() { }
}