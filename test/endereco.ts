import { Id, Required, MongoFunctions } from './../lib/main';

export class Endereco extends MongoFunctions {

    @Id()
    codigo: string;

    @Required()
    rua: string;

    constructor() {
        super();
    }

    getId(): string {
        return this.codigo;
    }

    setId(codigo: string) {
        this.codigo = codigo;
    }

    getRua(): string {
        return this.rua;
    }

    setRua(rua: string) {
        this.rua = rua;
    }
}