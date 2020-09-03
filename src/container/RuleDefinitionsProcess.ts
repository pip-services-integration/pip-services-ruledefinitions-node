import { ProcessContainer } from 'pip-services3-container-node';

import { RuleDefinitionsServiceFactory } from '../build/RuleDefinitionsServiceFactory';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';

export class RuleDefinitionsProcess extends ProcessContainer {

    public constructor() {
        super("rule_definitions", "Business rule definitions microservice");
        this._factories.add(new RuleDefinitionsServiceFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
