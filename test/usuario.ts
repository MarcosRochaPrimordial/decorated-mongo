import { DecoratedMongo, Required } from './../lib/main';

export class Usuario extends DecoratedMongo {
    @Required('Usuario')
    nome: string;

    login: string;

    @Required('Usuario')
    senha: string;

    constructor(url, db) {
        super(url, db);
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
}