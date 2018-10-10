import { MongoClient } from "mongodb";
import 'reflect-metadata';

class RequiredRule {
    private static _instance: RequiredRule = null;

    private constructor() {
        RequiredRule._instance = this;
    }

    public static getInstance() {
        if (RequiredRule._instance === null) {
            RequiredRule._instance = new RequiredRule();
        }

        return RequiredRule._instance;
    }

    public evaluate(target: any, value: any, key: string) {
        if(value) {
            return null;
        }

        return `${key} is required and must be sent`;
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
        const keys = Reflect.getMetadata('validation', object) as string[];
        let errors: string[] = [];
        if(Array.isArray(keys)) {
            for(const key of keys) {
                const rules = Reflect.getMetadata('validation', object, key) as RequiredRule[];
                if(!Array.isArray(rules)) {
                    continue;
                }

                for(const rule of rules) {
                    const error = rule.evaluate(object, object[key], key);
                    if(error) {
                        errors.push(error);
                    }
                }
            }
        }

        if (errors.length !== 0) {
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

function addValidationRule(target: any, propertyKey: string, rule: RequiredRule) {
    let rules: RequiredRule[] = Reflect.getMetadata('validation', target, propertyKey) || [];
    rules.push(rule);

    let properties: string[] = Reflect.getMetadata('validation', target) || [];
    if(properties.indexOf(propertyKey) < 0) {
        properties.push(propertyKey);
    }

    Reflect.defineMetadata('validation', properties, target);
    Reflect.defineMetadata('validation', rules, target, propertyKey);
}

export function Required() {
    return function (target: any, propertyKey: string) {
        addValidationRule(target, propertyKey, RequiredRule.getInstance());
    }
}