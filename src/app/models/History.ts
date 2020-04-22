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
    create_date?: string;
    update_date?: string;

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
    
    srcGraph?: SafeResourceUrl;
    srcYoutube?: SafeResourceUrl;
    srcSlideShare?: SafeResourceUrl;

    align?:number;

    constructor() {}
}