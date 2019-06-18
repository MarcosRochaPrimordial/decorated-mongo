import { Usuario } from "./usuario";
import { Mongo } from './../lib/main';
import { Endereco } from "./endereco";

Mongo.use('mongodb://localhost:27017', 'teste');

let endereco = new Endereco();
endereco.setRua('rua j');

let usuario = new Usuario();
usuario.setNome('Marcos teste');
usuario.setSenha('tfdxg');
usuario.setLogin('açsldkfja');
usuario.setEndereco(endereco);

usuario.save((erros: string[]) => {
    if (erros.length > 0) {
        console.log(erros);
    }
});