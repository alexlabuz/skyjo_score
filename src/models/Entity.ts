export class Game {
    public users: User[];
    public round: number = 0;
    public endRound: User | null = null;
    public gameStart: boolean = false;

    constructor(){
        this.users = [new User(), new User()];
    }

    public fromJson(json: string){
        const data = Object.assign(new Game(), JSON.parse(json)) as Game;
        this.users = [];

        data.users.forEach((u) => {
            const user = new User();
            user.name = u.name;
            user.pointCurrentRound = u.pointCurrentRound;

            u.points.forEach(p => {
                const point = new Point(p.round, p.point, p.multiplicator);
                user.points.push(point);
            });

            this.users.push(user);
        });

        this.round = data.round;
        this.endRound = data.endRound;
        this.gameStart = data.gameStart;
    }

    public validRound(){
        this.users.forEach((u) => {
            let multiplicator = 1;

            if(u === this.endRound){
                const lowerPoint = this.users.map((u) => u.pointCurrentRound).sort((a, b) => a! - b!)[0];

                if(u.pointCurrentRound !== lowerPoint){
                    multiplicator = 2;
                }
            }

            const point = new Point(this.round, u.pointCurrentRound ?? 0, multiplicator)
            u.points.push(point);
        });

        this.users.forEach((u) => {
            u.pointCurrentRound = null;
        });

        this.endRound = null;

        this.round++;
    }
}

export class User {
    public name: string;
    public pointCurrentRound: number | null = null;
    public points: Point[];

    constructor() {
        this.name = "";
        this.points = [];
    }

    public getSumPoint(): number{
        let sum = 0;
        this.points.forEach(p => {
            sum += p.getPointWithMultiplicator();
        });

        return sum;
    }

    public hasLost(): boolean{
        return this.getSumPoint() >= 100;
    }
}

export class Point{
    public round: number;
    public point: number;
    public multiplicator: number;

    constructor(round: number, point: number, multiplicator: number = 1){
        this.round = round;
        this.point = point;
        this.multiplicator = multiplicator;
    }

    public getPointWithMultiplicator(){
        return this.point * this.multiplicator;
    }
}