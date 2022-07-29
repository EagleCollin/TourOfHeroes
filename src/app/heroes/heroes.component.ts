import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../shared/firebase.service';
import { FbHero } from '../shared/hero-firebase.model';
import { Hero } from '../hero.model';
import { HeroService } from '../hero.service';
import { MessageService } from '../message/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  // heroes: Hero[] = [];
  heroes: FbHero[] = [];

  constructor(
    private heroService: HeroService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    // this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
    this.firebaseService.heroes.subscribe((heroes) => (this.heroes = heroes));
  }
  // Firebase
  add(name: string, race: string) {
    const appId = this.heroes.length + 1;
    const formattedName = name
      .split(' ')
      .map((string) => {
        const newName = string.charAt(0).toUpperCase() + string.slice(1);
        return newName;
      })
      .join(' ');
    const newRace = race;
    this.firebaseService.addHero(formattedName, appId, newRace);

    console.log(formattedName, race);
  }

  delete(hero: FbHero) {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.firebaseService.deleteHero(hero.id);
  }

  // HTTP
  // add(name: string) {
  //   name = name.trim();
  //   if (!name) {
  //     return;
  //   }
  //   this.heroService.addHero({ name } as Hero).subscribe((hero) => {
  //     this.heroes.push(hero);
  //   });
  // }

  // delete(hero: Hero) {
  //   this.heroes = this.heroes.filter((h) => h !== hero);
  //   this.heroService.deleteHero(hero.id).subscribe();
  // }
}
