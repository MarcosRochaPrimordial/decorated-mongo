import { Usuario } from "./usuario";
import { Fndr, MongoCRUD, Modifier, Mongo } from './../lib/main';
import { Endereco } from "./endereco";
import { Conta } from "./conta";

let usuario = new Usuario();
usuario.nome = 'Marcos Nome';
usuario.fone = '81990908765';

Mongo.use('mongodb://localhost:27017', 'teste')

usuario.update(Fndr.where('nome').equals('Marcos Nome 6'))
    .then(() => {
        console.log('Finished');
    })
    .catch((err) => console.log(err));