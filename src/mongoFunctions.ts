import { MongoDb } from './mongodb';
import { ValidationService } from './validationService';
import 'reflect-metadata';

export class MongoFunctions {

    private validationService: ValidationService

    constructor() {
        this.validationService = new ValidationService();
    }

    public save(callback: any) {
        const collectionName = Reflect.getMetadata('collection-id', this);
        const idKey = Reflect.getMetadata('collection-id', this, collectionName);

        let errors = this.validation() || [];

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

    private validation() {
        let errors: string[] = [];
        const properties: string[] = Reflect.getMetadata('validation', this) || [];
        properties.forEach(property => {
            errors = this.validationService.onSaveValidation(this, property);
        });

        return errors;
    }
}