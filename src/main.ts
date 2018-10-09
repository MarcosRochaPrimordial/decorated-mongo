import { MongoClient } from "mongodb";

export class DecoratedMongo {

    private url: string;
    private db: string;

    constructor(url, db) {
        this.url = url;
        this.db = db;
    }

    public save(collectionName: string, object: any, callback) {

        this.initMongoClient((db) => {
            let dbo = db.db(this.db);

            delete object.url;
            delete object.db;

            dbo.collection(collectionName).save(object, (err, result) => {
                callback(err, result);
                db.close();
            });
        });
    }

    private initMongoClient(callback) {
        MongoClient.connect(this.url, { useNewUrlParser: true }, (err, db) => {
            this.handleConnection(err, db, callback);
        });
    }

    private handleConnection(err, db, callback) {
        if (err) {
            console.log(err);
        } else {
            callback(db);
        }
    }
}

export function Column(obj: {required: boolean} = null) {
    return function(target: any, propertyKey: string) {
        console.log(target, propertyKey);
    }
}