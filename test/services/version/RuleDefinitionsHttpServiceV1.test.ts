// let _ = require('lodash');
// let async = require('async');
// let restify = require('restify');
// let assert = require('chai').assert;

// import { ConfigParams, MultiString } from 'pip-services3-commons-node';
// import { Descriptor } from 'pip-services3-commons-node';
// import { References } from 'pip-services3-commons-node';

// import { RuleV1 } from '../../../src/data/version1/RuleV1';
// import { RuleDefinitionsMemoryPersistence } from '../../../src/persistence/RuleDefinitionsMemoryPersistence';
// import { RuleDefinitionsController } from '../../../src/logic/RuleDefinitionsController';
// import { RuleDefinitionsHttpServiceV1 } from '../../../src/services/version1/RuleDefinitionsHttpServiceV1';

// let httpConfig = ConfigParams.fromTuples(
//     "connection.protocol", "http",
//     "connection.host", "localhost",
//     "connection.port", 3000
// );

// let RULE1: RuleV1 = {
//     id: '1',
//     name: new MultiString({en: 'App1'}),
//     product: 'Product 1',
//     copyrights: 'PipDevs 2018',
//     min_ver: 0,
//     max_ver: 9999
// };
// let RULE2: RuleV1 = {
//     id: '2',
//     name: new MultiString({en: 'App1'}),
//     product: 'Product 1',
//     copyrights: 'PipDevs 2018',
//     min_ver: 0,
//     max_ver: 9999
// };

// suite('RuleDefinitionsHttpServiceV1', ()=> {    
//     let service: RuleDefinitionsHttpServiceV1;
//     let rest: any;

//     suiteSetup((done) => {
//         let persistence = new RuleDefinitionsMemoryPersistence();
//         let controller = new RuleDefinitionsController();

//         service = new RuleDefinitionsHttpServiceV1();
//         service.configure(httpConfig);

//         let references: References = References.fromTuples(
//             new Descriptor('pip-services-ruledefinitions', 'persistence', 'memory', 'default', '1.0'), persistence,
//             new Descriptor('pip-services-ruledefinitions', 'controller', 'default', 'default', '1.0'), controller,
//             new Descriptor('pip-services-ruledefinitions', 'service', 'http', 'default', '1.0'), service
//         );
//         controller.setReferences(references);
//         service.setReferences(references);

//         service.open(null, done);
//     });
    
//     suiteTeardown((done) => {
//         service.close(null, done);
//     });

//     setup(() => {
//         let url = 'http://localhost:3000';
//         rest = restify.createJsonClient({ url: url, version: '*' });
//     });
    
    
//     test('CRUD Operations', (done) => {
//         let rule1, rule2;

//         async.series([
//         // Create one rule
//             (callback) => {
//                 rest.post('/v1/rule_definitions/create_rule',
//                     {
//                         rule: RULE1
//                     },
//                     (err, req, res, rule) => {
//                         assert.isNull(err);

//                         assert.isObject(rule);
//                         assert.equal(rule.name.en, RULE1.name.get('en'));
//                         assert.equal(rule.product, RULE1.product);
//                         assert.equal(rule.copyrights, RULE1.copyrights);

//                         rule1 = rule;

//                         callback();
//                     }
//                 );
//             },
//         // Create another rule
//             (callback) => {
//                 rest.post('/v1/rule_definitions/create_rule', 
//                     {
//                         rule: RULE2
//                     },
//                     (err, req, res, rule) => {
//                         assert.isNull(err);

//                         assert.isObject(rule);
//                         assert.equal(rule.name.en, RULE2.name.get('en'));
//                         assert.equal(rule.product, RULE2.product);
//                         assert.equal(rule.copyrights, RULE2.copyrights);

//                         rule2 = rule;

//                         callback();
//                     }
//                 );
//             },
//         // Get all rules
//             (callback) => {
//                 rest.post('/v1/rule_definitions/get_rules',
//                     {},
//                     (err, req, res, page) => {
//                         assert.isNull(err);

//                         assert.isObject(page);
//                         assert.lengthOf(page.data, 2);

//                         callback();
//                     }
//                 );
//             },
//         // Update the rule
//             (callback) => {
//                 rule1.name.en = 'Updated Name 1';

//                 rest.post('/v1/rule_definitions/update_rule',
//                     { 
//                         rule: rule1
//                     },
//                     (err, req, res, rule) => {
//                         assert.isNull(err);

//                         assert.isObject(rule);
//                         assert.equal(rule.name.en, 'Updated Name 1');
//                         assert.equal(rule.id, RULE1.id);

//                         rule1 = rule;

//                         callback();
//                     }
//                 );
//             },
//         // Delete rule
//             (callback) => {
//                 rest.post('/v1/rule_definitions/delete_rule_by_id',
//                     {
//                         rule_id: rule1.id
//                     },
//                     (err, req, res, result) => {
//                         assert.isNull(err);

//                         //assert.isNull(result);

//                         callback();
//                     }
//                 );
//             },
//         // Try to get delete rule
//             (callback) => {
//                 rest.post('/v1/rule_definitions/get_rule_by_id',
//                     {
//                         rule_id: rule1.id
//                     },
//                     (err, req, res, result) => {
//                         assert.isNull(err);

//                         //assert.isNull(result);

//                         callback();
//                     }
//                 );
//             }
//         ], done);
//     });
// });