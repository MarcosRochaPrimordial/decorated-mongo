import { MongoServer } from './mongoServer';

export class MongoDb {
    public static insert(registry: any, collectionName: string, callback: any) {
        MongoServer.initMongoServer((error, db, dbInstance) => {
            if (error) {
                callback(error);
            } else {
                db.collection(collectionName).insertOne(registry, err => {
                    callback(err);
                    dbInstance.close();
                });
            }
        });
    }
}