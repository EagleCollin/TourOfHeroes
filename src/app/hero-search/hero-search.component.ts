import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  switchMap,
} from 'rxjs';
import { FirebaseService } from '../shared/firebase.service';
import { FbHero } from '../shared/hero-firebase.model';
import { Hero } from '../hero.model';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
})
export class HeroSearchComponent implements OnInit {
  // heroes$!: Observable<Hero[]>;
  heroes$!: Observable<FbHero[]>;
  private searchTerms = new Subject<string>();
  searchValue: string = '';
  results;

  constructor(
    private heroService: HeroService,
    private firebaseService: FirebaseService,
    private store: AngularFirestore
  ) {}

  search() {
    // Http
    // this.searchTerms.next(term);
    this.results = this.store
      .collection('heroes', (ref) =>
        ref
          .orderBy('name')
          .startAt(this.searchValue)
          .endAt(this.searchValue + '\uf8ff')
      )
      .valueChanges();
  }

  nameFormat(name) {
    const formattedName = name
      .split(' ')
      .map((string) => {
        const newName = string.charAt(0).toUpperCase() + string.slice(1);
        return newName;
      })
      .join(' ');
    this.searchValue = formattedName;
    this.search();
  }

  ngOnInit(): void {
    // HTTP
    // this.heroes$ = this.searchTerms.pipe(
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   switchMap((term: string) => this.heroService.searchHeroes(term))
    // );
  }
}
