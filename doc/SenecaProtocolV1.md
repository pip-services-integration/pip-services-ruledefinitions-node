# Seneca Protocol (version 1) <br/> RuleDefinitions Microservice

RuleDefinitions microservice implements a Seneca compatible API. 
Seneca port and protocol can be specified in the microservice [configuration](Configuration.md/#api_seneca). 

```javascript
var seneca = require('seneca')();

seneca.client({
    connection: {
        type: 'tcp', // Microservice seneca protocol
        localhost: '0.0.0.0', // Microservice localhost
        port: 9002, // Microservice seneca port
    }
});
```

The microservice responds on the following requests:

```javascript
seneca.act(
    {
        role: 'rules',
        version: 1,
        cmd: ...cmd name....
        ... Arguments ...
    },
    function (err, result) {
        ...
    }
);
```

* [RuleV1 class](#class1)
* [DataPage<RuleV1> class](#class2)
* [cmd: 'get_rules'](#operation1)
* [cmd: 'get_rule_by_id'](#operation2)
* [cmd: 'create_rule'](#operation3)
* [cmd: 'update_rule'](#operation4)
* [cmd: 'delete_rule_by_id'](#operation5)

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
- data: [RuleV1] - array of retrieved RuleDefinition page
- count: int - total number of objects in retrieved resultset

## Operations

### <a name="operation1"></a> Cmd: 'get_rules'

Retrieves a collection of rules according to specified criteria

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- filter: object - filter parameters
  - tags: [string] - (optional) list tags with topic names
  - status: string - (optional) rule editing status
  - author: string - (optional) author name in any language 
- paging: object - paging parameters
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result

**Returns:**
- err: Error - occured error or null for success
- result: DataPage<RuleV1> - retrieved rules in page format

### <a name="operation2"></a> Cmd: 'get\_rule\_by\_id'

Retrieves a single rule specified by its unique id

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- rule_id: string - unique RuleDefinition object id

**Returns:**
- err: Error - occured error or null for success
- result: RuleV1 - retrieved rule, null if object wasn't found 

### <a name="operation3"></a> Cmd: 'create_rule'

Creates a new rule

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- rule: RuleV1 - RuleDefinition object to be created. If object id is not defined it is assigned automatically.

**Returns:**
- err: Error - occured error or null for success
- result: RuleV1 - created rule object

### <a name="operation4"></a> Cmd: 'update_rule'

Updates rule specified by its unique id

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- rule_id: string - unique rule id
- rule: RuleV1 - rule object with new values. Partial updates are supported

**Returns:**
- err: Error - occured error or null for success
- result: RuleV1 - updated rule object 
 
### <a name="operation5"></a> Cmd: 'delete\_rule\_by_id'

Deletes rule specified by its unique id

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- rule_id: string - unique rule id

**Returns:**
- err: Error - occured error or null for success

 