import Image from "./image";
import Scene from "./scene";
import Ray from "./ray";
import Vector from "./vector";
import Sphere from "./objects/sphere";

export default class RenderEngine {
	private Frame: Frame;
	private Image: Image | undefined;
	private Resolution: number;

	constructor(Frame: Frame, Resolution: number) {
		this.Frame = Frame;
		this.Resolution = Resolution;
	}

	public render(scene: Scene): void {
		const frameWidth = math.floor(this.Frame.AbsoluteSize.X * this.Resolution);
		const frameHeight = math.floor(this.Frame.AbsoluteSize.Y * this.Resolution);

		const aspectRatio = frameWidth / frameHeight;

		const x0 = -1.0;
		const x1 = 1.0;
		const xstep = (x1 - x0) / (frameWidth - 1);

		const y0 = -1.0 / aspectRatio;
		const y1 = 1.0 / aspectRatio;
		const ystep = (y1 - y0) / (frameHeight - 1);

		const camera = scene.Camera;

		if (this.Image) {
			for (let j = 0; j < frameHeight; j++) {
				const y = y0 + j * ystep;
				for (let i = 0; i < frameWidth; i++) {
					const x = x0 + i * xstep;
					const ray = new Ray(camera, new Vector(x, y, 0).sub(camera));
					const color = this.rayTrace(ray, scene);
					this.Image.setPixel(i, j, color);
				}
			}
			this.Image.draw();
		} else {
			const pixels = new Image(this.Frame);
			for (let j = 0; j < frameHeight; j++) {
				const y = y0 + j * ystep;
				for (let i = 0; i < frameWidth; i++) {
					const x = x0 + i * xstep;
					const ray = new Ray(camera, new Vector(x, y, 0).sub(camera));
					const color = this.rayTrace(ray, scene);
					pixels.setPixel(i, j, color);
				}
			}

			pixels.draw();
			this.Image = pixels;
		}
	}

	private rayTrace(ray: Ray, scene: Scene): Color3 {
		let color = new Color3(0, 0, 0);
		const [distHit, objHit] = this.findNearest(ray, scene);
		if (objHit === undefined || distHit === undefined) {
			return color;
		}
		const hitPos = ray.Origin.add(ray.Direction.mul(distHit));
		const hitNormal = objHit.normal(hitPos);
		color = this.colorAt(objHit, hitPos, hitNormal, scene);
		return color;
	}

	private findNearest(ray: Ray, scene: Scene): [number | undefined, Sphere | undefined] {
		let distMin = math.huge;
		let objHit: Sphere | undefined = undefined;
		for (const obj of scene.Objects) {
			const dist = obj.intersects(ray);
			if (dist !== undefined && dist < distMin) {
				distMin = dist;
				objHit = obj;
			}
		}
		return [distMin === math.huge ? undefined : distMin, objHit];
	}

	private colorAt(objHit: Sphere, hitPos: Vector, normal: Vector, scene: Scene): Color3 {
		const material = objHit.getMaterial();
		const objColor = material.Color;
		const toCam = scene.Camera.sub(hitPos);
		const specularK = 50;

		let color = new Color3(0 * material.Ambient, 0 * material.Ambient, 0 * material.Ambient);

		scene.Lights.forEach((light) => {
			const toLight = new Ray(hitPos, light.Position.sub(hitPos));

			const diffuseComponent = this.multiplyColors(
				objColor,
				this.multiplyColor(objColor, material.Diffuse * math.max(normal.dotProduct(toLight.Direction), 0)),
			);

			color = this.addColors(color, diffuseComponent);

			const halfVector = toLight.Direction.add(toCam).normalize();

			const specularComponent = this.multiplyColors(
				objColor,
				this.multiplyColor(
					light.Color,
					material.Specular * math.max(normal.dotProduct(halfVector), 0) ** specularK,
				),
			);

			color = this.addColors(color, specularComponent);
		});

		return color;
	}

	private addColors(color1: Color3, color2: Color3): Color3 {
		return new Color3(
			math.min(color1.R + color2.R, 1),
			math.min(color1.G + color2.G, 1),
			math.min(color1.B + color2.B, 1),
		);
	}

	private multiplyColor(color: Color3, scalar: number): Color3 {
		return new Color3(math.min(color.R * scalar, 1), math.min(color.G * scalar, 1), math.min(color.B * scalar, 1));
	}

	private multiplyColors(color1: Color3, color2: Color3): Color3 {
		return new Color3(
			math.min(color1.R * color2.R, 1),
			math.min(color1.G * color2.G, 1),
			math.min(color1.B * color2.B, 1),
		);
	}
}
