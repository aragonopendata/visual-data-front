export class History {

    id?: string;
    state?:number;
    title?: string;
    description?: string;
    email?:string;
    id_reference?:string;
    main_categories?: number;
    secondary_category?: number[];
    contents?: Content[];

    image?: string;
    constructor() {}
}

export class Content {

    id?: string;
    title?: string;
    description?: string;
    id_Graph?: string;
    urlGraph?:string;

    constructor() {}
}