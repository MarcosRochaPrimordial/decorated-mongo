import { DecoratedMongo, Required, Id } from './../lib/main';

export class Usuario extends DecoratedMongo {
    @Id('usuario')
    id: string;

    @Required()
    nome: string;

    @Required()
    login: string;

    @Required()
    senha: string;

    constructor() {
        super();
    }

    getId(): string {
        return this.id;
    }

    setId(id: string) {
        this.id = id;
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