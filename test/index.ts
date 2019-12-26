import { Usuario } from "./usuario";
import { Mongo, Fndr, MongoCRUD } from './../lib/main';
import { Endereco } from "./endereco";
import { Conta } from "./conta";

Mongo.use('mongodb://localhost:27017', 'teste');

let usuario = new Usuario();
usuario.nome = 'Marcos Nome';
// usuario.senha = 'Marcos Senha';
usuario.login = 'Marcos Login';

usuario.endereco = [];

let endereco1 = new Endereco();
// endereco1.rua = 'rua endereco 1';

usuario.endereco.push(endereco1);

let endereco2 = new Endereco();
// endereco2.rua = 'rua endereco 2';

usuario.endereco.push(endereco2);

usuario.save().then(() => {
    console.log('finished');
})
.catch(errors => console.log(errors));
