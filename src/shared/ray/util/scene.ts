import Sphere from "./objects/sphere";
import LightSource from "./objects/light";
import Vector from "./vector";

export default class Scene {
	public Camera: Vector;
	public Objects: Sphere[];
	public Lights: LightSource[];

	constructor(camera: Vector, objects: Sphere[], lights: LightSource[]) {
		this.Camera = camera;
		this.Objects = objects;
		this.Lights = lights;
	}

	public rotateCameraX(angle: number): void {
		this.Camera = this.Camera.rotateX(angle);
	}

	public rotateCameraY(angle: number): void {
		this.Camera = this.Camera.rotateY(angle);
	}

	public rotateCameraZ(angle: number): void {
		this.Camera = this.Camera.rotateZ(angle);
	}
}
