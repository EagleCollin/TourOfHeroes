import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { FbHero } from '../hero-firebase.model';
import { Hero } from '../hero.model';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  heroes: FbHero[] = [];
  colNumber;
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
      if (this.heroes.length < 12) {
        this.colNumber = Math.ceil(12 / this.heroes.length);
        console.log(this.colNumber);
      } else {
        this.colNumber = Math.ceil(this.heroes.length / 12);
      }
    });
  }
}
