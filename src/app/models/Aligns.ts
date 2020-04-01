export class AlignsType{
    text: string;
    type: Aligns

    constructor (_text: string, _type: Aligns){
        this.text=_text;
        this.type=_type;
    }
}


export enum Aligns {
    right = 1,
    left = 2
}