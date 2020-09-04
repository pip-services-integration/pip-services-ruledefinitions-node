let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams, MultiString, FilterParams, PagingParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { RuleV1 } from '../../../src/data/version1/RuleV1';
import { RuleDefinitionsMemoryPersistence } from '../../../src/persistence/RuleDefinitionsMemoryPersistence';
import { RuleDefinitionsController } from '../../../src/logic/RuleDefinitionsController';
import { RuleDefinitionsHttpServiceV1 } from '../../../src/services/version1/RuleDefinitionsHttpServiceV1';
import { RulePriorityV1 } from '../../../src/data/version1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

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

suite('RuleDefinitionsHttpServiceV1', () => {
    let persistence: RuleDefinitionsMemoryPersistence;
    let service: RuleDefinitionsHttpServiceV1;
    let rest: any;

    setup((done) => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });

        let controller = new RuleDefinitionsController();

        persistence = new RuleDefinitionsMemoryPersistence();

        service = new RuleDefinitionsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-ruledefinitions', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-ruledefinitions', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-ruledefinitions', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });

    teardown((done) => {
        service.close(null, (err) => {
            persistence.close(null, done);
        });
    });

    test('CRUD Operations', (done) => {
        let rule1, rule2;

        async.series([
            // Create one rule
            (callback) => {
                rest.post('/v1/rule_definitions/create_rule',
                    {
                        rule: RULE1
                    },
                    (err, req, res, rule) => {
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
                rest.post('/v1/rule_definitions/create_rule',
                    {
                        rule: RULE2
                    },
                    (err, req, res, rule) => {
                        assert.isNull(err);

                        assert.isObject(rule);
                        assert.equal(rule.id, RULE2.id);
                        assert.equal(rule.name, RULE2.name);
                        assert.equal(rule.group, RULE2.group);

                        rule2 = rule;

                        callback();
                    }
                );
            },
            // Create yet another rule
            (callback) => {
                rest.post('/v1/rule_definitions/create_rule',
                    {
                        rule: RULE3
                    },
                    (err, req, res, rule) => {
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
                rest.post('/v1/rule_definitions/get_rules',
                    {},
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        callback();
                    }
                );
            },
            // Update the rule
            (callback) => {
                rule1.name = 'Updated Name 1';

                rest.post('/v1/rule_definitions/update_rule',
                    {
                        rule: rule1
                    },
                    (err, req, res, rule) => {
                        assert.isNull(err);

                        assert.isObject(rule);
                        assert.equal(rule.name, 'Updated Name 1');
                        assert.equal(rule.id, RULE1.id);

                        rule1 = rule;

                        callback();
                    }
                );
            },
            // Delete rule
            (callback) => {
                rest.post('/v1/rule_definitions/delete_rule_by_id',
                    {
                        rule_id: rule1.id
                    },
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
            // Try to get delete rule
            (callback) => {
                rest.post('/v1/rule_definitions/get_rule_by_id',
                    {
                        rule_id: rule1.id
                    },
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

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
                rest.post('/v1/rule_definitions/create_rule',
                    {
                        rule: RULE1
                    },
                    (err, req, res, rule) => {
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
                rest.post('/v1/rule_definitions/create_rule',
                    {
                        rule: RULE2
                    },
                    (err, req, res, rule) => {
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
                rest.post('/v1/rule_definitions/create_rule',
                    {
                        rule: RULE3
                    },
                    (err, req, res, rule) => {
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
                rest.post('/v1/rule_definitions/get_rules',
                    {
                        filter: FilterParams.fromValue({
                            group: 'Group 1'
                        }),
                        paging: new PagingParams()
                    },
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
            // Get rules filtered by search
            (callback) => {
                rest.post('/v1/rule_definitions/get_rules',
                    {
                        filter: FilterParams.fromValue({
                            search: '2'
                        }),
                        paging: new PagingParams()
                    },
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
            // Get rules filtered by priority
            (callback) => {
                rest.post('/v1/rule_definitions/get_rules',
                    {
                        filter: FilterParams.fromValue({
                            priority: RulePriorityV1.Medium
                        }),
                        paging: new PagingParams()
                    },
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 1);

                        callback();
                    }
                );
            },
            // Get rules filtered by priority range
            (callback) => {
                rest.post('/v1/rule_definitions/get_rules',
                    {
                        filter: FilterParams.fromValue({
                            min_priority: RulePriorityV1.Medium,
                            max_priority: RulePriorityV1.High
                        }),
                        paging: new PagingParams()
                    },
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);


                        callback();
                    }
                );
            },
            // Get rules filtered by action
            (callback) => {
                rest.post('/v1/rule_definitions/get_rules',
                    {
                        filter: FilterParams.fromValue({
                            action: 'delete'
                        }),
                        paging: new PagingParams()
                    },
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 1);

                        callback();
                    }
                );
            },
            // Get rules filtered by disabled
            (callback) => {
                rest.post('/v1/rule_definitions/get_rules',
                    {
                        filter: FilterParams.fromValue({
                            disabled: true
                        }),
                        paging: new PagingParams()
                    },
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 1);

                        callback();
                    }
                );
            }
        ], done);
    });
});