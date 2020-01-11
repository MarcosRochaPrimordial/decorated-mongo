import { MongoCRUD } from './mongoCRUD';
import { RequiredRule } from './RequiredRule';
import { JoinRule } from './JoinRule';
import { Fndr } from './fndr';
import { Modifier } from './modifier';
import { MongoDocument } from './mongoDocument';
import 'reflect-metadata';
require('dotenv').config();

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

function NotNull() {
    return function (target: Object, propertyKey: string) {
        addRules(RequiredRule, target, propertyKey);
    }
}

function DefaultNull() {
    return function (target: Object, propertyKey: string) {
        const properties: string[] = Reflect.getMetadata('insert-null', target) || [];
        properties.push(propertyKey);
        Reflect.defineMetadata('insert-null', properties, target);
    }
}

function Join() {
    return function (target: Object, propertyKey: string) {
        addRules(JoinRule, target, propertyKey);
    }
}

export { Id, NotNull, DefaultNull, Join, MongoCRUD, Fndr, Modifier, MongoDocument }