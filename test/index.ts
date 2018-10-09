import { Usuario } from "./usuario";

let usuario = new Usuario("mongodb://localhost:27017/", "api");
usuario.setNome("Marcos");
usuario.save("clientes", usuario, (err, result) => {
    console.log(result);
});