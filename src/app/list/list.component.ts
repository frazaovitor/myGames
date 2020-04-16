import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

//Modelagem de dados

export interface Game {
  cover: string;
  date: string;
  description: string;
  media: string;
  platform: string;
  title: string;
}
// Modelagem com o id do documento
export interface GameId extends Game {
  id: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  // Atributos
  // obtem a coleção do Firestore, conforme o modelo acima
  private gameCollection: AngularFirestoreCollection<Game>;

  // objeto games é do tipo assíncrono que vai receber os dados do Db
  games: Observable<GameId[]>;

  // campo que será usado  para ordenação dos dados

  orderBy: string;

  // direção da ordenação dos dados ( ascendente oi descendente)

  orderDr: any;

  constructor(private db: AngularFirestore) {
    // ordena pelo título ao carregar
    this.orderBy = 'title';

    // em ordem ascendente ao carregar
    this.orderDr = 'asc';
  }

  ngOnInit(): void {
    //atualiza a lista de games
    this.getList();
  }

  getList() {
    //referencia aos documentos da coleção 'games'

    this.gameCollection = this.db.collection<Game>('games', (ref) =>
      ref.orderBy(this.orderBy, this.orderDr)
    );

    // obter os documentos da coleção
    this.games = this.gameCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Game;
          const id = a.payload.doc.id;

          //retorna os documentos quando eles foram obtidos
          return { id, ...data };
        })
      )
    );
  }
  // altera o campo usado para ordenar a listagem
  changeOrderfield(field: string) {
    if (this.orderBy != field) {
      this.orderBy = field;
      this.getList(); //atualiza a listagem com o novo parâmetro
    }
    return false; // sai sem fazer nada
  }

  changeOrderDir(direction: any) {
    if (this.orderDr != direction) {
      this.orderDr = direction;
      this.getList(); //atualiza a listagem com o novo parâmetro
    }
    return false; // sai sem fazer nada
  }
}
