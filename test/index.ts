import { Usuario } from "./usuario";
import { Mongo, Fndr, MongoCRUD } from './../lib/main';
import { Endereco } from "./endereco";
import { Conta } from "./conta";

Mongo.use('mongodb://localhost:27017', 'teste');

let conta1 = new Conta(85);
let conta2 = new Conta(150);
let conta3 = new Conta(198);
Promise.all([
    conta1.save(), conta2.save(), conta3.save()
])
    .then(() => {
        const wheres = Fndr.or(
            Fndr.where('saldo').lesser(100),
            Fndr.where('saldo').greater(150)
        );
        MongoCRUD.findWhere(Conta, wheres)
            .then(results => console.log(results))
            .catch(errors => console.log(errors));
    })
    .catch(errs => console.log(errs));