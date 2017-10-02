import { Component, OnInit } from '@angular/core';

import { Player } from './player';
import { Game } from './game';
import { HeroService } from './hero.service';

@Component({
 selector: 'app-root',
 templateUrl: './app.component.html',
 styleUrls: ['./app.component.css'],
 providers: [HeroService]
})
export class AppComponent implements OnInit {
    title = 'No Fun Allowed!';
    game: Game; // start testing with a ten-player game
    heroes: Player[]; // array of players in the game
    selectedPlayer: Player; // the current player selected
    idCount: number; // running tally of players to ensure IDs aren't repeated. ID is the uniquie key of the Player object
    playerTotal: number;
    failureVotes: number;

    constructor(private heroService: HeroService) { }
    getHeroes(): void {
        this.game = new Game(10); // this doesn't really work
        // this would need an overhaul of the game constructor, but ultimately we want the game to be constructed from just playercount
        this.heroService.getHeroes().then(heroes => this.game.players = heroes); // get the player array
        this.getPlayerTotal(); // and get the total players
        // now try this
        // this.game = new Game(10);
        // this.idCount = 10;
    }

    getPlayerTotal(): void { // function to assign the total players to idCount
        this.heroService.getPlayerTotal().then(idCount => this.idCount = idCount);
    }

    ngOnInit(): void {
        // this.getHeroes();
        // we actually don't want or need to load the dummy data
    }

    onSelect(player: Player): void {
        this.selectedPlayer = player;
    }

    addHero(): void {
        this.game.players[this.game.players.length] = { id: this.idCount, name: 'New player', spyChance: 0, onMission: false};
        // adds a player with the name New player with an id one greater than the last id. users intentionally can't set ids
        ++this.idCount; // increment the id count, since we added a new player. Eliminated players are gone but not forgotten
        // id count always reflects the full number of players in the game
    }

    removePlayer(): void {
        const index = this.game.players.indexOf(this.selectedPlayer); // find the index of the hero to remove
        if (index > -1) { // if that player still exists
            this.game.players.splice(index, 1); // remove it
        }
    }

    selectPlayerTotal(players: number): void {
        // this method will make a new game with that number of players
        // and then disable the select, ideally
        this.game = new Game(this.playerTotal); // set the game array to a blank game
    }

    addToMission(player: Player) {
        const index = this.game.players.indexOf(player); // we're gonna make sure to update bothe the selected player object and the array
        // since mission execution uses the array
        this.game.players[index].onMission = true;
        player.onMission = true;
    }

    removeFromMission(player: Player) {
        const index = this.game.players.indexOf(player); // same as previous function, but set stuff false
        this.game.players[index].onMission = false;
        player.onMission = false;
    }

    dispatchMission() {
        this.game.executeMission(this.failureVotes);
    }
}
