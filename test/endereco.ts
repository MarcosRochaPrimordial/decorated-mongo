import { NotNull, MongoDocument } from './../lib/main';

export class Endereco extends MongoDocument {

    @NotNull()
    rua: string;

    constructor() {
        super();
    }
}