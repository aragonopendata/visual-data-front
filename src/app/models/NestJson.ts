export class Nested {
    id: string;
    name: string;
    children: Array<Nested>;

    constructor(name, children){
        this.name = name;
        this.children = children;
    }
}