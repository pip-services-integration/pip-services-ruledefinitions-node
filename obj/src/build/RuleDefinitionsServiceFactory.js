"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const RuleDefinitionsMongoDbPersistence_1 = require("../persistence/RuleDefinitionsMongoDbPersistence");
const RuleDefinitionsFilePersistence_1 = require("../persistence/RuleDefinitionsFilePersistence");
const RuleDefinitionsMemoryPersistence_1 = require("../persistence/RuleDefinitionsMemoryPersistence");
const RuleDefinitionsController_1 = require("../logic/RuleDefinitionsController");
const RuleDefinitionsHttpServiceV1_1 = require("../services/version1/RuleDefinitionsHttpServiceV1");
class RuleDefinitionsServiceFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(RuleDefinitionsServiceFactory.MemoryPersistenceDescriptor, RuleDefinitionsMemoryPersistence_1.RuleDefinitionsMemoryPersistence);
        this.registerAsType(RuleDefinitionsServiceFactory.FilePersistenceDescriptor, RuleDefinitionsFilePersistence_1.RuleDefinitionsFilePersistence);
        this.registerAsType(RuleDefinitionsServiceFactory.MongoDbPersistenceDescriptor, RuleDefinitionsMongoDbPersistence_1.RuleDefinitionsMongoDbPersistence);
        this.registerAsType(RuleDefinitionsServiceFactory.ControllerDescriptor, RuleDefinitionsController_1.RuleDefinitionsController);
        this.registerAsType(RuleDefinitionsServiceFactory.HttpServiceDescriptor, RuleDefinitionsHttpServiceV1_1.RuleDefinitionsHttpServiceV1);
    }
}
exports.RuleDefinitionsServiceFactory = RuleDefinitionsServiceFactory;
RuleDefinitionsServiceFactory.Descriptor = new pip_services3_commons_node_1.Descriptor("pip-services-ruledefinitions", "factory", "default", "default", "1.0");
RuleDefinitionsServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-ruledefinitions", "persistence", "memory", "*", "1.0");
RuleDefinitionsServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-ruledefinitions", "persistence", "file", "*", "1.0");
RuleDefinitionsServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-ruledefinitions", "persistence", "mongodb", "*", "1.0");
RuleDefinitionsServiceFactory.ControllerDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-ruledefinitions", "controller", "default", "*", "1.0");
RuleDefinitionsServiceFactory.HttpServiceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-ruledefinitions", "service", "http", "*", "1.0");
//# sourceMappingURL=RuleDefinitionsServiceFactory.js.map