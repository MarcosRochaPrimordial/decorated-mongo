import { MongoDb } from './mongodb';
import { ValidationService } from './validationService';
import 'reflect-metadata';

export class MongoCRUD {

    private static collectionId: string = 'collection-id';

    public static save(registry: object) {
        const collectionName = Reflect.getMetadata(this.collectionId, registry);
        const idKey = Reflect.getMetadata(this.collectionId, registry, collectionName);

        return new Promise((resolve, reject) => {
            const errors = this.validation();
            if (errors.length > 0) {
                reject(errors);
            } else {
                MongoDb.insert(registry, collectionName)
                    .then(() => {
                        this.revertId(idKey);
                        resolve();
                    })
                    .catch(err => {
                        errors.push(err);
                        reject(errors);
                    });
            }
        });
    }

    public static find(registry: object) {
        const collectionName = Reflect.getMetadata(this.collectionId, registry);
        const idKey = Reflect.getMetadata(this.collectionId, registry, collectionName);
        this.revertId(idKey);
        return new Promise((resolve, reject) => {
            MongoDb.find(registry, collectionName)
            .then((results: any[]) => resolve(this.revertIdArray(results, idKey)))
            .catch((errors) => reject(errors));
        });
    }

    public static findWhere(collection: any, clauses: object) {
        return new Promise((resolve, reject) => {
            MongoDb.find(clauses, collection.name)
            .then((results: any[]) => resolve(this.revertIdArray(results, idKey)))
            .catch((errors) => reject(errors));
        });
    }

    private static validation(): string[] {
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

    private static revertId(idKey: string) {
        if (!!this['_id']) {
            this[idKey] = this['_id'];
            delete this['_id'];
        } else if (!!this[idKey]) {
            this['_id'] = this[idKey];
            delete this[idKey];
        }
    }

    private static revertIdArray(results, idKey) {
        return results.map(value => ({...value, [idKey]: value['_id']}));
    }
}