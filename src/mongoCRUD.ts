import { MongoDb } from './mongodb';
import { ValidationService } from './validationService';
import 'reflect-metadata';

export class MongoCRUD {

    public save() {
        const collectionName = Reflect.getMetadata('collection-id', this);
        const idKey = Reflect.getMetadata('collection-id', this, collectionName);

        return new Promise((resolve, reject) => {
            const errors = this.validation();
            if (errors.length > 0) {
                reject(errors);
            } else {
                MongoDb.insert(this, collectionName)
                    .then(() => {
                        this[idKey] = this['_id'];
                        delete this['_id'];
                        resolve();
                    })
                    .catch(err => {
                        errors.push(err);
                        reject(errors);
                    });
            }
        });
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