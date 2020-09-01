# AWS Lambda Protocol (version 1) <br/> RuleDefinitions Microservice

Pip.Services Template microservice implements AWS Lambda compatible API. 

The entire microservice is wrapped into a single lambda function.
Selection of specific operation is done via special **cmd** parameter.
The rest parameters are passed to the operation.

The input and output parameters shall be serialized as JSON string.

The protocol is identical to the one used by [Seneca](./SenecaProtocolV1.md)   

First get reference to AWS SDK, set connection parameters and get reference to Lambda:

```javascript
var aws = require('aws-sdk')();

aws.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: region
});

var lambda = new aws.Lambda();
```

Then you can start calling Lambda function:

```javascript
var params = {
    cmd: ...operation name...,
    ... the rest params ...
};

lambda.invoke(
    {
        FunctionName: arn,
        InvocationType: 'RequestResponse',
        LogType: 'None',
        Payload: JSON.stringify(params)
    },
    function (err, response) {
        if (err) ...
        var result = JSON.parse(response.Payload);
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
- result: RuleDefinition - retrieved rule, null if object wasn't found 

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

 