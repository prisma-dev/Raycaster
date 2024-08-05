import Material from "../material";
import Ray from "../ray";
import Vector from "../vector";

export default class Sphere {
	private Position: Vector;
	private Radius: number;
	public Material: Material;

	constructor(position: Vector, radius: number, material: Material) {
		this.Position = position;
		this.Radius = radius;
		this.Material = material;
	}

	public intersects(ray: Ray): number | undefined {
		const sphereToRay = ray.Origin.sub(this.Position);
		const b = 2 * ray.Direction.dotProduct(sphereToRay);
		const c = sphereToRay.dotProduct(sphereToRay) - this.Radius * this.Radius;
		const discriminant = b * b - 4 * c;
		if (discriminant >= 0) {
			const dist = (-b - math.sqrt(discriminant)) / 2;
			if (dist > 0) {
				return dist;
			}
		}
		return undefined;
	}

	public getPosition(): Vector {
		return this.Position;
	}

	public setPosition(position: Vector): void {
		this.Position = position;
	}

	public getRadius(): number {
		return this.Radius;
	}

	public addRadius(amount: number): void {
		this.Radius += amount;
	}

	public rotateX(angle: number): void {
		this.Position = this.Position.rotateX(angle);
	}

	public rotateY(angle: number): void {
		this.Position = this.Position.rotateY(angle);
	}

	public rotateZ(angle: number): void {
		this.Position = this.Position.rotateZ(angle);
	}

	public getMaterial(): Material {
		return this.Material;
	}

	public setMaterial(material: Material): void {
		this.Material = material;
	}

	public normal(surfacePoint: Vector): Vector {
		return surfacePoint.sub(this.Position).normalize();
	}
}
