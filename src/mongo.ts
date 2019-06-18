export class Mongo {
    private static _instance: Mongo = null;
    private urlMongo: string = "";
    private dbMongo: string = "";

    public static use(url: string, database: string) {
        let mongoInstance = Mongo.getInstance();
        mongoInstance.setUrlMongo(url);
        mongoInstance.setDbMongo(database);
    }

    private constructor() {
        Mongo._instance = this;
    }

    public static getInstance() {
        if(Mongo._instance === null) {
            Mongo._instance = new Mongo();
        }

        return Mongo._instance;
    }

    public getUrlMongo(): string {
        return this.urlMongo;
    }

    private setUrlMongo(urlMongo: string) {
        this.urlMongo = urlMongo;
    }

    public getDbMongo(): string {
        return this.dbMongo;
    }

    private setDbMongo(dbMongo: string) {
        this.dbMongo = dbMongo;
    }
}