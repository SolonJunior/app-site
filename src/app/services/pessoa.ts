import {Telefone} from '../services/telefone';

export class Pessoa {
    
    id:number;
	nome:string;				
	cpf:string;
	dataNascimento:Date;
	email:string;
	idade:number;
	telefones:Array<Telefone>;
}