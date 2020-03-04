export class History {

    title?: string;
    image?: string;
    id?: number;
    description?: string;
    idCategory?: number;
    contents?: Content[];

    constructor() {}
}

export class Content {

    title?: string;
    description?: string;
    id?: string;
    idGraph?: string;
    urlGraph?:string;

    constructor() {}
}