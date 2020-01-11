import { Conta } from './conta';

let conta = new Conta();
conta.saldo = 300;

conta.save().then(() => console.log('finished')).catch(err => console.log(err));