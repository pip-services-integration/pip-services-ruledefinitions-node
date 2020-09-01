import { IStringIdentifiable } from 'pip-services3-commons-node';
import { MultiString } from 'pip-services3-commons-node';
export declare class RuleV1 implements IStringIdentifiable {
    id: string;
    name: MultiString;
    description?: MultiString;
    product: string;
    group?: string;
    copyrights?: string;
    url?: string;
    icon?: string;
    min_ver?: number;
    max_ver?: number;
    access_rights?: string[];
}
