import { Content } from './Content';
export class Event{
    id: number;
    name: string;
    description: number;
    date: Date;
    contents: Content[];
    site: string;
    total_count: number;
}