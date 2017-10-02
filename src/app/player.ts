export class Player {
    id: number; // the player's id, unique key for each player
    name: string; // the name of the player, for UI purposes
    spyChance: number; // probability that this player is a spy, 0 to 1
    onMission: boolean;

    constructor(newID: number, newSpyChance: number) { // when creating new players, we will have an ID, as well as a starting spy chance
        this.id = newID;
        this.name = 'New player' + newID;
        this.spyChance = newSpyChance;
        this.onMission = false; // always start not on the mission team
    }
}
