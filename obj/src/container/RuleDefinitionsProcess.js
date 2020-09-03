"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const RuleDefinitionsServiceFactory_1 = require("../build/RuleDefinitionsServiceFactory");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class RuleDefinitionsProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super("rule_definitions", "Business rule definitions microservice");
        this._factories.add(new RuleDefinitionsServiceFactory_1.RuleDefinitionsServiceFactory);
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory);
    }
}
exports.RuleDefinitionsProcess = RuleDefinitionsProcess;
//# sourceMappingURL=RuleDefinitionsProcess.js.map