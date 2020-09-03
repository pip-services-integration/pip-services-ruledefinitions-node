import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IGetter } from 'pip-services3-data-node';
import { IWriter } from 'pip-services3-data-node';

import { RuleV1 } from '../data/version1/RuleV1';

export interface IRuleDefinitionsPersistence extends IGetter<RuleV1, string>, IWriter<RuleV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<RuleV1>) => void): void;

    getOneById(correlationId: string, id: string, 
        callback: (err: any, item: RuleV1) => void): void;

    create(correlationId: string, item: RuleV1, 
        callback: (err: any, item: RuleV1) => void): void;

    update(correlationId: string, item: RuleV1, 
        callback: (err: any, item: RuleV1) => void): void;

    deleteById(correlationId: string, id: string,
        callback: (err: any, item: RuleV1) => void): void;
}
