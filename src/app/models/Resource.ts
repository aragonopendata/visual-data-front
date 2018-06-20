import { TrackingSummary } from './TrackingSummary';

export class Resource {
    resource_group_id: string;
    cache_last_updated: Date;
    revision_timestamp: Date;
    webstore_last_updated: Date;
    id: string;
    size: null;
    state: string;
    type: string;
    hash: string;
    description: string;
    format: string;
    tracking_summary: TrackingSummary;
    mimetype_inner: string;
    mimetype: string;
    cache_url: string;
    name: string;
    created: Date;
    url: string;
    webstore_url: string;
    last_modified: Date;
    position: number;
    revision_id: string;
    resource_type: string;
    idView: string;

    constructor() {
        
    }
}