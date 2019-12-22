import { Usuario } from "./usuario";
import { Mongo } from './../lib/main';
import { Endereco } from "./endereco";

Mongo.use('mongodb://localhost:27017', 'teste');

let endereco = new Endereco();
endereco.rua = 'rua j';

let usuario = new Usuario();
usuario.nome = 'Marcos teste';
usuario.senha = 'tfdxg';
usuario.login = 'açsldkfja';
usuario.endereco = endereco;
usuario.save()
.then(() => {
    console.log(usuario);
})
.catch((erros: string[]) => {
    if (erros.length > 0) console.log(erros);
});