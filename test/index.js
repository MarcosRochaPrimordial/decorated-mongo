"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_1 = require("./usuario");
let usuario = new usuario_1.Usuario("mongodb://localhost:27017/", "api");
usuario.setNome("Marcos");
usuario.setSenha("asudhuafshdufh");
usuario.save('Usuario', usuario, (err, result) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(result);
    }
});
