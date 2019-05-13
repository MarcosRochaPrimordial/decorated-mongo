"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./../lib/main");
class Endereco extends main_1.MongoFunctions {
    constructor() {
        super();
    }
    getId() {
        return this.codigo;
    }
    setId(codigo) {
        this.codigo = codigo;
    }
    getRua() {
        return this.rua;
    }
    setRua(rua) {
        this.rua = rua;
    }
}
__decorate([
    main_1.Id()
], Endereco.prototype, "codigo", void 0);
__decorate([
    main_1.Required()
], Endereco.prototype, "rua", void 0);
exports.Endereco = Endereco;
