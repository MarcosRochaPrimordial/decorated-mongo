import { Id, MongoCRUD, NotNull, Collection } from './../lib/main';
import { Endereco } from './endereco';

export class Usuario extends MongoCRUD {
    @Id()
    codigo: string;

    @NotNull()
    nome: string;

    @NotNull()
    login: string;

    @NotNull()
    senha: string;

    @Collection()
    @NotNull()
    endereco: Endereco;

    constructor() {
        super();
    }
}