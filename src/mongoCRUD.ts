import { MongoDb } from './mongodb';
import { ValidationService } from './validationService';
import 'reflect-metadata';
import { ObjectID } from 'mongodb';

export class MongoCRUD {

    private static collectionId: string = 'collection-id';
    private static validate: string = 'validation';

    public static save(registry: object) {
        const collectionName = Reflect.getMetadata(this.collectionId, registry);
        const idKey = Reflect.getMetadata(this.collectionId, registry, collectionName);

        return new Promise((resolve, reject) => {
            const errors = this.validation(registry);
            if (errors.length > 0) {
                reject(errors);
            } else {
                registry[idKey] = new ObjectID();
                MongoDb.insert(registry, collectionName)
                    .then(() => {
                        this.deleteId(registry);
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
        return new Promise((resolve, reject) => {
            MongoDb.find(registry, collectionName)
                .then((results: any[]) => resolve(results))
                .catch((errors) => reject(errors));
        });
    }

    public static findWhere(collection: any, clauses: object) {
        return new Promise((resolve, reject) => {
            MongoDb.find(clauses, collection.name)
                .then((results: any[]) => resolve(results))
                .catch((errors) => reject(errors));
        });
    }

    private static validation(registry: any): string[] {
        const properties: string[] = Reflect.getMetadata(this.validate, registry) || [];
        let validationService = new ValidationService();
        let errors = [];
        properties.forEach(property => {
            const err = validationService.onSaveValidation(registry, property);
            if (err.length > 0) {
                errors = errors.concat(err);
            }
        });
        return errors;
    }

    private static deleteId(registry: any) {
        delete registry['_id'];
    }
}