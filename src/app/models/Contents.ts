export class ContentsType{
    text: string;
    type: Contents

    constructor (_text: string, _type: Contents){
        this.text=_text;
        this.type=_type;
    }
}

export enum Contents {
    graph = 1 ,
    youtube = 2,
    shareSlides = 3,
    img = 4
}