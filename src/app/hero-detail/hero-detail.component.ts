import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { FbHero } from '../hero-firebase.model';
import { Hero } from '../hero.model';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?: FbHero;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.getHero();
    this.firebaseService.selectedHero.subscribe((hero) => (this.hero = hero));
  }

  getHero() {
    const id = this.route.snapshot.paramMap.get('id');
    this.firebaseService.getHero(id);
  }

  save(id: string, newName: string) {
    this.firebaseService.updateHero(id, newName);
  }

  // HTTP

  // getHero() {
  //   const id = Number(this.route.snapshot.paramMap.get('id'));
  //   this.heroService.getHero(id).subscribe((hero) => (this.hero = hero));
  // }

  goBack() {
    this.location.back();
  }

  // save() {
  //   if (this.hero) {
  //     this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  //   }
  // }
}
