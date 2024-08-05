
# Simple Roblox-TS Raycaster

A simple sphere raycaster made with Roblox-TS

---
> [!WARNING]
> This has very limited functionality. It does not support parralel processing and is not suitible for production.
---

## How to use
Creating a simple scene:

```typescript
const camera = new Vector(0, 0, -1);
const firstObject = new Sphere(new Vector(-0.3, 0, 0), 0.3, new Material(new Color3(1, 0, 0), 0.1, 1, 3));
const secondObject = new Sphere(new Vector(0.3, 0, 0), 0.3, new Material(new Color3(0, 0, 1), 0.1, 0.7, 3));

const light = new LightSource(new Vector(0, 0, -1), new Color3(1, 1, 1));

const objects: Sphere[] = [firstObject, secondObject];
const lights: LightSource[] = [light];

const scene = new Scene(camera, objects, lights);
```

Rendering a scene:

```typescript
const engine = new RenderEngine(frame, 0.1);

engine.render(scene);
```

## Demo

[![DEMO]([https://img.shields.io/badge/License-MIT-green.svg](https://cdn.discordapp.com/attachments/1269034459794247710/1269034461199073391/2024-08-02_21-47-10.mp4?ex=66b1e3b1&is=66b09231&hm=45599e50b85fc88cb74b6cd2c86afe96530ec54c7194f4c503f7f019a681229a&))]


[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

