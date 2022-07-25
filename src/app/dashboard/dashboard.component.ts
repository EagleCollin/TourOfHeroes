import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../shared/firebase.service';
import { FbHero } from '../shared/hero-firebase.model';
import { Hero } from '../hero.model';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  heroes: FbHero[] = [];
  colSpan: number;
  colNumber: number;
  constructor(
    private heroService: HeroService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    // this.heroService
    //   .getHeroes()
    //   .subscribe((heroes) => (this.heroes = heroes.slice(1, 5)));

    this.firebaseService.heroes.subscribe((heroes) => {
      this.heroes = heroes;
    });
  }
}
