"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./../lib/main");
class Usuario extends main_1.DecoratedMongo {
    constructor() {
        super();
    }
    getId() {
        return this.codigo;
    }
    setId(codigo) {
        this.codigo = codigo;
    }
    getNome() {
        return this.nome;
    }
    setNome(nome) {
        this.nome = nome;
    }
    getLogin() {
        return this.login;
    }
    setLogin(login) {
        this.login = login;
    }
    getSenha() {
        return this.senha;
    }
    setSenha(senha) {
        this.senha = senha;
    }
}
__decorate([
    main_1.Id('usuario')
], Usuario.prototype, "codigo", void 0);
__decorate([
    main_1.Required()
], Usuario.prototype, "nome", void 0);
__decorate([
    main_1.Required()
], Usuario.prototype, "login", void 0);
__decorate([
    main_1.Required()
], Usuario.prototype, "senha", void 0);
exports.Usuario = Usuario;
