import { Extra } from './Extra';
import { User } from './User';
import { Dataset } from './Dataset';
import { Tag } from './Tag';

export class Topic {

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
    image_display_url: string;
    groups: Topic[];
    num_followers: boolean;
    revision_id: string;
    packages: Dataset[];
    type: string;
    id: string;
    tags: Tag[];
    name: string;  

    constructor() { }

    public formatImageUrl(image_url: string) {
        let myFormatImageUrl = image_url.slice(14, image_url.length - 4);
        return myFormatImageUrl;
    }
}
