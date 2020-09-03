import { IStringIdentifiable } from 'pip-services3-commons-node';
export declare class RuleV1 implements IStringIdentifiable {
    id: string;
    group: string;
    name: string;
    description?: string;
    priority: number;
    params: any;
    condition: string;
    action: string;
}
