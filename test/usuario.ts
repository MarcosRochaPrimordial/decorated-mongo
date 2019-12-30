import { Id, MongoDocument, NotNull, Join } from './../lib/main';
import { Endereco } from './endereco';

export class Usuario extends MongoDocument {
    @Id()
    codigo: string;

    @NotNull()
    nome: string;

    @NotNull()
    login: string;

    @NotNull()
    senha: string;
    
    @NotNull()
    fone: string;

    @Join()
    @NotNull()
    endereco: Endereco[];

    constructor() {
        super();
    }
}