// import { CommandSet } from 'pip-services3-commons-node';
// import { ICommand } from 'pip-services3-commons-node';
// import { Command } from 'pip-services3-commons-node';
// import { Schema } from 'pip-services3-commons-node';
// import { Parameters } from 'pip-services3-commons-node';
// import { FilterParams } from 'pip-services3-commons-node';
// import { PagingParams } from 'pip-services3-commons-node';
// import { ObjectSchema } from 'pip-services3-commons-node';
// import { TypeCode } from 'pip-services3-commons-node';
// import { FilterParamsSchema } from 'pip-services3-commons-node';
// import { PagingParamsSchema } from 'pip-services3-commons-node';

// import { RuleV1 } from '../data/version1/RuleV1';
// import { RuleV1Schema } from '../data/version1/RuleV1Schema';
// import { IRuleDefinitionsController } from './IRuleDefinitionsController';

// export class RuleDefinitionsCommandSet extends CommandSet {
//     private _logic: IRuleDefinitionsController;

//     constructor(logic: IRuleDefinitionsController) {
//         super();

//         this._logic = logic;

//         // Register commands to the database
// 		this.addCommand(this.makeGetRulesCommand());
// 		this.addCommand(this.makeGetRuleByIdCommand());
// 		this.addCommand(this.makeCreateRuleCommand());
// 		this.addCommand(this.makeUpdateRuleCommand());
// 		this.addCommand(this.makeDeleteRuleByIdCommand());
//     }

// 	private makeGetRulesCommand(): ICommand {
// 		return new Command(
// 			"get_rules",
// 			new ObjectSchema(true)
// 				.withOptionalProperty('filter', new FilterParamsSchema())
// 				.withOptionalProperty('paging', new PagingParamsSchema()),
//             (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
//                 let filter = FilterParams.fromValue(args.get("filter"));
//                 let paging = PagingParams.fromValue(args.get("paging"));
//                 this._logic.getRules(correlationId, filter, paging, callback);
//             }
// 		);
// 	}

// 	private makeGetRuleByIdCommand(): ICommand {
// 		return new Command(
// 			"get_rule_by_id",
// 			new ObjectSchema(true)
// 				.withRequiredProperty('rule_id', TypeCode.String),
//             (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
//                 let rule_id = args.getAsString("rule_id");
//                 this._logic.getRuleById(correlationId, rule_id, callback);
//             }
// 		);
// 	}

// 	private makeCreateRuleCommand(): ICommand {
// 		return new Command(
// 			"create_rule",
// 			new ObjectSchema(true)
// 				.withRequiredProperty('rule', new RuleV1Schema()),
//             (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
//                 let rule = args.get("rule");
//                 this._logic.createRule(correlationId, rule, callback);
//             }
// 		);
// 	}

// 	private makeUpdateRuleCommand(): ICommand {
// 		return new Command(
// 			"update_rule",
// 			new ObjectSchema(true)
// 				.withRequiredProperty('rule', new RuleV1Schema()),
//             (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
//                 let rule = args.get("rule");
//                 this._logic.updateRule(correlationId, rule, callback);
//             }
// 		);
// 	}
	
// 	private makeDeleteRuleByIdCommand(): ICommand {
// 		return new Command(
// 			"delete_rule_by_id",
// 			new ObjectSchema(true)
// 				.withRequiredProperty('rule_id', TypeCode.String),
//             (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
//                 let ruleId = args.getAsNullableString("rule_id");
//                 this._logic.deleteRuleById(correlationId, ruleId, callback);
// 			}
// 		);
// 	}

// }