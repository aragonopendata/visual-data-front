export class History {

    id?: number;
    state?:number;
    title?: string;
    description?: string;
    email?:string;
    id_reference?:string;
    main_category?: string;
    secondary?: string;
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