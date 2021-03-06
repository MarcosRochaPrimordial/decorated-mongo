import { MongoServer } from './mongoServer';
import { Modifier } from './main';

export class MongoDb {
    public static insert(registry: any, collectionName: string) {
        return new Promise((resolve, reject) => {
            MongoServer.initMongoServer()
                .then(({ db, dbInstance }) => {
                    db.collection(collectionName)
                        .insertOne(registry)
                    dbInstance.close();
                    resolve();
                })
                .catch(err => reject(err));
        });
    }

    public static find<T>(registry: object, collectionName: string, modifier?: Modifier): Promise<T> {
        return new Promise((resolve, reject) => {
            const mod = modifier ? modifier : new Modifier();
            MongoServer.initMongoServer()
                .then(({ db, dbInstance }) => {
                    db.collection(collectionName)
                        .find(registry)
                        .project({ _id: 0 })
                        .limit(mod.getLimit())
                        .skip(mod.getSkip())
                        .sort(mod.querySort())
                        .toArray((errors, results) => {
                            if (errors) reject(errors);
                            resolve(results);
                        });
                    dbInstance.close();
                })
                .catch(err => reject(err));
        });
    }

    public static deleteMany(registry: any, collectionName: string) {
        return new Promise((resolve, reject) => {
            MongoServer.initMongoServer()
                .then(({ db, dbInstance }) => {
                    db.collection(collectionName)
                        .deleteMany(registry);
                    dbInstance.close();
                    resolve();
                })
                .catch(err => reject(err));
        });
    }

    public static updateMany(clauses: object, registry: object, collectionName: string) {
        return new Promise((resolve, reject) => {
            MongoServer.initMongoServer()
                .then(({ db, dbInstance }) => {
                    db.collection(collectionName)
                        .updateMany(clauses, { $set: registry });
                    dbInstance.close();
                    resolve();
                })
                .catch(err => reject(err));
        });
    }
}