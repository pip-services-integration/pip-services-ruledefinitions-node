import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { RuleV1 } from '../data/version1/RuleV1';
import { IRuleDefinitionsController } from './IRuleDefinitionsController';
export declare class RuleDefinitionsController implements IConfigurable, IReferenceable, ICommandable, IRuleDefinitionsController {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistence;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getRules(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<RuleV1>) => void): void;
    getRuleById(correlationId: string, id: string, callback: (err: any, rule: RuleV1) => void): void;
    createRule(correlationId: string, rule: RuleV1, callback: (err: any, rule: RuleV1) => void): void;
    updateRule(correlationId: string, rule: RuleV1, callback: (err: any, rule: RuleV1) => void): void;
    deleteRuleById(correlationId: string, id: string, callback: (err: any, rule: RuleV1) => void): void;
}
