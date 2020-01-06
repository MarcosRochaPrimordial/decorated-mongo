import { Usuario } from "./usuario";

let usuario = new Usuario();
usuario.nome = 'Marcos Nome';

usuario.find().then(result => console.log(result)).catch(err => console.log(err));
