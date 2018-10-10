import { Usuario } from "./usuario";

let usuario = new Usuario("mongodb://localhost:27017/", "api");
usuario.setNome("Marcos");
usuario.setSenha("asudhuafshdufh");
usuario.save('Usuario', usuario, (err, result) => {
    if(err) {
        console.log(err);
    } else {
        console.log(result);
    }
});