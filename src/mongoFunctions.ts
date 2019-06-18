import { MongoDb } from './mongodb';
import { ValidationService } from './validationService';
import 'reflect-metadata';

export class MongoFunctions {

    public save(callback: any) {
        const collectionName = Reflect.getMetadata('collection-id', this);
        const idKey = Reflect.getMetadata('collection-id', this, collectionName);

        try {
            this.validation();
            MongoDb.insert(this, collectionName, (err) => {
                if (err) throw new Error(err);

                this[idKey] = this['_id'];
                delete this['_id'];
            });
        } catch (error) {
            callback(error.message);
        }
    }

    private validation() {
        const properties: string[] = Reflect.getMetadata('validation', this) || [];
        let validationService = new ValidationService();
        properties.forEach(property => {
            validationService.onSaveValidation(this, property);
        });
    }
}