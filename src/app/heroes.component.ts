import { Component } from '@angular/core';
import { Player } from './player';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-my-heroes',
  template: `

  `
  ,
  styleUrls: ['./app.component.css'],
  providers: [HeroService]
})
export class HeroesComponent implements OnInit {
  title = 'Tour of Heroes';
  heroes: Player[];
  selectedHero: Player;
constructor(private heroService: HeroService) {  }

  onSelect(hero: Player): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  ngOnInit(): void {
    this.getHeroes();
  }
}
