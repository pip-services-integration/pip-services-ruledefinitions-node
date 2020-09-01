# HTTP Protocol (version 1) <br/> RuleDefinitions Microservice

RuleDefinitions microservice implements a HTTP compatible API, that can be accessed on configured port.
All input and output data is serialized in JSON format. Errors are returned in [standard format]().

* [RuleV1 class](#class1)
* [DataPage<RuleV1> class](#class2)
* [POST /rules/get_rules](#operation1)
* [POST /rules/get_rule_by_id](#operation2)
* [POST /rules/create_rule](#operation3)
* [POST /rules/update_rule](#operation4)
* [POST /rules/delete_rule_id](#operation5)

## Data types

### <a name="class1"></a> RuleV1 class

Represents an rule

**Properties:**
- id: string - unique rule id
- name: string - rule name
- description: string - rule description
- product: string - product name
- copyrights: string - copyrights
- min_ver: number - minimum version
- max_ver: number - maximum version

### <a name="class2"></a> DataPage<RuleV1> class

Represents a paged result with subset of requested rules

**Properties:**
- data: [RuleDefinition] - array of retrieved RuleDefinition page
- count: int - total number of objects in retrieved resultset

## Operations

### <a name="operation1"></a> Method: 'POST', route '/rules/get_rules'

Retrieves a collection of rules according to specified criteria

**Request body:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- filter: Object
  - tags: string - (optional) a comma-separated list of tags with topic names
  - status: string - (optional) rule editing status
  - author: string - (optional) author name in any language 
- paging: Object
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result

**Response body:**
Array of RuleDefinition objects, DataPage<RuleV1> object is paging was requested or error

### <a name="operation2"></a> Method: 'POST', route '/rules/get\_rule\_by_id'

Retrieves a single rule specified by its unique id

**Request body:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- rule_id: string - unique rule id

**Response body:**
RuleDefinition object, null if object wasn't found or error 

### <a name="operation3"></a> Method: 'POST', route '/rules/create_rule'

Creates a new rule

**Request body:**
- correlation_id: string - (optional) unique id that identifies distributed transaction
- rule: RuleV1 - RuleDefinition object to be created. If object id is not defined it is assigned automatically.

**Response body:**
Created RuleDefinition object or error

### <a name="operation4"></a> Method: 'POST', route '/rules/update_rule'

Updates rule specified by its unique id

**Request body:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- rule: RuleV1 - RuleDefinition object with new values. Partial updates are supported

**Response body:**
Updated RuleDefinition object or error 
 
### <a name="operation5"></a> Method: 'POST', route '/rules/delete\_rule\_by_id'

Deletes rule specified by its unique id

**Request body:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- rule_id: string - unique rule id

**Response body:**
Occured error or null for success
 
