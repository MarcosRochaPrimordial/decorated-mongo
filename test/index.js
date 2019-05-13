"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_1 = require("./usuario");
const main_1 = require("./../lib/main");
const endereco_1 = require("./endereco");
main_1.Mongo.use('mongodb://localhost:27017', 'teste');
let endereco = new endereco_1.Endereco();
endereco.setRua('rua j');
let usuario = new usuario_1.Usuario();
usuario.setNome('Marcos teste');
usuario.setSenha('tfdxg');
usuario.setLogin('açsldkfja');
usuario.setEndereco(endereco);
usuario.save((erros) => {
    if (erros.length > 0) {
        console.log(erros);
    }
});
