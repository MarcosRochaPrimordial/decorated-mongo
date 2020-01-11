import { Id, NotNull, MongoDocument, DefaultNull } from "./../lib/main";

export class Conta extends MongoDocument {

    @Id()
    codigo: string;

    @NotNull()
    saldo: number;

    @DefaultNull()
    contaConjunta: boolean;
}