import { MongoDb } from './mongodb';
import { ValidationService } from './validationService';
import 'reflect-metadata';

export class MongoFunctions {

    public save(callback: any) {
        const collectionName = Reflect.getMetadata('collection-id', this);
        const idKey = Reflect.getMetadata('collection-id', this, collectionName);

        const errors = this.validation();
        if (errors.length > 0) {
            callback(errors);
        } else {
            MongoDb.insert(this, collectionName, (err) => {
                if (err) {
                    errors.push(err);
                    callback(errors);
                } else {
                    this[idKey] = this['_id'];
                    delete this['_id'];
                }
            });
        }
    }

    private validation(): string[] {
        const properties: string[] = Reflect.getMetadata('validation', this) || [];
        let validationService = new ValidationService();
        let errors = [];
        properties.forEach(property => {
            const err = validationService.onSaveValidation(this, property);
            if (err.length > 0) {
                errors = errors.concat(err);
            }
        });
        return errors;
    }
}