import { MongoCRUD } from "./main";

export class MongoDocument {

    public save() {
        return MongoCRUD.save(this);
    }

    public find() {
        return MongoCRUD.find(this);
    }
}