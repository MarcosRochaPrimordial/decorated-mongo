import { MongoClient } from "mongodb";
import 'reflect-metadata';

class ObjectProperties {
    private static _instance: ObjectProperties = null;
    private properties: any = {};

    private constructor() {
        ObjectProperties._instance = this;
    }

    public static getInstance() {
        if (ObjectProperties._instance === null) {
            ObjectProperties._instance = new ObjectProperties();
        }

        return ObjectProperties._instance;
    }

    public getProperties(): any {
        return this.properties;
    }

    public setProperties(targetName, propertyKey) {
        if (this.properties[targetName] === null || this.properties[targetName] === undefined) {
            this.properties[targetName] = [];
        }
        this.properties[targetName].push(propertyKey);
    }
}

export class DecoratedMongo {

    private url: string;
    private db: string;

    constructor(url, db) {
        this.url = url;
        this.db = db;
    }

    public save(collectionName: string, object: any, callback) {
        let objectProperties = ObjectProperties.getInstance();
        let errors = null;
        objectProperties.getProperties()[collectionName].forEach(value => {
            if (object[value] === undefined || object[value] === null) {
                if(errors === null) {
                    errors = [];
                }
                errors.push(`${value} is required and must be sent`);
            }
        });

        if (errors != null) {
            callback(errors, null);
        } else {
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

export function Required(targetName: string) {
    return function (target: any, propertyKey: string) {
        let objectProperties = ObjectProperties.getInstance();

        objectProperties.setProperties(targetName, propertyKey);
    }
}