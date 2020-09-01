// import { ConfigParams } from 'pip-services3-commons-node';

// import { RuleDefinitionsMemoryPersistence } from '../../src/persistence/RuleDefinitionsMemoryPersistence';
// import { RuleDefinitionsPersistenceFixture } from './RuleDefinitionsPersistenceFixture';

// suite('RuleDefinitionsMemoryPersistence', ()=> {
//     let persistence: RuleDefinitionsMemoryPersistence;
//     let fixture: RuleDefinitionsPersistenceFixture;
    
//     setup((done) => {
//         persistence = new RuleDefinitionsMemoryPersistence();
//         persistence.configure(new ConfigParams());
        
//         fixture = new RuleDefinitionsPersistenceFixture(persistence);
        
//         persistence.open(null, done);
//     });
    
//     teardown((done) => {
//         persistence.close(null, done);
//     });
        
//     test('CRUD Operations', (done) => {
//         fixture.testCrudOperations(done);
//     });

//     test('Get with Filters', (done) => {
//         fixture.testGetWithFilter(done);
//     });

// });