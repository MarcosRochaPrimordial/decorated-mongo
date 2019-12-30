import { Usuario } from "./usuario";
import { Mongo, Fndr, MongoCRUD, Modifier } from './../lib/main';
import { Endereco } from "./endereco";
import { Conta } from "./conta";

Mongo.use('mongodb://localhost:27017', 'teste');

const modifier = new Modifier().limit(1).skip(0);
modifier.sort('nome').asc();

MongoCRUD.findWhere(Usuario, null, modifier)
    .then(results => console.log(results))
    .catch(err => console.log(err));