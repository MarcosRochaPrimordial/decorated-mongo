import { Id, MongoFunctions, NotNull, Collection } from './../lib/main';
import { Endereco } from './endereco';

export class Usuario extends MongoFunctions {
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

    getId(): string {
        return this.codigo;
    }

    setId(codigo: string) {
        this.codigo = codigo;
    }

    getNome(): string {
        return this.nome;
    }

    setNome(nome: string) {
        this.nome = nome;
    }

    getLogin(): string {
        return this.login;
    }

    setLogin(login: string) {
        this.login = login;
    }

    getSenha(): string {
        return this.senha;
    }

    setSenha(senha: string) {
        this.senha = senha;
    }

    getEndereco(): Endereco {
        return this.endereco;
    }

    setEndereco(endereco: Endereco) {
        this.endereco = endereco;
    }
}