const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
    constructor(field = [[]]) {
        this.field = field;
        this.locationX = Math.floor(Math.random() * 10);
        this.locationY = Math.floor(Math.random() * 10);
        this.endX = 0;
        this.endY = 0;
    }
    runGame() {
        let playing = true;
        while (playing) {
            this.field[this.locationY][this.locationX] = pathCharacter;
            this.print();
            this.askQuestion();
            if (!this.isInside()) {
                console.log("Out of bounds!");
                playing = false;
            } else if (this.isHole()) {
                console.log("You fell in a hole!");
                playing = false;
            } else if (this.isHat()) {
                console.log("You win!");
                playing = false;
            }
        }
    }
    isInside() {
        if (
            this.locationY >= 0 &&
            this.locationX >= 0 &&
            this.locationY < this.field.length &&
            this.locationX < this.field[0].length
        )
            return true;
    }
    isHat() {
        if (this.field[this.locationY][this.locationX] === hat) return true;
    }
    isHole() {
        if (this.field[this.locationY][this.locationX] === hole) return true;
    }
    print() {
        const displayString = this.field.map((row) => row.join("")).join("\n");
        console.log(displayString);
    }
    askQuestion() {
        const answer = prompt("Which way? ").toUpperCase();
        switch (answer) {
            case "U":
                this.locationY -= 1;
                break;
            case "D":
                this.locationY += 1;
                break;
            case "L":
                this.locationX -= 1;
                break;
            case "R":
                this.locationX += 1;
                break;
            default:
                console.log("Enter U, D, L or R.");
                this.askQuestion();
                break;
        }
    }
    static generateField() {
        const height = 10;
        const width = 10;
        const percentage = 0.2;
        const field = new Array(height).fill(0).map((_) => new Array(width));
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const rand = Math.random();
                field[y][x] = rand > percentage ? fieldCharacter : hole;
            }
        }
        const hatLoc = {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height),
        };
        while (hatLoc.x === this.locationX && hatLoc.y === this.locationY) {
            hatLoc.x = Math.floor(Math.random() * width);
            hatLoc.y = Math.floor(Math.random() * height);
        }
        field[hatLoc.x][hatLoc.y] = hat;
        return field;
    }
}

const theField = new Field(Field.generateField());
theField.runGame();
