import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';
import { RuleV1 } from '../data/version1/RuleV1';
import { IRuleDefinitionsPersistence } from './IRuleDefinitionsPersistence';
export declare class RuleDefinitionsMongoDbPersistence extends IdentifiableMongoDbPersistence<RuleV1, string> implements IRuleDefinitionsPersistence {
    constructor();
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<RuleV1>) => void): void;
}
