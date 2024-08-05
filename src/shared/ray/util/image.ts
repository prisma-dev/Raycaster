export default class Image {
	protected Width: number;
	protected Height: number;

	private Pixels: Color3[][];
	private Frame: Frame;
	private PixelFrames: Frame[][];

	constructor(Frame: Frame) {
		this.Frame = Frame;
		this.Width = 0;
		this.Height = 0;
		this.Pixels = [];
		this.PixelFrames = [];
	}

	public setPixel(x: number, y: number, col: Color3): void {
		if (x < 0 || y < 0) return;

		while (y >= this.Pixels.size()) {
			this.Pixels.push([]);
			this.PixelFrames.push([]);
		}

		const row = this.Pixels[y];
		const frameRow = this.PixelFrames[y];
		while (x >= row.size()) {
			row.push(new Color3(0, 0, 0));
			const pixelFrame = new Instance("Frame");
			pixelFrame.BorderSizePixel = 0;
			pixelFrame.Parent = this.Frame;
			frameRow.push(pixelFrame);
		}

		this.Width = math.max(this.Width, x + 1);
		this.Height = math.max(this.Height, y + 1);

		this.Pixels[y][x] = col;
	}

	public draw(): void {
		const frameWidth = this.Frame.AbsoluteSize.X;
		const frameHeight = this.Frame.AbsoluteSize.Y;

		const pixelWidth = math.floor(frameWidth / this.Width);
		const pixelHeight = math.floor(frameHeight / this.Height);
		const pixelSize = math.min(pixelWidth, pixelHeight);

		const offsetX = math.floor((frameWidth - pixelSize * this.Width) / 2);
		const offsetY = math.floor((frameHeight - pixelSize * this.Height) / 2);

		for (let y = 0; y < this.Height; y++) {
			const row = this.Pixels[y];
			const frameRow = this.PixelFrames[y];
			for (let x = 0; x < this.Width; x++) {
				const color = row[x];
				const pixelFrame = frameRow[x];
				pixelFrame.Size = new UDim2(0, pixelSize, 0, pixelSize);
				pixelFrame.Position = new UDim2(0, offsetX + x * pixelSize, 0, offsetY + y * pixelSize);
				pixelFrame.BackgroundColor3 = color;
			}
		}
	}

	public update(): void {
		for (let y = 0; y < this.Height; y++) {
			const row = this.Pixels[y];
			const frameRow = this.PixelFrames[y];
			for (let x = 0; x < this.Width; x++) {
				const color = row[x];
				const pixelFrame = frameRow[x];
				pixelFrame.BackgroundColor3 = color;
			}
		}
	}

	public clear(): void {
		for (let y = 0; y < this.PixelFrames.size(); y++) {
			for (let x = 0; x < this.PixelFrames[y].size(); x++) {
				this.PixelFrames[y][x].Destroy();
			}
		}
		this.Pixels = [];
		this.PixelFrames = [];
		this.Width = 0;
		this.Height = 0;
	}
}
