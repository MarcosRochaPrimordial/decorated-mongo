import { Usuario } from "./usuario";
import { MongoServer } from './../lib/main';

MongoServer.use('mongodb://localhost:27017', 'api');

let usuario = new Usuario();
usuario.setNome("açslkdjf");
usuario.setLogin("021983748");
usuario.setSenha("asd5f44w9ef4s5d1f98w4f");
/*usuario.save(err => {
    if(err) {
        console.log(err);
    } else {*/
        usuario.setId('5bc0bfc6305aed18b09efb8e');
        usuario.find((err, result) => {
            if(err) {
                console.log(err);
            } else {
                console.log(result);
            }
        });
    /*}
});*/