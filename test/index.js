"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_1 = require("./usuario");
let usuario = new usuario_1.Usuario("mongodb://localhost:27017/", "api");
usuario.setNome("Marcos");
usuario.save("clientes", usuario, (err, result) => {
    console.log(result);
});
