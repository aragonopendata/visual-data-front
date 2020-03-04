export class History {

    title: string;
    image: string;
    id: string;
    description: string;
    category: string;
    contents: Content[];

    constructor() {}
}

export class Content {

    title: string;
    description: string;
    id: string;

    constructor() {}
}