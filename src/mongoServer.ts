import { MongoClient } from "mongodb";

export class MongoServer {
    public static initMongoServer() {
        return new Promise((resolve, reject) => {
            const options = {
                useNewUrlParser: true,
            }
            MongoClient.connect(process.env.DATABASE_URL, options)
                .then((db) => {
                    resolve({ db: db.db(process.env.DATABASE_NAME), dbInstance: db });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}