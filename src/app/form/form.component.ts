import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  //Armazena os nomes das plataformas
  platforms: Observable<any[]>;


  constructor(private db: AngularFirestore) {
    this.platforms = this.db.collection('platforms', (ref)=> ref.orderBy('name')).valueChanges();
      }

  ngOnInit(): void {
  }

}
