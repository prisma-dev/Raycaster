import RenderEngine from "shared/ray/util/engine";
import Material from "shared/ray/util/material";
import LightSource from "shared/ray/util/objects/light";
import Sphere from "shared/ray/util/objects/sphere";
import Scene from "shared/ray/util/scene";
import Vector from "shared/ray/util/vector";

const Players = game.GetService("Players");
const StarterUI = Players.LocalPlayer.WaitForChild("PlayerGui") as PlayerGui;

const gui = new Instance("ScreenGui");
gui.Parent = StarterUI;

const frame = new Instance("Frame");
frame.Position = UDim2.fromScale(0, 0);
frame.Size = UDim2.fromScale(1, 1);
frame.BackgroundTransparency = 1;
frame.Parent = gui;

const camera = new Vector(0, 0, -1);
const firstObject = new Sphere(new Vector(-0.3, 0, 0), 0.3, new Material(new Color3(1, 0, 0), 0.1, 1, 3));
const secondObject = new Sphere(new Vector(0.3, 0, 0), 0.3, new Material(new Color3(0, 0, 1), 0.1, 0.7, 3));

const light = new LightSource(new Vector(0, 0, -1), new Color3(1, 1, 1));

const objects: Sphere[] = [firstObject, secondObject];
const lights: LightSource[] = [light];

const scene = new Scene(camera, objects, lights);

const engine = new RenderEngine(frame, 0.1);

task.wait(1);

engine.render(scene);
