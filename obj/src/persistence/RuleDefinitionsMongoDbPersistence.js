"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_mongodb_node_1 = require("pip-services3-mongodb-node");
class RuleDefinitionsMongoDbPersistence extends pip_services3_mongodb_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('rule_definitions');
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
        let criteria = [];
        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            let searchCriteria = [];
            searchCriteria.push({ id: { $regex: searchRegex } });
            searchCriteria.push({ name: { $regex: searchRegex } });
            searchCriteria.push({ group: { $regex: searchRegex } });
            searchCriteria.push({ description: { $regex: searchRegex } });
            searchCriteria.push({ condition: { $regex: searchRegex } });
            searchCriteria.push({ action: { $regex: searchRegex } });
            criteria.push({ $or: searchCriteria });
        }
        // Filter ids
        let ids = filter.getAsObject('ids');
        if (_.isString(ids))
            ids = ids.split(',');
        if (_.isArray(ids))
            criteria.push({ _id: { $in: ids } });
        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });
        let name = filter.getAsNullableString('name');
        if (name != null)
            criteria.push({ name: name });
        let group = filter.getAsNullableString('group');
        if (group != null)
            criteria.push({ group: group });
        let description = filter.getAsNullableString('description');
        if (description != null)
            criteria.push({ description: description });
        let _priority = filter.getAsNullableInteger('priority');
        if (_priority != null)
            criteria.push({ priority: _priority });
        let min_priority = filter.getAsNullableInteger('min_priority');
        if (min_priority != null)
            criteria.push({ priority: { $lte: min_priority } });
        let max_priority = filter.getAsNullableInteger('max_priority');
        if (max_priority != null)
            criteria.push({ priority: { $gte: max_priority } });
        let condition = filter.getAsNullableString('condition');
        if (condition != null)
            criteria.push({ condition: condition });
        let action = filter.getAsNullableString('action');
        if (action != null)
            criteria.push({ action: action });
        return criteria.length > 0 ? { $and: criteria } : null;
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
}
exports.RuleDefinitionsMongoDbPersistence = RuleDefinitionsMongoDbPersistence;
//# sourceMappingURL=RuleDefinitionsMongoDbPersistence.js.map