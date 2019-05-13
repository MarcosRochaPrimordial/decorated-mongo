import { MongoFunctions } from './mongoFunctions';
import { Mongo } from './mongo';
import { RequiredRule } from './RequiredRule';
import { JoinRule } from './JoinRule';
import 'reflect-metadata';

function addRules(rule: any, target: Object, propertyKey: string) {
    const properties: string[] = Reflect.getMetadata('validation', target) || [];
    const rules: any[] = Reflect.getMetadata('validation', target, propertyKey) || [];

    if (properties.indexOf(propertyKey) < 0) {
        properties.push(propertyKey);
        Reflect.defineMetadata('validation', properties, target);
    }
    rules.push(rule);
    Reflect.defineMetadata('validation', rules, target, propertyKey);
}

function Id() {
    return function (target: Object, propertyKey: string) {
        Reflect.defineMetadata('collection-id', target.constructor.name, target);
        Reflect.defineMetadata('collection-id', propertyKey, target, target.constructor.name);
    }
}

function Required() {
    return function (target: Object, propertyKey: string) {
        addRules(RequiredRule, target, propertyKey);
    }
}

function Join() {
    return function (target: Object, propertyKey: string) {
        addRules(JoinRule, target, propertyKey);
    }
}

export { Id, Required, Join, MongoFunctions, Mongo }