import { MongoClient } from "mongodb";
import 'reflect-metadata';

class ServiceMongoDb {
    private static _instance: ServiceMongoDb = null;
    private urlMongo: string = "";
    private dbMongo: string = "";

    private constructor() {
        ServiceMongoDb._instance = this;
    }

    public static getInstance() {
        if(ServiceMongoDb._instance === null) {
            ServiceMongoDb._instance = new ServiceMongoDb();
        }

        return ServiceMongoDb._instance;
    }

    public getUrlMongo(): string {
        return this.urlMongo;
    }

    public setUrlMongo(urlMongo: string) {
        this.urlMongo = urlMongo;
    }

    public getDbMongo(): string {
        return this.dbMongo;
    }

    public setDbMongo(dbMongo: string) {
        this.dbMongo = dbMongo;
    }
}

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

export class MongoServer {
    public static use(url: string, database: string) {
        let mongoInstance = ServiceMongoDb.getInstance();
        mongoInstance.setUrlMongo(url);
        mongoInstance.setDbMongo(database);
    }
}

export class DecoratedMongo {

    public save(callback = null) {
        const keys = Reflect.getMetadata('validation', this) as string[];
        const idKey = Reflect.getMetadata('identification', this) as string;
        let collectionName = Reflect.getMetadata('collection', this) as string;
        let errors: string[] = [];
        if(Array.isArray(keys)) {
            for(const key of keys) {
                const rules = Reflect.getMetadata('validation', this, key) as RequiredRule[];
                if(!Array.isArray(rules)) {
                    continue;
                }

                for(const rule of rules) {
                    const error = rule.evaluate(this, this[key], key);
                    if(error) {
                        errors.push(error);
                    }
                }
            }
        }

        if (errors.length !== 0) {
            if(callback != null) {
                callback(errors, null);
            }
        } else {
            let mongoInstance = ServiceMongoDb.getInstance();
            this.initMongoServer(mongoInstance.getUrlMongo(), (db) => {
                let dbo = db.db(mongoInstance.getDbMongo());
                dbo.collection(collectionName).save(this, (err, result) => {
                    this[idKey] = result.ops[0]._id;
                    if(callback != null) {
                        callback(err, result);
                    }
                    db.close();
                });
            });
        }
    }

    protected initMongoServer(url, callback) {
        MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
            if(err) {
                console.log(err);
            } else {
                callback(db);
            }
        });
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

export function Id(collectionName: string) {
    return function(target: any, propertyKey: string) {
        Reflect.defineMetadata('identification', propertyKey, target);
        Reflect.defineMetadata('collection', collectionName, target);
    }
}