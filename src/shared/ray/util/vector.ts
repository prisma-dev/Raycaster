export default class Vector {
	public readonly X: number;
	public readonly Y: number;
	public readonly Z: number;

	constructor(X: number = 0, Y: number = 0, Z: number = 0) {
		this.X = X;
		this.Y = Y;
		this.Z = Z;
	}

	public add(vector: Vector): Vector {
		return new Vector(this.X + vector.X, this.Y + vector.Y, this.Z + vector.Z);
	}

	public sub(vector: Vector): Vector {
		return new Vector(this.X - vector.X, this.Y - vector.Y, this.Z - vector.Z);
	}

	public mul(scalar: number): Vector {
		return new Vector(this.X * scalar, this.Y * scalar, this.Z * scalar);
	}

	public div(scalar: number): Vector {
		return new Vector(this.X / scalar, this.Y / scalar, this.Z / scalar);
	}

	public dotProduct(vector: Vector): number {
		return this.X * vector.X + this.Y * vector.Y + this.Z * vector.Z;
	}

	public crossProduct(vector: Vector): Vector {
		return new Vector(
			this.Y * vector.Z - this.Z * vector.Y,
			this.Z * vector.X - this.X * vector.Z,
			this.X * vector.Y - this.Y * vector.X,
		);
	}

	public magnitude(): number {
		return math.sqrt(this.dotProduct(this));
	}

	public normalize(): Vector {
		const mag = this.magnitude();
		if (mag === 0) return new Vector(0, 0, 0);
		return this.div(mag);
	}

	public rotateX(angle: number): Vector {
		const cos = math.cos(angle);
		const sin = math.sin(angle);
		return new Vector(this.X, this.Y * cos - this.Z * sin, this.Y * sin + this.Z * cos);
	}

	public rotateY(angle: number): Vector {
		const cos = math.cos(angle);
		const sin = math.sin(angle);
		return new Vector(this.X * cos + this.Z * sin, this.Y, -this.X * sin + this.Z * cos);
	}

	public rotateZ(angle: number): Vector {
		const cos = math.cos(angle);
		const sin = math.sin(angle);
		return new Vector(this.X * cos - this.Y * sin, this.X * sin + this.Y * cos, this.Z);
	}
}
