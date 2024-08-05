import Vector from "./vector";

export default class Ray {
	readonly Origin: Vector;
	readonly Direction: Vector;

	constructor(Origin: Vector, Direction: Vector) {
		this.Origin = Origin;
		this.Direction = Direction.normalize();
	}
}
