let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams, MultiString } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { RuleV1 } from '../../src/data/version1/RuleV1';

import { IRuleDefinitionsPersistence } from '../../src/persistence/IRuleDefinitionsPersistence';
import { RulePriorityV1 } from '../../src/data/version1';

let RULE1: RuleV1 = {
    id: '1',
    name: 'name 1',
    group: 'Group 1',
    action: 'copy',
    condition: 'condition 1',
    priority: RulePriorityV1.High,
    description: null,
    params: { param1: '123' },
    disabled: false
};
let RULE2: RuleV1 = {
    id: '2',
    name: 'name 2',
    group: 'Group 1',
    action: 'delete',
    condition: 'condition 2',
    priority: RulePriorityV1.Low,
    description: null,
    params: { param1: '2443' },
    disabled: false
};
let RULE3: RuleV1 = {
    id: '3',
    name: 'name 3',
    group: 'Group 2',
    action: 'create',
    condition: 'condition 1',
    priority: RulePriorityV1.Medium,
    description: null,
    params: { param1: '2345' },
    disabled: true
};

export class RuleDefinitionsPersistenceFixture {
    private _persistence: IRuleDefinitionsPersistence;
    
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private testCreateRules(done) {
        async.series([
        // Create one rule
            (callback) => {
                this._persistence.create(
                    null,
                    RULE1,
                    (err, rule) => {
                        assert.isNull(err);

                        assert.isObject(rule);
                        assert.equal(rule.id, RULE1.id);
                        assert.equal(rule.name, RULE1.name);
                        assert.equal(rule.group, RULE1.group);

                        callback();
                    }
                );
            },
        // Create another rule
            (callback) => {
                this._persistence.create(
                    null,
                    RULE2,
                    (err, rule) => {
                        assert.isNull(err);

                        assert.isObject(rule);
                        assert.equal(rule.id, RULE2.id);
                        assert.equal(rule.name, RULE2.name);
                        assert.equal(rule.group, RULE2.group);

                        callback();
                    }
                );
            },
        // Create yet another rule
            (callback) => {
                this._persistence.create(
                    null,
                    RULE3,
                    (err, rule) => {
                        assert.isNull(err);

                        assert.isObject(rule);
                        assert.equal(rule.id, RULE3.id);
                        assert.equal(rule.name, RULE3.name);
                        assert.equal(rule.group, RULE3.group);

                        callback();
                    }
                );
            }
        ], done);
    }
                
    testCrudOperations(done) {
        let rule1: RuleV1;

        async.series([
        // Create items
            (callback) => {
                this.testCreateRules(callback);
            },
        // Get all rules
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        rule1 = page.data[0];

                        callback();
                    }
                );
            },
        // Update the rule
            (callback) => {
                rule1.name = 'Updated Name 1';

                this._persistence.update(
                    null,
                    rule1,
                    (err, rule) => {
                        assert.isNull(err);

                        assert.isObject(rule);
                        assert.equal(rule.name, 'Updated Name 1');
                        assert.equal(rule.id, rule1.id);

                        callback();
                    }
                );
            },
        // Delete rule
            (callback) => {
                this._persistence.deleteById(
                    null,
                    rule1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete rule
            (callback) => {
                this._persistence.getOneById(
                    null,
                    rule1.id,
                    (err, rule) => {
                        assert.isNull(err);

                        assert.isNull(rule || null);

                        callback();
                    }
                );
            }
        ], done);
    }

    testGetWithFilter(done) {
        async.series([
        // Create rules
            (callback) => {
                this.testCreateRules(callback);
            },
        // Get rules filtered by group
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        group: 'Group 1'
                    }),
                    new PagingParams(),
                    (err, rules) => {
                        assert.isNull(err);

                        assert.isObject(rules);
                        assert.lengthOf(rules.data, 2);

                        callback();
                    }
                );
            },
        // Get rules filtered by search
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        search: '2'
                    }),
                    new PagingParams(),
                    (err, rules) => {
                        assert.isNull(err);

                        assert.isObject(rules);
                        assert.lengthOf(rules.data, 2);

                        callback();
                    }
                );
            },
        // Get rules filtered by priority
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        priority: RulePriorityV1.Medium
                    }),
                    new PagingParams(),
                    (err, rules) => {
                        assert.isNull(err);

                        assert.isObject(rules);
                        assert.lengthOf(rules.data, 1);

                        callback();
                    }
                );
            },
            // Get rules filtered by priority range
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        min_priority: RulePriorityV1.Medium,
                        max_priority: RulePriorityV1.High
                    }),
                    new PagingParams(),
                    (err, rules) => {
                        assert.isNull(err);

                        assert.isObject(rules);
                        assert.lengthOf(rules.data, 2);

                        callback();
                    }
                );
            },
            // Get rules filtered by action
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        action: 'delete'
                    }),
                    new PagingParams(),
                    (err, rules) => {
                        assert.isNull(err);

                        assert.isObject(rules);
                        assert.lengthOf(rules.data, 1);

                        callback();
                    }
                );
            },
            // Get rules filtered by disabled
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        disabled: true
                    }),
                    new PagingParams(),
                    (err, rules) => {
                        assert.isNull(err);

                        assert.isObject(rules);
                        assert.lengthOf(rules.data, 1);

                        callback();
                    }
                );
            }
        ], done);
    }
}
