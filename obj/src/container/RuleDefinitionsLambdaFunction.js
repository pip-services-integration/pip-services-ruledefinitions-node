"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_aws_node_1 = require("pip-services3-aws-node");
const RuleDefinitionsServiceFactory_1 = require("../build/RuleDefinitionsServiceFactory");
class RuleDefinitionsLambdaFunction extends pip_services3_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("rule_definitions", "Business rule definitions function");
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-ruledefinitions', 'controller', 'default', '*', '*'));
        this._factories.add(new RuleDefinitionsServiceFactory_1.RuleDefinitionsServiceFactory());
    }
}
exports.RuleDefinitionsLambdaFunction = RuleDefinitionsLambdaFunction;
exports.handler = new RuleDefinitionsLambdaFunction().getHandler();
//# sourceMappingURL=RuleDefinitionsLambdaFunction.js.map