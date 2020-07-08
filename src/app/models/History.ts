import { SafeResourceUrl } from "@angular/platform-browser";
import { AditionalInfo } from "./AditionalInfo";

export class History {

    id?: number;
    state?:number;
    title?: string;
    description?: string;
    email?:string;
    id_reference?:number;
    main_category?: number;
    secondary_categories?: number[];
    contents?: Content[];
    create_date?: string;
    update_date?: string;
    token?: string;

    url?: string;
    urlEmail?: string;

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
    srcImg?: SafeResourceUrl;

    align?:number;
    order_content?: number;

    body_content?:boolean;
    aditionalInfo?: AditionalInfo;

    constructor() {}
}