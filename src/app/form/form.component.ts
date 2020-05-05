import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import * as $ from 'jquery';

// Importa a classe dos campos do formulário
import { GameForm } from '../classes/game-form';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  // Declara campos do formulário
  gameForm: GameForm = new GameForm();

  // Armazena os nomes das plataformas
  platforms: Observable<any[]>;

  constructor(private db: AngularFirestore) {

    this.platforms = this.db.collection('platforms', (ref) => ref.orderBy('name')).valueChanges();

  }

  ngOnInit(): void {

    $(document).ready(() => { // JQuery
      $(window).resize(() => {
        if (window.innerWidth > 539) {
          $('aside').show(0);
        } else {
          $('aside').hide(0);
        }
      });
    });
  }

  // Método que proicessa o formulário
  onSubmit() {
    console.log(this.gameForm);

    // Se não identificou um id cadastre um novo jogo
    if (this.gameForm.id === undefined) {

      // Cadastrar novo jogo ({...} é um atalho para JSON Parse)
      this.db.collection<any>('games').add({ ...this.gameForm })
        .then(() => {

          // Feedback postivo para o usuário
          alert(`Jogo "${this.gameForm.title}" adicionado com sucesso!\n\nClique em [Ok] para continuar.`);

          // Apaga os valores dos campos do formulário
          this.gameForm = new GameForm();

          // Sai sem fazer mais nada
          return false;
        })
        .catch((err) => {
          // Exibe erros no console
          console.error('Erro ao gravar dados: ' + err);
        });

    } else {

      // Edita o jogo indicado pelo Id

    }


  }




  // Oculta / exibe ajuda
  helpToggle() {
    $(document).ready(() => {

      if ($('aside').is(':visible')) {
        this.helpHide();
      } else {
        this.helpShow();
      }

    });
    return false;
  }

  // Oculta ajuda
  helpHide() {
    $('aside').slideUp('fast');
  }

  // Mostra ajuda
  helpShow() {
    $('aside').slideDown('fast');
  }

  // Oculta ajuda pare resoluções baixas
  hideAside() {
    if (window.innerWidth > 539) {
      return false;
    } else {
      this.helpHide();
    }
  }

}
