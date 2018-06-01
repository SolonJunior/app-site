import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import {PessoaService} from '../../services/pessoa.service';

import {Pessoa} from '../../services/pessoa';
import {Telefone} from '../../services/telefone';

import {Response} from '../../services/response';

import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-cadastro-pessoa',
    templateUrl: './cadastro.component.html',
    styleUrls:["./cadastro.component.css"]
  })
  export class CadastroComponent implements OnInit {
  
    private titulo:string;
    private pessoa:Pessoa = new Pessoa();
    private telefone:Telefone = new Telefone();

    constructor(private pessoaService: PessoaService,
                private router: Router,
                private activatedRoute: ActivatedRoute){}
  
    /*CARREGADO NA INICIALIZAÇÃO DO COMPONENTE */
    ngOnInit() {
      
      this.activatedRoute.params.subscribe(parametro=>{
        
        
        if(parametro["codigo"] == undefined){
          
          this.titulo = "Novo Cadastro de Pessoa";
        }
        else{

          this.titulo = "Editar Cadastro de Pessoa";
          this.pessoaService.getPessoa(Number(parametro["codigo"])).subscribe(res => this.pessoa = res);
        }
      

      });      
    }

    /*FUNÇÃO PARA SALVAR UM NOVO REGISTRO OU ALTERAÇÃO EM UM REGISTRO EXISTENTE */
    salvar():void {
      console.log(this.pessoa);
      /*SE NÃO TIVER CÓDIGO VAMOS INSERIR UM NOVO REGISTRO */
      if(this.pessoa.id == undefined){
        
        /*CHAMA O SERVIÇO PARA ADICIONAR UMA NOVA PESSOA */
        this.pessoaService.addPessoa(this.pessoa).subscribe(response => {
            
           //PEGA O RESPONSE DO RETORNO DO SERVIÇO
           let res:Response = <Response>response;

           console.log(this.pessoa);
                
           /*SE RETORNOU 1 DEVEMOS MOSTRAR A MENSAGEM DE SUCESSO
           E LIMPAR O FORMULÁRIO PARA INSERIR UM NOVO REGISTRO*/
           if(res.codigo == 1){
            alert(res.mensagem);
            this.pessoa = new Pessoa();
           }
           else{
             /*
             ESSA MENSAGEM VAI SER MOSTRADA CASO OCORRA ALGUMA EXCEPTION
             NO SERVIDOR (CODIGO = 0)*/
             alert(res.mensagem);
           }
         },
         (erro) => {   
           /**AQUI VAMOS MOSTRAR OS ERROS NÃO TRATADOS
             EXEMPLO: SE APLICAÇÃO NÃO CONSEGUIR FAZER UMA REQUEST NA API                        */                 
            alert(erro);
         });

      }
      else{

        /*AQUI VAMOS ATUALIZAR AS INFORMAÇÕES DE UM REGISTRO EXISTENTE */
        this.pessoaService.atualizarPessoa(this.pessoa).subscribe(response => {
          
        //PEGA O RESPONSE DO RETORNO DO SERVIÇO
        let res:Response = <Response>response;
              
         /*SE RETORNOU 1 DEVEMOS MOSTRAR A MENSAGEM DE SUCESSO
           E REDIRECIONAR O USUÁRIO PARA A PÁGINA DE CONSULTA*/
        if(res.codigo == 1){
          alert(res.mensagem);
          this.router.navigate(['/consulta-pessoa']);
        }
         else{
          /*ESSA MENSAGEM VAI SER MOSTRADA CASO OCORRA ALGUMA EXCEPTION
          NO SERVIDOR (CODIGO = 0)*/
           alert(res.mensagem);
         }
       },
       (erro) => {                    
         /**AQUI VAMOS MOSTRAR OS ERROS NÃO TRATADOS
          EXEMPLO: SE APLICAÇÃO NÃO CONSEGUIR FAZER UMA REQUEST NA API                        */                 
          alert(erro);
       });
      }

    }

    adicionar(telefone:Telefone){
      if(this.pessoa.telefones == undefined){
      this.pessoa.telefones = new Array<Telefone>();
      }
      this.pessoa.telefones.push(telefone);
      this.telefone = new Telefone();
    }

    excluir(telefone:Telefone, index:number):void {
      
      if(confirm("Deseja realmente excluir esse registro?")){
      
        
        this.pessoa.telefones.splice(index,1);
                    
      }

    }
  
  }