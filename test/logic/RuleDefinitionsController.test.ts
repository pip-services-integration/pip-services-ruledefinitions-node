let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { RuleDefinitionsMemoryPersistence } from "../../src/persistence/RuleDefinitionsMemoryPersistence";
import { ConfigParams, Descriptor, References, FilterParams, PagingParams } from "pip-services3-commons-node";
import { RuleDefinitionsController } from "../../src/logic/RuleDefinitionsController";
import { RuleV1, RulePriorityV1 } from "../../src/data/version1";

suite('RuleDefinitionsController', () => {
    let _persistence: RuleDefinitionsMemoryPersistence;
    let _controller: RuleDefinitionsController;

    let RULE1: RuleV1 = {
        id: '1',
        name: 'name 1',
        group: 'Group 1',
        action: 'copy',
        condition: 'condition 1',
        priority: RulePriorityV1.High,
        description: null,
        params: { param1: '123' }
    };

    let RULE2: RuleV1 = {
        id: '2',
        name: 'name 2',
        group: 'Group 1',
        action: 'delete',
        condition: 'condition 2',
        priority: RulePriorityV1.Low,
        description: null,
        params: { param1: '2443' }
    };

    let RULE3: RuleV1 = {
        id: '3',
        name: 'name 3',
        group: 'Group 2',
        action: 'create',
        condition: 'condition 1',
        priority: RulePriorityV1.Medium,
        description: null,
        params: { param1: '2345' }
    };

    setup((done) => {
        _persistence = new RuleDefinitionsMemoryPersistence();
        _controller = new RuleDefinitionsController();
        _persistence.configure(new ConfigParams());
        var references = References.fromTuples(
            new Descriptor("pip-services-ruledefinitions", "persistence", "mock", "default", "1.0"), _persistence
        );
        _controller.setReferences(references);
        _persistence.open(null, done);
    });

    teardown((done) => {
        _persistence.close(null, done);
    });

    test('CRUD Operations', (done) => {
        let rule1: RuleV1;

        async.series([
            // Create one rule
            (callback) => {
                _controller.createRule(
                    null,
                    RULE1,
                    (err, rule) => {
                        assert.isNull(err);

                        assert.isObject(rule);
                        assert.equal(rule.id, RULE1.id);
                        assert.equal(rule.name, RULE1.name);
                        assert.equal(rule.group, RULE1.group);

                        rule1 = rule;
                        callback();
                    }
                );
            },
            // Create another rule
            (callback) => {
                _controller.createRule(
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
                _controller.createRule(
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
            },
            // Get all rules
            (callback) => {
                _controller.getRules(
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

                _controller.updateRule(
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
                _controller.deleteRuleById(
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
                _controller.getRuleById(
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
    });

    test('Get with Filters', (done) => {

        async.series([
            // Create one rule
            (callback) => {
                _controller.createRule(
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
                _controller.createRule(
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
                _controller.createRule(
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
            },
            // Get rules filtered by group
            (callback) => {
                _controller.getRules(
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
                _controller.getRules(
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
                _controller.getRules(
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
                _controller.getRules(
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
                _controller.getRules(
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
            }
        ], done);
    });

});