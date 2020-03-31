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

    image?: string;
    constructor() {}
}

export class Content {

    id?: string;
    title?: string;
    description?: string;
    visual_content?: string;
    type_content?:string;
    urlGraph?:string;
    align?:string;

    constructor() {}
}