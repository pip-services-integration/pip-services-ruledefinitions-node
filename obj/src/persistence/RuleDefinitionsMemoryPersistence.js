"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_data_node_1 = require("pip-services3-data-node");
class RuleDefinitionsMemoryPersistence extends pip_services3_data_node_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
    }
    matchString(value, search) {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }
    matchSearch(item, search) {
        search = search.toLowerCase();
        if (this.matchString(item.id, search))
            return true;
        if (this.matchString(item.name, search))
            return true;
        if (this.matchString(item.group, search))
            return true;
        if (this.matchString(item.description, search))
            return true;
        if (this.matchString(item.condition, search))
            return true;
        if (this.matchString(item.action, search))
            return true;
        return false;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let name = filter.getAsNullableString('name');
        let group = filter.getAsNullableString('group');
        let description = filter.getAsNullableString('description');
        let priority = filter.getAsNullableInteger('priority');
        let min_priority = filter.getAsNullableInteger('min_priority');
        let max_priority = filter.getAsNullableInteger('max_priority');
        let condition = filter.getAsNullableString('condition');
        let action = filter.getAsNullableString('action');
        let ids = filter.getAsObject('ids');
        // Process ids filter
        if (_.isString(ids))
            ids = ids.split(',');
        if (!_.isArray(ids))
            ids = null;
        return (item) => {
            if (search && !this.matchSearch(item, search))
                return false;
            if (id && item.id != id)
                return false;
            if (ids && _.indexOf(ids, item.id) < 0)
                return false;
            if (name && item.name != name)
                return false;
            if (group && item.group != group)
                return false;
            if (description && item.description != description)
                return false;
            if (priority && item.priority != priority)
                return false;
            if (min_priority && item.priority > min_priority)
                return false;
            if (max_priority && item.priority < max_priority)
                return false;
            if (condition && item.condition != condition)
                return false;
            if (action && item.action != action)
                return false;
            return true;
        };
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
}
exports.RuleDefinitionsMemoryPersistence = RuleDefinitionsMemoryPersistence;
//# sourceMappingURL=RuleDefinitionsMemoryPersistence.js.map