export default class Material {
	public Color: Color3;
	public Ambient: number;
	public Diffuse: number;
	public Specular: number;

	constructor(Color: Color3, Ambient: number, Diffuse: number, Specular: number) {
		this.Color = Color;
		this.Ambient = Ambient;
		this.Diffuse = Diffuse;
		this.Specular = Specular;
	}
}
