import { Descriptor } from 'pip-services3-commons-node';
import { CommandableLambdaFunction } from 'pip-services3-aws-node';
import { RuleDefinitionsServiceFactory } from '../build/RuleDefinitionsServiceFactory';

export class RuleDefinitionsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("rule_definitions", "Business rule definitions function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-ruledefinitions', 'controller', 'default', '*', '*'));
        this._factories.add(new RuleDefinitionsServiceFactory());
    }
}

export const handler = new RuleDefinitionsLambdaFunction().getHandler();