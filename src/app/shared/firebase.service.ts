import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { map, Observable, of, Subject, switchMap } from 'rxjs';
import { FbHero } from './hero-firebase.model';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  private heroesCollection: AngularFirestoreCollection<FbHero>;
  heroes: Observable<FbHero[]>;
  selectedHero: Observable<FbHero>;
  searchQuery = new Subject<string>();
  queryResult;

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

  addHero(name: string, appId: number, race = 'Earthan') {
    try {
      const id = this.store.createId();
      const hero: FbHero = { id, name, appId, race };
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
      this.selectedHero = this.store.doc<FbHero>(`heroes/${id}`).valueChanges();
    } catch (e) {
      this.handleError(`Error fetching hero with id: ${id}`);
    }
  }

  updateHero(id: string, newName: string) {
    try {
      this.heroesCollection.doc(id).update({ name: newName });
    } catch {
      this.handleError(`Error updating name of hero with id: ${id}`);
    }
  }

  searchHeroes(searchTerm): Observable<FbHero[]> {
    return this.heroes.pipe(
      map((heroes) => heroes.filter((hero) => hero.name === searchTerm))
    );
  }

  searchHeroes2(searchTerm) {
    this.store
      .collection('heroes', (ref) =>
        ref
          .orderBy('name')
          .startAt(searchTerm)
          .endAt(searchTerm + '\uf8ff')
      )
      .valueChanges();
  }
}
