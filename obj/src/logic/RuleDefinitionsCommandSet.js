"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
const pip_services3_commons_node_5 = require("pip-services3-commons-node");
const pip_services3_commons_node_6 = require("pip-services3-commons-node");
const pip_services3_commons_node_7 = require("pip-services3-commons-node");
const pip_services3_commons_node_8 = require("pip-services3-commons-node");
const RuleV1Schema_1 = require("../data/version1/RuleV1Schema");
class RuleDefinitionsCommandSet extends pip_services3_commons_node_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetRulesCommand());
        this.addCommand(this.makeGetRuleByIdCommand());
        this.addCommand(this.makeCreateRuleCommand());
        this.addCommand(this.makeUpdateRuleCommand());
        this.addCommand(this.makeDeleteRuleByIdCommand());
    }
    makeGetRulesCommand() {
        return new pip_services3_commons_node_2.Command("get_rules", new pip_services3_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_node_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_node_8.PagingParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services3_commons_node_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_node_4.PagingParams.fromValue(args.get("paging"));
            this._logic.getRules(correlationId, filter, paging, callback);
        });
    }
    makeGetRuleByIdCommand() {
        return new pip_services3_commons_node_2.Command("get_rule_by_id", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('rule_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let rule_id = args.getAsString("rule_id");
            this._logic.getRuleById(correlationId, rule_id, callback);
        });
    }
    makeCreateRuleCommand() {
        return new pip_services3_commons_node_2.Command("create_rule", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('rule', new RuleV1Schema_1.RuleV1Schema()), (correlationId, args, callback) => {
            let rule = args.get("rule");
            this._logic.createRule(correlationId, rule, callback);
        });
    }
    makeUpdateRuleCommand() {
        return new pip_services3_commons_node_2.Command("update_rule", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('rule', new RuleV1Schema_1.RuleV1Schema()), (correlationId, args, callback) => {
            let rule = args.get("rule");
            this._logic.updateRule(correlationId, rule, callback);
        });
    }
    makeDeleteRuleByIdCommand() {
        return new pip_services3_commons_node_2.Command("delete_rule_by_id", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('rule_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let ruleId = args.getAsNullableString("rule_id");
            this._logic.deleteRuleById(correlationId, ruleId, callback);
        });
    }
}
exports.RuleDefinitionsCommandSet = RuleDefinitionsCommandSet;
//# sourceMappingURL=RuleDefinitionsCommandSet.js.map