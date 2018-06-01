import { Pipe, PipeTransform } from '@angular/core';
import {Pessoa} from '../services/pessoa';

@Pipe({
    name: 'filtroPessoas'
})

export class FiltroPessoas implements PipeTransform {

    transform(pessoas: Pessoa[], nome: string, cpf:string) {

        nome = nome.toLowerCase();
        pessoas = pessoas.filter( pessoa => pessoa.cpf.toLowerCase().includes(cpf));
        pessoas = pessoas.filter( pessoa => pessoa.nome.toLowerCase().includes(nome));
        return pessoas;
    }
}