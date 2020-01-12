import { MongoClient } from "mongodb";

export class MongoServer {
    public static initMongoServer() {
        return new Promise((resolve, reject) => {
            const options = {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
            const url = `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PWD}@${process.env.DATABASE_URL}/?authSource=${process.env.DATABASE_NAME}`
            MongoClient.connect(url, options)
                .then((db) => {
                    resolve({ db: db.db(process.env.DATABASE_NAME), dbInstance: db });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}