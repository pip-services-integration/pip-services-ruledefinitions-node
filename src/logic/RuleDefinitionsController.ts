// import { ConfigParams } from 'pip-services3-commons-node';
// import { IConfigurable } from 'pip-services3-commons-node';
// import { IReferences } from 'pip-services3-commons-node';
// import { Descriptor } from 'pip-services3-commons-node';
// import { IReferenceable } from 'pip-services3-commons-node';
// import { DependencyResolver } from 'pip-services3-commons-node';
// import { FilterParams } from 'pip-services3-commons-node';
// import { PagingParams } from 'pip-services3-commons-node';
// import { DataPage } from 'pip-services3-commons-node';
// import { ICommandable } from 'pip-services3-commons-node';
// import { CommandSet } from 'pip-services3-commons-node';
// import { TagsProcessor } from 'pip-services3-commons-node';

// import { RuleV1 } from '../data/version1/RuleV1';
// import { IRuleDefinitionsPersistence } from '../persistence/IRuleDefinitionsPersistence';
// import { IRuleDefinitionsController } from './IRuleDefinitionsController';
// import { RuleDefinitionsCommandSet } from './RuleDefinitionsCommandSet';

// export class RuleDefinitionsController implements  IConfigurable, IReferenceable, ICommandable, IRuleDefinitionsController {
//     private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
//         'dependencies.persistence', 'pip-services-ruledefinitions:persistence:*:*:1.0'
//     );

//     private _dependencyResolver: DependencyResolver = new DependencyResolver(RuleDefinitionsController._defaultConfig);
//     private _persistence: IRuleDefinitionsPersistence;
//     private _commandSet: RuleDefinitionsCommandSet;

//     public configure(config: ConfigParams): void {
//         this._dependencyResolver.configure(config);
//     }

//     public setReferences(references: IReferences): void {
//         this._dependencyResolver.setReferences(references);
//         this._persistence = this._dependencyResolver.getOneRequired<IRuleDefinitionsPersistence>('persistence');
//     }

//     public getCommandSet(): CommandSet {
//         if (this._commandSet == null)
//             this._commandSet = new RuleDefinitionsCommandSet(this);
//         return this._commandSet;
//     }
    
//     public getRules(correlationId: string, filter: FilterParams, paging: PagingParams, 
//         callback: (err: any, page: DataPage<RuleV1>) => void): void {
//         this._persistence.getPageByFilter(correlationId, filter, paging, callback);
//     }

//     public getRuleById(correlationId: string, id: string, 
//         callback: (err: any, rule: RuleV1) => void): void {
//         this._persistence.getOneById(correlationId, id, callback);        
//     }

//     public createRule(correlationId: string, rule: RuleV1, 
//         callback: (err: any, rule: RuleV1) => void): void {
//         this._persistence.create(correlationId, rule, callback);
//     }

//     public updateRule(correlationId: string, rule: RuleV1, 
//         callback: (err: any, rule: RuleV1) => void): void {
//         this._persistence.update(correlationId, rule, callback);
//     }

//     public deleteRuleById(correlationId: string, id: string,
//         callback: (err: any, rule: RuleV1) => void): void {  
//         this._persistence.deleteById(correlationId, id, callback);
//     }

// }
