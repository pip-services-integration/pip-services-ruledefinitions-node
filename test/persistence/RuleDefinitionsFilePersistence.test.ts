// import { ConfigParams } from 'pip-services3-commons-node';

// import { RuleDefinitionsFilePersistence } from '../../src/persistence/RuleDefinitionsFilePersistence';
// import { RuleDefinitionsPersistenceFixture } from './RuleDefinitionsPersistenceFixture';

// suite('RuleDefinitionsFilePersistence', ()=> {
//     let persistence: RuleDefinitionsFilePersistence;
//     let fixture: RuleDefinitionsPersistenceFixture;
    
//     setup((done) => {
//         persistence = new RuleDefinitionsFilePersistence('./data/rules.test.json');

//         fixture = new RuleDefinitionsPersistenceFixture(persistence);

//         persistence.open(null, (err) => {
//             persistence.clear(null, done);
//         });
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