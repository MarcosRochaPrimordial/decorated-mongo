import { DecoratedMongo, Required, Id } from './../lib/main';

export class Usuario extends DecoratedMongo {
    @Id('usuario')
    codigo: string;

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
}