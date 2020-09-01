// import { Factory } from 'pip-services3-components-node';
// import { Descriptor } from 'pip-services3-commons-node';

// import { RuleDefinitionsMongoDbPersistence } from '../persistence/RuleDefinitionsMongoDbPersistence';
// import { RuleDefinitionsFilePersistence } from '../persistence/RuleDefinitionsFilePersistence';
// import { RuleDefinitionsMemoryPersistence } from '../persistence/RuleDefinitionsMemoryPersistence';
// import { RuleDefinitionsController } from '../logic/RuleDefinitionsController';
// import { RuleDefinitionsHttpServiceV1 } from '../services/version1/RuleDefinitionsHttpServiceV1';

// export class RuleDefinitionsServiceFactory extends Factory {
// 	public static Descriptor = new Descriptor("pip-services-ruledefinitions", "factory", "default", "default", "1.0");
// 	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-ruledefinitions", "persistence", "memory", "*", "1.0");
// 	public static FilePersistenceDescriptor = new Descriptor("pip-services-ruledefinitions", "persistence", "file", "*", "1.0");
// 	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-ruledefinitions", "persistence", "mongodb", "*", "1.0");
// 	public static ControllerDescriptor = new Descriptor("pip-services-ruledefinitions", "controller", "default", "*", "1.0");
// 	public static HttpServiceDescriptor = new Descriptor("pip-services-ruledefinitions", "service", "http", "*", "1.0");
	
// 	constructor() {
// 		super();
// 		this.registerAsType(RuleDefinitionsServiceFactory.MemoryPersistenceDescriptor, RuleDefinitionsMemoryPersistence);
// 		this.registerAsType(RuleDefinitionsServiceFactory.FilePersistenceDescriptor, RuleDefinitionsFilePersistence);
// 		this.registerAsType(RuleDefinitionsServiceFactory.MongoDbPersistenceDescriptor, RuleDefinitionsMongoDbPersistence);
// 		this.registerAsType(RuleDefinitionsServiceFactory.ControllerDescriptor, RuleDefinitionsController);
// 		this.registerAsType(RuleDefinitionsServiceFactory.HttpServiceDescriptor, RuleDefinitionsHttpServiceV1);
// 	}
	
// }
