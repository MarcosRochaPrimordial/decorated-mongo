import { Required, MongoFunctions } from './../lib/main';

export class Endereco extends MongoFunctions {

    @Required()
    rua: string;

    constructor() {
        super();
    }

    getRua(): string {
        return this.rua;
    }

    setRua(rua: string) {
        this.rua = rua;
    }
}