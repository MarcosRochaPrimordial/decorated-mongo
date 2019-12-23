import { Id, NotNull, MongoDocument } from "./../lib/main";

export class Conta extends MongoDocument {

    @Id()
    codigo: number;

    @NotNull()
    saldo: number;

    constructor(saldo: number) {
        super();
        this.saldo = saldo;
    }
}