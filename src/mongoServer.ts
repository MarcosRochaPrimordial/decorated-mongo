import { MongoClient } from "mongodb";
import { Mongo } from './mongo';

export class MongoServer {
    public static initMongoServer(callback) {
        let mongoInstance = Mongo.getInstance();
        MongoClient.connect(mongoInstance.getUrlMongo(), { useNewUrlParser: true }, (err, db) => {
            callback(err, db.db(mongoInstance.getDbMongo()), db);
        });
    }
}