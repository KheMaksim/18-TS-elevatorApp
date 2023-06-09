import * as readlineSync from "readline-sync";
class Elevator {
	private _currentFloor: number;
	private _capacity: number = 200;
	private _maxFloor: number = 18;
	constructor(current: number) {
		this._currentFloor = current;
	};
	public move(toFloor: number, weight: number) {
		if (this.isAllowableWeight(weight) === false || this.isAllowableFloor(toFloor) === false) console.log(`You entered a wrong floor or invalid weight!`);
		else if (this._currentFloor <= toFloor) {
			for (let i = this._currentFloor; i < toFloor + 1; i++) {
				this.random();
				if (this.random() === 1) {
					this._currentFloor = i;
					console.log(`Elevator stucked on ${i} floor`);
					break;
				}
				else {
					this._currentFloor = i;
					console.log(`${i} floor.`);
				}
			}
		}
		else if (this._currentFloor >= toFloor) {
			for (let i = this._currentFloor; i > toFloor - 1; i--) {
				this.random();
				if (this.random() === 1) {
					this._currentFloor = i;
					console.log(`Elevator stucked on ${i} floor`);
					break;
				}
				else {
					this._currentFloor = i;
					console.log(`${i} floor.`);
				}
			}
		}
	};
	public random(): number {
		return Math.floor(Math.random() * 3) + 1;
	};
	public isAllowableWeight(weight: number): boolean {
		if (this._capacity >= weight && weight > 0) return true;
		else return false
	};
	public isAllowableFloor(floor: number): boolean {
		if (this._maxFloor >= floor && floor > 0) return true;
		else return false
	};
	public get currentFloor(): number {
		return this._currentFloor;
	};
	public set currentFloor(value: number) {
		this._currentFloor = value;
	};
	public get maxFloor(): number {
		return this._maxFloor;
	};
	public set maxFloor(value: number) {
		this._maxFloor = value;
	};
	public get capacity(): number {
		return this._capacity;
	};
	public set capacity(value: number) {
		this._capacity = value;
	};
}

let currentFloor: number = 1;
const newElevator: Elevator = new Elevator(currentFloor);
while (true) {
	currentFloor = newElevator.currentFloor
	const requiredFloor: number = parseInt(readlineSync.question(`\nWhich floor do you need?(now ${newElevator.currentFloor} floor)\nAnswer: `));
	const requiredWeight: number = parseInt(readlineSync.question(`\nHow much kg do you need to lift? (max ${newElevator.capacity}kg)\nAnswer: `));
	newElevator.move(requiredFloor, requiredWeight);
	let nextQuestion: string;
	while (true) {
		nextQuestion = readlineSync.question(`\nDo you want to continue?\n1. Yes\n2. No\nAnswer: `);
		if (nextQuestion === '2' || nextQuestion.toLowerCase() === 'no') {
			nextQuestion = '2';
			console.log(`\nOperation canceled.`);
			break;
		}
		else if (nextQuestion === '1' || nextQuestion.toLowerCase() === 'yes') break;
		else console.log(`\nIncorrect answer try again`);
	}
	if (nextQuestion === '2') break;
}