# <img src="https://github.com/pip-services/pip-services/raw/master/design/Logo.png" alt="Pip.Services Logo" style="max-width:30%"> <br/> RuleDefinitions microservice

This is rules microservice from Pip.Services library. 
It keeps a list of supported rules that are referenced from other content microservices.

The microservice currently supports the following deployment options:
* Deployment platforms: Standalone Process, Seneca
* External APIs: HTTP/REST, Seneca
* Persistence: Flat Files, MongoDB

This microservice has no dependencies on other microservices.

<a name="links"></a> Quick Links:

* [Download Links](doc/Downloads.md)
* [Development Guide](doc/Development.md)
* [Configuration Guide](doc/Configuration.md)
* [Deployment Guide](doc/Deployment.md)
* Client SDKs
  - [Node.js SDK](https://github.com/pip-services/pip-clients-rules-node)
  - [Java SDK](https://github.com/pip-services/pip-clients-rules-java)
  - [.NET SDK](https://github.com/pip-services/pip-clients-rules-dotnet)
  - [Go SDK](https://github.com/pip-services/pip-clients-rules-go)
* Communication Protocols
  - [HTTP Version 1](doc/HttpProtocolV1.md)
  - [Seneca Version 1](doc/SenecaProtocolV1.md)
  - [Lambda Version 1](doc/LambdaProtocolV1.md)

## Contract

Logical contract of the microservice is presented below. For physical implementation (HTTP/REST, Thrift, Seneca, Lambda, etc.),
please, refer to documentation of the specific protocol.

```typescript
class RuleV1 implements IStringIdentifiable {
    public id: string;
    public name: string;
    public description: string;
    public product: string;
    public copyrights: string;
    public min_ver: number;
    public max_ver: number;
}

interface IRuleDefinitionsV1 {
    getRules(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<RuleV1>) => void): void;

    getRuleById(correlationId: string, rule_id: string, 
        callback: (err: any, rule: RuleV1) => void): void;

    createRule(correlationId: string, rule: RuleV1, 
        callback: (err: any, rule: RuleV1) => void): void;

    updateRule(correlationId: string, rule: RuleV1, 
        callback: (err: any, rule: RuleV1) => void): void;

    deleteRuleById(correlationId: string, rule_id: string,
        callback: (err: any, rule: RuleV1) => void): void;
}
```

## Download

Right now the only way to get the microservice is to check it out directly from github repository
```bash
git clone git@github.com:pip-services-content/pip-services-ruledefinitions-node.git
```

Pip.Service team is working to implement packaging and make stable releases available for your 
as zip downloadable archieves.

## Run

Add **config.yaml** file to the root of the microservice folder and set configuration parameters.
As the starting point you can use example configuration from **config.example.yaml** file. 

Example of microservice configuration
```yaml
- descriptor: "pip-services-container:container-info:default:default:1.0"
  name: "pip-services-ruledefinitions"
  description: "RuleDefinitions microservice"

- descriptor: "pip-services-commons:logger:console:default:1.0"
  level: "trace"

- descriptor: "pip-services-ruledefinitions:persistence:file:default:1.0"
  path: "./data/rules.json"

- descriptor: "pip-services-ruledefinitions:controller:default:default:1.0"

- descriptor: "pip-services-ruledefinitions:service:http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 8080
```
 
For more information on the microservice configuration see [Configuration Guide](Configuration.md).

Start the microservice using the command:
```bash
node run
```

## Use

The easiest way to work with the microservice is to use client SDK. 
The complete list of available client SDKs for different languages is listed in the [Quick Links](#links)

If you use Node.js then you should add dependency to the client SDK into **package.json** file of your project
```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-rules-node": "^1.1.*",
        ...
    }
}
```

Inside your code get the reference to the client SDK
```javascript
var sdk = new require('pip-clients-rules-node');
```

Define client configuration parameters that match configuration of the microservice external API
```javascript
// Client configuration
var config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};
```

Instantiate the client and open connection to the microservice
```javascript
// Create the client instance
var client = sdk.RuleDefinitionsHttpClientV1(config);

// Connect to the microservice
client.open(null, function(err) {
    if (err) {
        console.error('Connection to the microservice failed');
        console.error(err);
        return;
    }
    
    // Work with the microservice
    ...
});
```

Now the client is ready to perform operations
```javascript
// Create a new rule
var rule = {
    id: 'my_app',
    name: 'My RuleDefinition',
    product: 'My Samples'
};

client.createRule(
    null,
    rule,
    function (err, rule) {
        ...
    }
);
```

```javascript
// Get the list of rules for 'My Samples' product
client.getRules(
    null,
    {
        product: 'My Samples'
    },
    {
        total: true,
        skip: 0,
        take: 10
    },
    function(err, page) {
    ...    
    }
);
```    

## Acknowledgements

This microservice was created and currently maintained by *Sergey Seroukhov*.
