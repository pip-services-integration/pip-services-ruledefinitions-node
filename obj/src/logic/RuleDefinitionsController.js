"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const RuleDefinitionsCommandSet_1 = require("./RuleDefinitionsCommandSet");
class RuleDefinitionsController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_node_2.DependencyResolver(RuleDefinitionsController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new RuleDefinitionsCommandSet_1.RuleDefinitionsCommandSet(this);
        return this._commandSet;
    }
    getRules(correlationId, filter, paging, callback) {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }
    getRuleById(correlationId, id, callback) {
        this._persistence.getOneById(correlationId, id, callback);
    }
    createRule(correlationId, rule, callback) {
        this._persistence.create(correlationId, rule, callback);
    }
    updateRule(correlationId, rule, callback) {
        this._persistence.update(correlationId, rule, callback);
    }
    deleteRuleById(correlationId, id, callback) {
        this._persistence.deleteById(correlationId, id, callback);
    }
}
exports.RuleDefinitionsController = RuleDefinitionsController;
RuleDefinitionsController._defaultConfig = pip_services3_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'pip-services-ruledefinitions:persistence:*:*:1.0');
//# sourceMappingURL=RuleDefinitionsController.js.map