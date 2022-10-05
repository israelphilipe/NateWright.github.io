import { SwissMatchup } from "./swiss-matchup.model";

export class SwissTeam {
    teamIndex: number;
    swissMatchup: SwissMatchup[] = [];
    gameDiff: number = 0;
    teamBlacklist: number[] = []

    constructor(index: number, swissMatchups: SwissMatchup[]) {
        this.teamIndex = index;
        this.swissMatchup = swissMatchups;
    }

    update() {
        if (this.swissMatchup.length <= 0) return;
        const matchup = this.swissMatchup[this.swissMatchup.length - 1]
        this.gameDiff += SwissMatchup.checkWinDiff(this.teamIndex, matchup);
        const [a, b] = SwissMatchup.teamWon(matchup)
        if (this.teamIndex == a) {
            this.teamBlacklist.push(b)
        } else {
            this.teamBlacklist.push(a)
        }
    }

    static sortFunctionAllMatches(a: SwissTeam, b: SwissTeam): number {
        let team1Wins = 0;
        let team2Wins = 0;
        for (let swissMatchup of a.swissMatchup) {
            if (SwissMatchup.checkWin(a.teamIndex, swissMatchup)) {
                team1Wins++;
            }
        }
        for (let swissMatchup of b.swissMatchup) {
            if (SwissMatchup.checkWin(b.teamIndex, swissMatchup)) {
                team2Wins++;
            }
        }
        if (team1Wins > team2Wins) {
            return -1;
        }
        if (team2Wins > team1Wins) {
            return 1;
        }
        // const team1Dif = SwissMatchup.checkWinDiff(a.teamIndex, a.swissMatchup[a.swissMatchup.length - 1])
        // const team2Dif = SwissMatchup.checkWinDiff(b.teamIndex, b.swissMatchup[b.swissMatchup.length - 1])
        // if (team1Dif > team2Dif) {
        //   return -1;
        // }
        // if (team2Dif > team1Dif) {
        //   return 1;
        // }

        // return a.teamIndex - b.teamIndex;
        return a.teamIndex - b.teamIndex;
    }

    static sortFunctionSwissRound(a: SwissTeam, b: SwissTeam): number {
        const team1Win = SwissMatchup.checkWin(a.teamIndex, a.swissMatchup[a.swissMatchup.length - 1])
        const team2Win = SwissMatchup.checkWin(b.teamIndex, b.swissMatchup[b.swissMatchup.length - 1])
        if (!team1Win && team2Win) {
            return -1;
        }
        if (!team2Win && team1Win) {
            return 1;
        }
        // const team1Dif = SwissMatchup.checkWinDiff(a.teamIndex, a.swissMatchup[a.swissMatchup.length - 1]);
        // const team2Dif = SwissMatchup.checkWinDiff(b.teamIndex, b.swissMatchup[b.swissMatchup.length - 1]);
        const team1Dif = a.gameDiff
        const team2Dif = b.gameDiff

        if (team1Dif > team2Dif) {
            return -1;
        }
        if (team2Dif > team1Dif) {
            return 1;
        }

        return a.teamIndex - b.teamIndex;
    }
}