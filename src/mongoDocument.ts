import { MongoCRUD, Modifier } from "./main";

export class MongoDocument {

    public save() {
        return MongoCRUD.save(this);
    }

    public find(modifier?: Modifier) {
        return MongoCRUD.find(this, modifier);
    }

    public delete() {
        return MongoCRUD.delete(this);
    }

    public update(clauses: object) {
        return MongoCRUD.update(this, clauses);
    }

}