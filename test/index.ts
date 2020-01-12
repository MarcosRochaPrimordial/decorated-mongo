import { Conta } from './conta';

let conta = new Conta();
conta.saldo = 300;

conta.find().then((results: Conta[]) => console.log(results)).catch(err => console.error(err));

