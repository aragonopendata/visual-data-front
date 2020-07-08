export class AditionalInfo{
    text: string;
    value: number;
    order: number;


    constructor (_text: string, _value: number, _order:number){
        this.text=_text;
        this.value=_value;
        this.order=_order;
    }
}