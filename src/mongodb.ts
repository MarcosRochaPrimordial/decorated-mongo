import { MongoServer } from './mongoServer';

export class MongoDb {
    public static insert(registry: any, collectionName: string) {
        return new Promise((resolve, reject) => {
            MongoServer.initMongoServer()
                .then(({ db, dbInstance }) => {
                    db.collection(collectionName).insertOne(registry);
                    dbInstance.close();
                    resolve();
                })
                .catch(err => reject(err));
        });
    }

    public static find(registry: any, collectionName: string) {
        return new Promise((resolve, reject) => {
            MongoServer.initMongoServer()
                .then(({ db, dbInstance }) => {
                    db.collection(collectionName)
                        .find(registry)
                        .toArray((errors, results) => {
                            if (errors) reject(errors);
                            resolve(results);
                        });
                    dbInstance.close();
                })
                .catch(err => reject(err));
        });
    }
}