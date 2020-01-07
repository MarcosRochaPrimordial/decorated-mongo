import { Usuario } from "./usuario";
import { MongoCRUD } from "../lib/main";

MongoCRUD.findWhere(Usuario).then(result => console.log(result)).catch(err => console.log(err));
