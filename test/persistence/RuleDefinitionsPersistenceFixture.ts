// let _ = require('lodash');
// let async = require('async');
// let assert = require('chai').assert;

// import { FilterParams, MultiString } from 'pip-services3-commons-node';
// import { PagingParams } from 'pip-services3-commons-node';

// import { RuleV1 } from '../../src/data/version1/RuleV1';

// import { IRuleDefinitionsPersistence } from '../../src/persistence/IRuleDefinitionsPersistence';

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
//     name: new MultiString({en: 'App2'}),
//     product: 'Product 1',
//     copyrights: 'PipDevs 2018',
//     min_ver: 0,
//     max_ver: 9999
// };
// let RULE3: RuleV1 = {
//     id: '3',
//     name: new MultiString({en: 'App3'}),
//     product: 'Product 2',
//     copyrights: 'PipDevs 2008',
//     min_ver: 0,
//     max_ver: 9999
// };

// export class RuleDefinitionsPersistenceFixture {
//     private _persistence: IRuleDefinitionsPersistence;
    
//     constructor(persistence) {
//         assert.isNotNull(persistence);
//         this._persistence = persistence;
//     }

//     private testCreateRules(done) {
//         async.series([
//         // Create one rule
//             (callback) => {
//                 this._persistence.create(
//                     null,
//                     RULE1,
//                     (err, rule) => {
//                         assert.isNull(err);

//                         assert.isObject(rule);
//                         assert.equal(rule.name.get('en'), RULE1.name.get('en'));
//                         assert.equal(rule.product, RULE1.product);
//                         assert.equal(rule.copyrights, RULE1.copyrights);

//                         callback();
//                     }
//                 );
//             },
//         // Create another rule
//             (callback) => {
//                 this._persistence.create(
//                     null,
//                     RULE2,
//                     (err, rule) => {
//                         assert.isNull(err);

//                         assert.isObject(rule);
//                         assert.equal(rule.name.get('en'), RULE2.name.get('en'));
//                         assert.equal(rule.product, RULE2.product);
//                         assert.equal(rule.copyrights, RULE2.copyrights);

//                         callback();
//                     }
//                 );
//             },
//         // Create yet another rule
//             (callback) => {
//                 this._persistence.create(
//                     null,
//                     RULE3,
//                     (err, rule) => {
//                         assert.isNull(err);

//                         assert.isObject(rule);
//                         assert.equal(rule.name.get('en'), RULE3.name.get('en'));
//                         assert.equal(rule.product, RULE3.product);
//                         assert.equal(rule.copyrights, RULE3.copyrights);

//                         callback();
//                     }
//                 );
//             }
//         ], done);
//     }
                
//     testCrudOperations(done) {
//         let rule1: RuleV1;

//         async.series([
//         // Create items
//             (callback) => {
//                 this.testCreateRules(callback);
//             },
//         // Get all rules
//             (callback) => {
//                 this._persistence.getPageByFilter(
//                     null,
//                     new FilterParams(),
//                     new PagingParams(),
//                     (err, page) => {
//                         assert.isNull(err);

//                         assert.isObject(page);
//                         assert.lengthOf(page.data, 3);

//                         rule1 = page.data[0];

//                         callback();
//                     }
//                 );
//             },
//         // Update the rule
//             (callback) => {
//                 //rule1.name.put('en', 'Updated Name 1');
//                 rule1.name = new MultiString({en: 'Updated Name 1'});

//                 this._persistence.update(
//                     null,
//                     rule1,
//                     (err, rule) => {
//                         assert.isNull(err);

//                         assert.isObject(rule);
//                         //assert.equal(rule.name.get('en'), 'Updated Name 1');
//                         assert.equal(rule.id, rule1.id);

//                         callback();
//                     }
//                 );
//             },
//         // Delete rule
//             (callback) => {
//                 this._persistence.deleteById(
//                     null,
//                     rule1.id,
//                     (err) => {
//                         assert.isNull(err);

//                         callback();
//                     }
//                 );
//             },
//         // Try to get delete rule
//             (callback) => {
//                 this._persistence.getOneById(
//                     null,
//                     rule1.id,
//                     (err, rule) => {
//                         assert.isNull(err);

//                         assert.isNull(rule || null);

//                         callback();
//                     }
//                 );
//             }
//         ], done);
//     }

//     testGetWithFilter(done) {
//         async.series([
//         // Create rules
//             (callback) => {
//                 this.testCreateRules(callback);
//             },
//         // Get rules filtered by product
//             (callback) => {
//                 this._persistence.getPageByFilter(
//                     null,
//                     FilterParams.fromValue({
//                         product: 'Product 1'
//                     }),
//                     new PagingParams(),
//                     (err, rules) => {
//                         assert.isNull(err);

//                         assert.isObject(rules);
//                         assert.lengthOf(rules.data, 2);

//                         callback();
//                     }
//                 );
//             },
//         // Get rules filtered by search
//             (callback) => {
//                 this._persistence.getPageByFilter(
//                     null,
//                     FilterParams.fromValue({
//                         search: '1'
//                     }),
//                     new PagingParams(),
//                     (err, rules) => {
//                         assert.isNull(err);

//                         assert.isObject(rules);
//                         assert.lengthOf(rules.data, 2);

//                         callback();
//                     }
//                 );
//             }
//         ], done);
//     }

// }
