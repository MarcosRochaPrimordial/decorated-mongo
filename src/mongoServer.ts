import { MongoClient } from "mongodb";
import { Mongo } from './mongo';

export class MongoServer {
    public static initMongoServer() {
        let mongoInstance = Mongo.getInstance();
        return new Promise((resolve, reject) => {
            MongoClient.connect(mongoInstance.getUrlMongo(), { useNewUrlParser: true })
                .then((db) => {
                    resolve({ db: db.db(mongoInstance.getDbMongo()), dbInstance: db });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}