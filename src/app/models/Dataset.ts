import { SelectItem } from 'primeng/primeng';
import { Extra } from './Extra';
import { TrackingSummary } from './TrackingSummary';
import { Tag } from './Tag';
import { Resource } from './Resource';
import { Topic } from './Topic';
import { Organization } from './Organization';

export class Dataset {
    //WEB FIELDS
    license_title: string;
    maintainer: string;
    private: boolean;
    maintainer_email: string;
    revision_timestamp: Date;
    relationships_as_object: any[];
    id: string;
    metadata_created: Date;
    owner_org: string;
    metadata_modified: Date;
    author: string;
    author_email: string;
    state: string;
    version: string;
    license_id: string;
    type: string;
    resources: Resource[];
    num_resources: number;
    tags: Tag[];
    tracking_summary: TrackingSummary;
    groups: Topic[];
    relationships_as_subject: any[];
    num_tags: number;
    name: string;
    isopen: boolean;
    url: string;
    notes: string;
    title: string;
    description: string;
    extras: Extra[];
    extrasIAEST: Extra[];
    license_url: string;
    organization: Organization;
    revision_id: string;
    //ADMIN FIELDS ??
    acessos: number;
    topic: Topic;
    coberturaGeo: string;
    coberturaTmp: Date;
    fromDate: Date;
    untilDate: Date;
    languaje: string;
    firstPublish: Date;
    lastUpdate: string;
    updateFrequency: SelectItem[];
    dataFiles: string[];
    checked: boolean;
    
    constructor() { }

    public formatDate(date: Date) {
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        let myFormatDate = day + '/' + month + '/' + year;
        return myFormatDate;
    }
}
