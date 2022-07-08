import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Hero } from './hero.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService {
  createDb() {
    const heroes = [
      { id: 12, name: 'Dr. Nice' },
      { id: 13, name: 'Mr Cold' },
      { id: 14, name: 'Miss Ivy' },
      { id: 15, name: 'Captain Eagle' },
      { id: 16, name: 'Steel Man' },
      { id: 17, name: 'Red Spider' },
    ];
    return { heroes };
  }

  genId(heroes: Hero[]) {
    return heroes.length > 0
      ? Math.max(...heroes.map((hero) => hero.id)) + 1
      : 11;
  }

  constructor(private store: AngularFirestore) {}
}
