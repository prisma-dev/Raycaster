import Vector from "../vector";

export default class LightSource {
	public Position: Vector;
	public Color: Color3;

	constructor(Position: Vector, Color: Color3) {
		this.Position = Position;
		this.Color = Color;
	}
}
