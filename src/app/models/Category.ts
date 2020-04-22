export class Category {

    id: number;
    alias: string;
    name: string;
    description: string;
    nivel: number;
    idPadre: number;
    selected: boolean;
    selectedPrincipal: boolean;


    constructor( _id, _alias, _name, _description, _nivel, _idPadre ) {
        this.id = _id;
        this.alias = _alias;
        this.name = _name;
        this.description = _description;
        this.nivel = _nivel;
        this.idPadre = _idPadre;
        this.selected = false;
        this.selectedPrincipal =false;
    }

} 