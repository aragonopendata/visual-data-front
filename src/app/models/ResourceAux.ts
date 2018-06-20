export class ResourceAux {
    id: string;
    name: string;
    sources_ids: string[];
    sources: string[];
    formats: string[];

    constructor() {
   
    }

    getSourcesSize(){
        return this.sources.length;
    }
}