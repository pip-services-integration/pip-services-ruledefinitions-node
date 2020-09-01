// let _ = require('lodash');
// import { FilterParams } from 'pip-services3-commons-node';
// import { PagingParams } from 'pip-services3-commons-node';
// import { DataPage } from 'pip-services3-commons-node';
// import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';
// import { RuleV1 } from '../data/version1/RuleV1';
// import { IRuleDefinitionsPersistence } from './IRuleDefinitionsPersistence';
// export class RuleDefinitionsMongoDbPersistence
//     extends IdentifiableMongoDbPersistence<RuleV1, string>
//     implements IRuleDefinitionsPersistence {
//     constructor() {
//         super('rules');
//     }
//     private composeFilter(filter: any) {
//         filter = filter || new FilterParams();
//         let criteria = [];
//         let search = filter.getAsNullableString('search');
//         if (search != null) {
//             let searchRegex = new RegExp(search, "i");
//             let searchCriteria = [];
//             searchCriteria.push({ id: { $regex: searchRegex } });
//             searchCriteria.push({ product: { $regex: searchRegex } });
//             searchCriteria.push({ copyrights: { $regex: searchRegex } });
//             criteria.push({ $or: searchCriteria });
//         }
//         let id = filter.getAsNullableString('id');
//         if (id != null)
//             criteria.push({ _id: id });
//         let product = filter.getAsNullableString('product');
//         if (product != null)
//             criteria.push({ product: product });
//         let group = filter.getAsNullableString('group');
//         if (group != null)
//             criteria.push({ group: group });
//         return criteria.length > 0 ? { $and: criteria } : null;
//     }
//     public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
//         callback: (err: any, page: DataPage<RuleV1>) => void): void {
//         super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
//     }
// }
//# sourceMappingURL=RuleDefinitionsMongoDbPersistence.js.map