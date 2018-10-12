import { Usuario } from "./usuario";
import { MongoServer } from './../lib/main';

MongoServer.use('mongodb://localhost:27017', 'api');

let usuario = new Usuario();
usuario.setNome("fulanodev");
usuario.setLogin("deverson1232341");
usuario.setSenha("3028u40823820938h2h");
usuario.save();