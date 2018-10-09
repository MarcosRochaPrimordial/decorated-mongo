import { DecoratedMongo, Column } from './../lib/main';

export class Usuario extends DecoratedMongo {
    @Column()
    nome: string;

    login: string;

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