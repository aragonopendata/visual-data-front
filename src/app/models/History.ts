import { SafeResourceUrl } from "@angular/platform-browser";

export class History {

    id?: string;
    state?:number;
    title?: string;
    description?: string;
    email?:string;
    id_reference?:string;
    main_category?: number;
    secondary_categories?: number[];
    contents?: Content[];
    create_date?: Date;
    update_date?:Date;

    url?: string;

    image?: string;
    constructor() {}
}

export class Content {

    id?: string;
    title?: string;
    description?: string;
    visual_content?: string;
    type_content?:number;
    
    srcYoutube?: SafeResourceUrl;
    srcSlideShare?: SafeResourceUrl;

    align?:number;

    constructor() {}
}