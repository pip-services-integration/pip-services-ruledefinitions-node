import { ConfigParams } from 'pip-services3-commons-node';
import { JsonFilePersister } from 'pip-services3-data-node';
import { RuleDefinitionsMemoryPersistence } from './RuleDefinitionsMemoryPersistence';
import { RuleV1 } from '../data/version1/RuleV1';
export declare class RuleDefinitionsFilePersistence extends RuleDefinitionsMemoryPersistence {
    protected _persister: JsonFilePersister<RuleV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
