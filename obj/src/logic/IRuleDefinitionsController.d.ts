import { DataPage } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { RuleV1 } from '../data/version1/RuleV1';
export interface IRuleDefinitionsController {
    getRules(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<RuleV1>) => void): void;
    getRuleById(correlationId: string, rule_id: string, callback: (err: any, rule: RuleV1) => void): void;
    createRule(correlationId: string, rule: RuleV1, callback: (err: any, rule: RuleV1) => void): void;
    updateRule(correlationId: string, rule: RuleV1, callback: (err: any, rule: RuleV1) => void): void;
    deleteRuleById(correlationId: string, rule_id: string, callback: (err: any, rule: RuleV1) => void): void;
}
