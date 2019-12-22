import { Usuario } from "./usuario";
import { Mongo } from './../lib/main';
import { Endereco } from "./endereco";

Mongo.use('mongodb://localhost:27017', 'teste');

let endereco = new Endereco();
endereco.rua = 'Av cagaço';

let usuario = new Usuario();
usuario.nome = 'Marcos teste 2';
usuario.senha = 'ich weise dir nicht';
usuario.login = 'login';
usuario.endereco = endereco;
usuario.save()
    .then(() => {
        delete usuario.nome;
        delete usuario.senha;
        delete usuario.login;
        usuario.find()
            .then(results => console.log(results))
            .catch(errors => console.log('errow: ', errors));
    })
    .catch((erros: string[]) => {
        if (erros.length > 0) console.log(erros);
    });