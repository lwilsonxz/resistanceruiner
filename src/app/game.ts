import { Player } from './player';

export class Game {
    playerCount: number; // number of players in the game
    // resistance supports 5-10 players
    // the player count will also determine the spy count
    spyCount: number; // total spies in game, determined by players
    players: Player[]; // the array of all players in the game


    // TODO: adjustSpyChance, function that takes in a mission team array
    // and a vote array, and then adjusts the spy chance of EVERY PLAYER based on bayesian analysis
    constructor(count: number) {
        this.playerCount = count; // construct using the player count!
        // for some reason, our switch isn't working
        // I believe it has to do with how the numbers are retrieved from the select
        // something is impercise and the number isn't exactly equal to what it should be
        // even though it appears to be
        // I believe it's some numeric impercision brought on by getting the number from the select
        // stopgap solution to continue development
        if (count < 7) {
            this.spyCount = 2;
        } else if (count < 10) {
            this.spyCount = 3;
        } else {
            this.spyCount = 4;
        }
        // initialize array of players, each named "New player", with incrementing IDs, and correctly calculated spy chances
        // that is, spyCount over playerCount
        this.players = new Array();
        for (let i = 0; i < count; ++i) { // loop and add players to the player array
            this.players.push(new Player(i, this.spyCount / count)); // players have incrementing IDs and the same starting chance of spying
        }
    }

    addToMission(newPlayer: Player) {
        // we simply find the player in the array and set the onMission flag to true
        const index = this.players.indexOf(newPlayer); // find the position of the player to be added
        this.players[index].onMission = true; // put that player on a mission
    }

    executeMission(totalFailures: number) {
        // the true powerhouse of the program
        // execute mission does the bayesian analysis on the array of players
        // based on the number of votes to SABATOGE the mission
        // passed in as a number

        // in writing this function, we're going to take a relatively inefficient, high-level approach
        // we may try to clean it up to be more space or time efficient later

        // first thing's first: generate our set of mission players
        // implicitly, we have a set of votes: the vote total is the number of mission players
        // and votes for failure is passed as a parameter
        const missionPlayers = new Array<number>(); // should be okay to be a constant
        // we will also want the set of players not on the mission
        const offMissionPlayers = new Array<number>();
        for (let i = 0; i < this.players.length; ++i) { // loop through players and add any on the mission to the set
            if (this.players[i].onMission) {
                missionPlayers.push(this.players[i].spyChance); // we may elimiate this step and do this in place, once the concept is down
            } else {
                offMissionPlayers.push(this.players[i].spyChance); // if they aren't on the mission, add them to that list
            }
        }
        const successVotes = missionPlayers.length - totalFailures; // might as well record this in a variable to be explicit
        // now we have the set of players on the mission, the set of players not on the mission, and the set of votes
        // players already know their current probability of being a spy
        // now, we apply the bayes theorem
        this.players.forEach(element => {
            // anaylze takes in a player, a set of votes, and lists of PROBABILITIES for each play
            if (element.onMission) {
                this.analyze(element, totalFailures, missionPlayers);
            } else {
                this.analyze(element, totalFailures, offMissionPlayers);
            }
        });
        // after bayes is applied, array is updated...
        // don't forget to set everyone's mission flag back to false!
        this.players.forEach(element => {
            element.onMission = false;
        });
    }

    analyze(player: Player, fails: number, team: number[]) {
        // now we will perform bayesian analysis and update the original player array to reflect what we learned
        // first of all, we need to find the number of combinations of spies possible based on the votes
        // that is, how many combinations of fails are there in missionTeam?

        // to find all combinations, we will keep a list of combinations
        // that is, a list of arrays of numbers
        // two lists of possible combinations of spies
        let  teamCombinations;
        if (player.onMission) {
            teamCombinations = this.getCombinations(team.length, fails);
        } else {
           teamCombinations = this.getCombinations(team.length, this.spyCount - fails);
        }

        // get the probability for the player's that we would have this many fails
        const probabilityOfFails = this.getResultProbabilty(team, teamCombinations, player.onMission);
        // alert('variable: ' + probabilityOfFails);
        // alert('value: ' + this.getResultProbabilty(team, teamCombinations, player.onMission));

        // now we need one more variable
        const temp = new Array<number>();
        team.forEach(element => {
            temp.push(element);
        });
        temp.splice(temp.indexOf(player.spyChance), 1);

        // redo that whole rigamarole but assuming player is spy, and remove him or her from list
        let teamCombinationsIfSpy;
        if (player.onMission) {
            teamCombinationsIfSpy = this.getCombinations(temp.length, fails - 1);
        } else {
            teamCombinationsIfSpy = this.getCombinations(temp.length, this.spyCount - fails - 1);
        }

        let probabilityOfFailsIfSpy;
        if (player.onMission && fails - 1 < 0) {
            probabilityOfFailsIfSpy = 0; // if there are no spies, then we cant remove a spy, and this is just 0
        } else if (!player.onMission && this.spyCount - fails - 1 < 0) {
            probabilityOfFailsIfSpy = 0; // same, but we need to check the other number to see if there are no spies
        } else {
            probabilityOfFailsIfSpy = this.getResultProbabilty(temp, teamCombinationsIfSpy, player.onMission);
        }
        // alert('variable: ' + probabilityOfFailsIfSpy);
        // alert('value: ' + this.getResultProbabilty(temp, teamCombinationsIfSpy, player.onMission));
        // okay, now we have all our variables
        // alert(probabilityOfFailsIfSpy + ', ' + probabilityOfFails);
        player.spyChance *= probabilityOfFailsIfSpy;
        player.spyChance /= probabilityOfFails;
        // alert(player.name + ': ' + player.spyChance);
    }

    getResultProbabilty(team: Array<number>, combos: Array<Array<number>>, missionFlag: boolean): number {
        let teamTotal = 0;
        if ( combos.length > 0) {
            for (let i = 0; i < combos.length; ++i) {
                let product = 1;
                for (let j = 0; j < team.length; ++j) {
                    if (combos[i].indexOf(j) > -1) {
                        product *= team[j];
                    } else {
                        product *= 1 - team[j];
                    }
                }
                teamTotal += product;
            }
        } else { // in this special case, we need to do inverses for all!
            let product = 1;
            for (let i = 0; i < team.length; ++i) {
                product *= 1 - team[i];
            }
            teamTotal += product; // in this case, the total is just the same of the product
        }
        return teamTotal;
    }

    // listLength: number of elements in the list we are combining
    // comboLength: length of combination
    getCombinations(listLength: number, comboLength: number): number[][] {
        if (comboLength < 1) {
            return new Array<Array<number>>();
        }

        const indexCombinations = new Array<Array<number>>();
        const combination = new Array<number>(comboLength); // current combination list, an array of numbers comboLength long
        for (let i = 0; i < comboLength; ++i) {
            combination[i] = i;
        }
        // make a copy of the combination array and push that copy!
        const temp = new Array<number>();
        combination.forEach(element => {
            temp.push(element);
        });
        indexCombinations.push(temp);
        for ( ; ; ) {
            let i = 0;
            // now we need to adjust i to match the position of the next item that can be incremented
            // condition explained: first clause: stop when i dips below 0
            for (i = comboLength - 1 ; i >= 0 && combination[i] === listLength - comboLength + i; --i) {
            }
            if (i < 0) {
                break;
            }
            ++combination[i]; // so we've now found the rightmost index that could be incremented in the combination
            // so we increment it
            // then generate a new combination
            ++i;
            for ( ; i < comboLength ; ++i) { // so if the index we change was not the last index
                // then we need to refill everything to the right of that index
                combination[i] = combination[i - 1] + 1;
            }
            const temp2 = new Array<number>(); // make a temp array to push combination
            combination.forEach(element => {
                temp2.push(element);
            });
            indexCombinations.push(temp2); // add that combination to the list
        }
        return indexCombinations;
    }
}
