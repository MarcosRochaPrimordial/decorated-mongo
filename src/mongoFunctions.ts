import { Rule } from "./rule";
import 'reflect-metadata';
import { MongoDb } from './mongodb';

export class MongoFunctions {

    public save(callback: any) {
        const collectionName = Reflect.getMetadata('collection-id', this);
        const idKey = Reflect.getMetadata('collection-id', this, collectionName);

        let errors = this.validations() || [];

        if (errors.length > 0) {
            callback(errors);
        } else {
            MongoDb.insert(this, collectionName, (err) => {
                if (err) {
                    errors = err;
                } else {
                    this[idKey] = this['_id'];
                    delete this['_id'];
                }
                callback(errors);
            });
        }
    }

    private validations() {
        const properties: string[] = Reflect.getMetadata('validation', this) || [];
        const errors: string[] = [];
        properties.forEach(property => {
            const rules: Rule[] = Reflect.getMetadata('validation', this, property) || [];
            rules.forEach(rule => {
                const error = rule.evaluate(this, property);
                if (error) {
                    errors.push(error);
                }
            });
        });

        return errors;
    }
}