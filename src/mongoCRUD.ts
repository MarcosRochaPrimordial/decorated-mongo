import { MongoDb } from './mongodb';
import { ValidationService } from './validationService';
import 'reflect-metadata';
import { ObjectID } from 'mongodb';
import { Modifier } from './main';

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

    public static find(registry: object, modifier?: Modifier) {
        const collectionName = Reflect.getMetadata(this.collectionId, registry);
        return MongoDb.find(registry, collectionName, modifier);
    }

    public static findWhere(collection: any, clauses?: object, modifier?: Modifier) {
        const clause = clauses ? clauses : { };
        return MongoDb.find(clause, collection.name, modifier);
    }

    public static delete(registry: object) {
        const collectionName = Reflect.getMetadata(this.collectionId, registry);
        return MongoDb.deleteMany(registry, collectionName);
    }

    public static deleteWhere(collection: any, clauses: object) {
        return MongoDb.deleteMany(clauses, collection.name);
    }

    public static update(registry: object, clauses: object) {
        const collectionName = Reflect.getMetadata(this.collectionId, registry);
        return MongoDb.updateMany(clauses, registry, collectionName);
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