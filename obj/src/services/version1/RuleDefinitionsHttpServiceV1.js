"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class RuleDefinitionsHttpServiceV1 extends pip_services3_rpc_node_1.CommandableHttpService {
    constructor() {
        super('v1/rule_definitions');
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-ruledefinitions', 'controller', 'default', '*', '1.0'));
    }
}
exports.RuleDefinitionsHttpServiceV1 = RuleDefinitionsHttpServiceV1;
//# sourceMappingURL=RuleDefinitionsHttpServiceV1.js.map