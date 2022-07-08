import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { FbHero } from './hero-firebase.model';
import { MessageService } from './message/message.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  private heroesCollection: AngularFirestoreCollection<FbHero>;
  heroes: Observable<FbHero[]>;

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  constructor(
    private store: AngularFirestore,
    private messageService: MessageService
  ) {
    this.heroesCollection = store.collection<FbHero>('heroes');
    this.heroes = this.heroesCollection.valueChanges({ idField: 'id' });
  }

  addHero(name: string) {
    try {
      const id = this.store.createId();
      const hero: FbHero = { id, name };
      this.heroesCollection.doc(id).set(hero);
      this.log(`${name} created successfully`);
    } catch (e) {
      this.handleError('Add Hero', e);
    }
  }

  deleteHero(id: string) {
    try {
      this.heroesCollection.doc(id).delete();
      this.messageService.add(`Hero with id: ${id} deleted successfully`);
    } catch (e) {
      this.messageService.add(`Error deleting hero with id:, id`);
    }
  }

  getHero(id: string) {
    try {
      const heroesQuery = this.heroesCollection.get().pipe();
      const hero = heroesQuery;
      return hero;
    } catch (e) {
      this.handleError(`Error fetching hero with id: ${id}`);
    }
  }
}
