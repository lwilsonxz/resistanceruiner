import { Component, Input } from '@angular/core';
import { Player } from './player';
import { HeroService } from './hero.service';

@Component({
    selector: 'app-hero-detail',
    template: `
    <div *ngIf="hero">
        <h2>
            {{hero.name}} details!
        </h2>
        <div><label>id: </label>{{hero.id}}</div>
        <div>
            <label>name: </label>
            <input [(ngModel)]="hero.name" placeholder="name"/>
            <button (click)="removePlayer(hero)">X</button>
        </div>
    </div>
    `
})
export class HeroDetailComponent {
    @Input() player: Player;
}
