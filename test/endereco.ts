import { NotNull, MongoCRUD } from './../lib/main';

export class Endereco extends MongoCRUD {

    @NotNull()
    rua: string;

    constructor() {
        super();
    }
}