import { Injectable } from '@angular/core';
import { Player } from './player';
import { HEROES } from './mock-heroes';
// we will be using our player service as a singleton service

@Injectable()
export class HeroService {
  getHeroes(): Promise<Player[]> {
        return Promise.resolve(HEROES);
  }

  getPlayerTotal(): Promise<number> {
    return Promise.resolve(HEROES.length);
  }

  getHeroesSlowly(): Promise<Player[]> {
      return new Promise(resolve => {
        // Simulate server latency with 2 second delay
        setTimeout(() => resolve(this.getHeroes()), 2000);
      });
    }
}
