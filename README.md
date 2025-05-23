# Project Axis

https://github.com/user-attachments/assets/c2ec2617-47f9-45a8-ae09-986526025bdb

## A Foreword

As I begin building this project &mdash; for the first time pairing it with proper documentation and a blog &mdash; I also begin a new chapter of my journey: opening up to the world and sharing my humble experiences in the realm of computer science and programming. My hope is to grow through this process, and maybe, enjoy your precious company along the way.

Thank you!

## Axis

Have you ever seen those cool animations of spinning 3D objects in the terminal? Well, I certainly have! This project was inspired by the well-known YouTuber *@Joma Tech*, who &mdash; in what I assume was parody comedy &mdash; showcased a spinning 3D donut model rendered right in the terminal. That seemingly little idea got stuck in my mind, and I thought, "Hey, why not build something like this myself?"

So here we are! We are going to build a simple 3D renderer using JavaScript (layered with TypeScript for some added convenience). We'll experiment with different 3D objects and do our best to recreate Joma's fun idea. Let's jump right into this adventure together!

## Genesis

Before we dive into the code, let's start with a few key details to ensure we're on the same page. We'll build a conceptual model to help us make sense of the project, sketch out a roadmap to keep everything aligned, and lay out the project directory structure so you can follow along.

And just between us &mdash; we're about to explore some really cool math concepts in this one! Don't worry if math isn't your thing; I'll walk you through each concept step by step, keeping things approachable and fun.

## The Axis Concept

The idea behind this project is intentionally minimal. We're working with vectors in 3D space, applying some cool math operations like rotation to bring the animation to life, and using projection to present everything on a 2D surface &mdash; in our case, the terminal. To make it feel more realistic, we'll also include surface normalization and light vectors, creating nice shading effects and depth.

After we dive into the fascinating math behind it all, We'll see how each piece transforms into clean, object-oriented code &mdash; where all the components come together to produce the final effect. Ready to step into the world of 3D vector space? Let's go!

## Project Structure

Before we dive into the mathematical concepts, let's take a moment to understand how our project is organized. I've structured the codebase to keep things modular and easy to follow:

```
src/
├── app/
│   ├── main.ts         # The main application entry point
│   └── settings.ts     # Configuration settings
│
├── core/
│   ├── math/           # Math foundations
│   │   ├── projection.ts  # 3D to 2D projection
│   │   ├── rotation.ts    # Rotation mathematics
│   │   └── vector.ts      # Vector2 and Vector3 classes
│   │
│   ├── object3d/       # 3D object handling
│   │   ├── shape.ts       # Object3D class for shapes
│   │   └── transformation.ts  # Rotation and translation
│   │
│   └── renderer/       # Rendering system
│       ├── shading.ts     # Lighting and shading
│       └── terminal.ts    # Terminal display
│
└── utils/              # Utility functions
    ├── logger.ts       # Logging functionality
    └── timer.ts        # Animation timing
```

This modular structure makes it easy to understand the distinct components of our system. For instance, if you're curious about how we implement 3D rotations, you'll find that in `core/math/rotation.ts`. Or if you want to see how shapes are defined, look at `core/object3d/shape.ts`.

Now, let's jump into the mathematical foundations that make all of this possible!

### The 3D and 2D Vector Space

Let's start by thinking about a cube. Imagine you're holding one in your hand. In mathematics, this 3D object (and any 3D object, really) is represented by a set of points called vertices. When these points are connected, they form vectors, or edges, which define the shape. So when we talk about 3D space, each vertex has three coordinates: $(x,y,z)$.

What do these coordinates mean? Well:

- $x$ tells us how far left or right the point is
- $y$ tells us how far up or down it is
- $z$ represents depth — how far in or out of the screen (Good thing our screens can't really let things pop out, can they?)

<p align="center">
  <img src="./assets/ax-0001.png" alt="A representation of a three-dimensional Cartesian coordinate system" height="275">
</p>
<p align="center"><i>A representation of a three-dimensional Cartesian coordinate system</i></p>

Now, when it comes to 2D space, things get a bit simpler — and that's what we'll need for our terminal-based project. Here, we only work with $(x,y)$ coordinates. We lose the depth component, which might seem limiting, but don't worry! That's where projection comes in... but let's not get ahead of ourselves. We'll get to that part soon.

<p align="center">
  <img src="./assets/ax-0002.png" alt="Illustration of a two-dimensional Cartesian coordinate system" height="275">
</p>
<p align="center"><i>Illustration of a two-dimensional Cartesian coordinate system. Four points are marked and labeled with their coordinates: (2, 3) in green, (−3, 1) in red, (−1.5, −2.5) in blue, and the origin (0, 0) in purple.</i></p>

In our project, I've implemented these coordinate systems in the `Vector3` and `Vector2` classes (you can find them in `src/core/math/vector.ts`). These classes form the foundation of all our spatial operations. Think of them as the building blocks that will help us create and manipulate our 3D objects before we render them in the terminal.

### Rotation in 3D Space

Now comes the fun part — bringing our 3D cube to life! Rotation is the key mathematical concept that will animate our objects frame by frame. It's what allows us to turn or spin objects along any axis, making them feel dynamic and alive.

So how do we rotate points in 3D space? We'll use some trigonometric functions like $sine()$ and $cosine()$ to transform coordinates. Don't worry if that sounds complex — We'll break it down.

When we rotate an object, we need to specify an axis to rotate around — X, Y, or Z. For each axis, we have a specific formula that transforms the point's position:

- When we rotate around the X-axis, we're affecting the Y and Z coordinates:

$$
\begin{bmatrix} x' \\
y' \\
z' \end{bmatrix} = \begin{bmatrix} x \\
y.\cos(\theta) - z.\sin(\theta) \\
y.\sin(\theta) + z.\cos(\theta) \end{bmatrix}
$$

- When we rotate around the Y-axis, we're affecting the X and Z coordinates:

$$
\begin{bmatrix} x' \\
y' \\
z' \end{bmatrix} = \begin{bmatrix} x.\cos(\theta) - z.\sin(\theta) \\
y \\
-x.\sin(\theta) + z.\cos(\theta) \end{bmatrix}
$$

- And when we rotate around the Z-axis, we're affecting the X and Y coordinates:

$$
\begin{bmatrix} x' \\
y' \\
z' \end{bmatrix} = \begin{bmatrix} x.\cos(\theta) - y.\sin(\theta) \\
x.\sin(\theta) + y.\cos(\theta) \\
z \end{bmatrix}
$$

Don't let these formulas intimidate you! The beautiful thing is that we can apply these rotations individually or combine them by applying them one after another. That's how we'll create smooth spinning animations — we'll just keep rotating slightly over time!

In the code, I've implemented these rotation formulas in `src/core/math/rotation.ts`. I've created functions called `rotateX()`, `rotateY()`, and `rotateZ()` that handle these calculations, plus an `Angle` class to convert between degrees and radians. These will be the workhorses that keep our objects spinning smoothly as we watch them in the terminal.

Ready to see how we'll project these 3D objects onto our 2D screen? Let's continue our journey!

## Projection

So we've got our 3D objects and we know how to rotate them — awesome! But there's a small problem: our terminal is flat (2D), and our objects are three-dimensional. How do we bridge that gap? That's where projection comes in.

Projection is like taking a 3D object and casting its shadow onto a flat surface. It's the process of translating 3D points onto a 2D plane. While our cube happily spins in its 3D world, when it's time to show it in the terminal, we need mathematics to flatten those coordinates into something we can draw.

This projection process is what lets us simulate depth and movement on a flat screen. It's pretty magical when you think about it!

There are two main types of projection we could use:

- **Perspective projection**: This one works like our eyes do — objects farther away appear smaller. It creates that realistic depth by scaling based on how far away things are (the z coordinate). It looks great, but it's not always practical in a terminal where we're limited by character size and grid spacing.

<p align="center">
  <img src="./assets/ax-0003.jpg" alt="Three-point perspective projection" height="275">
</p>
<p align="center"><i>Illustration of a three-point perspective projection.</i></p>

- **Orthographic projection**: With this approach, objects maintain their size regardless of depth. It ignores the z-axis for scaling, keeping things simple and accurate. Though it's less "realistic" than perspective, it's perfect for clean, readable representations, especially in text-based environments like our terminal.

<p align="center">
  <img src="./assets/ax-0004.png" alt="Axonometric projection." height="275">
</p>
<p align="center"><i>Illustration of a three-point orthographic projection.</i></p>

For our project, I've chosen to use orthographic projection because it provides a stable and clear representation of our 3D objects that works well in the terminal environment.

### The Math Behind Orthographic Projection

Let me explain how orthographic projection works in simple terms. Imagine you're standing infinitely far away from the cube, looking at it with a super-powerful telescope. At this distance, all your sight lines become perfectly parallel, and the size of the cube doesn't change with depth.

Because of this, orthographic projection gives us a stable view where parallel lines stay parallel (they never converge), and there's no distortion from perspective. It's perfect for our terminal where each character is the same size!

Mathematically, it's quite simple. Given a 3D point $(x,y,z)$, its 2D screen projection becomes:

$x' = x \cdot scale$ and $y' = y \cdot scale$

Or put more simply: $P' = (x \cdot scale, y \cdot scale)$

We apply some scaling to $x$ and $y$ to adjust the size, but we completely ignore $z$ in the projection formula. (Don't worry though, we'll still use $z$ for other things like determining which parts of the object are in front of others.)

I've implemented this projection in `src/core/math/projection.ts` with the `Projection` class. It takes care of converting our 3D coordinates to 2D screen positions, considering the terminal's dimensions and applying the right scaling to center everything nicely on screen.

## Lighting

Have you ever noticed how in the real world, we see objects because light bounces off them into our eyes? Well, in our 3D terminal world, we need to simulate that same effect to make our shapes look solid and three-dimensional. Let's talk about how we'll bring that extra dimension to our flat terminal screen using lighting!

We'll simulate lighting by making surfaces appear:

- **Bright** when they're facing toward our light source
- **Dim** when they're turned away
- **Dark** when they're in shadow (though we won't be simulating complex shadows in this project)

We'll be modeling this using vectors and dot products — but don't worry if that sounds intimidating. We'll break it down.

### Lambert's Cosine Law — The Math of Diffuse Lighting

There's this fascinating physics principle from way back in 1760 that we'll use. It was discovered by Johann Heinrich Lambert and states:

> *"The amount of light hitting a surface is proportional to the cosine of the angle between the light direction and the surface normal." — **Johann Heinrich Lambert, 1760, Photomotria***

In plain English: the more directly a surface faces a light source, the brighter it appears. If it's at an angle, it gets less light. If it's facing away completely, it gets no direct light at all.

Mathematically, we can express this as:

$$
I_{\text{diffuse}} = \max(0, \vec{N} \cdot \vec{L})
$$

Let's break it down in simpler terms:

- $\vec{N}$ is the "normal vector" of a surface (imagine an arrow sticking straight out from the surface)
- $\vec{L}$ is the direction of the light (pointing from the surface toward the light)
- The dot product ($\vec{N} \cdot \vec{L}$) essentially tells us how aligned these two directions are
- The $\max(0,...)$ part ensures we don't get negative light values when a surface faces away from the light

But I'm going to add one more thing: **ambient light**. This is a small amount of background illumination (let's call it $A$) that ensures even surfaces facing away from the light aren't completely black. It's like the soft, indirect light that bounces around a room.

So our complete lighting formula becomes:

$$
I_{\text{diffuse}} = \max(0, \vec{N} \cdot \vec{L}) + A
$$

Here's what's happening:

- If the surface directly faces the light source ($\theta = 0°$), the cosine = 1, giving maximum brightness
- If it's perpendicular to the light ($\theta = 90°$), the cosine = 0, giving only ambient light
- If it faces away ($\theta = 180°$), the cosine = -1, but we clamp it to zero with the $\max()$ function, then add ambient light

To keep everything nicely bounded, I'll clamp the final intensity between 0 and 1:

$$
I_\text{diffuse} = \min(1,\max(0,(\vec{N}) \cdot (\vec{L})+A))
$$

I've implemented this lighting model in `src/core/renderer/shading.ts` through the `Shading` class. It calculates those surface normals using the cross product of edge vectors and determines light intensity based on the dot product between the normal and light direction vectors.

Isn't it amazing how a few simple math operations can create the illusion of depth on a flat screen? Now let's move on to how we'll actually render this on our terminal!

## Terminal Rendering

Now we've covered the fundamental math, but there's still the question of how we'll actually display our 3D object on a simple text terminal. Let's see how we bridge that gap!

Terminal rendering is where the magic happens. We're going from math and coordinates to something you can actually see. I've built a rendering system that uses ASCII characters to create the illusion of a 3D object on our plain text terminal.

### ASCII Art as a Visual Medium

If you've been around computers for a while, you might remember ASCII art — that creative way of making pictures using just text characters. We're doing something similar, but with a modern twist: we're using specific characters to represent different light intensities.

I've chosen a set of ASCII characters that progress from dark to light:

```typescript
" .,:-=+*#%@"
```

Can you see how they get progressively "denser"? A space is nearly invisible (darkest), while "@" appears quite bold (brightest). This gives us a visual gradient we can use to represent different lighting levels on our 3D object.

### The Buffer System

To make rendering work smoothly, I've implemented two important buffers:

- **Character Buffer**: This holds the actual ASCII characters we'll display
- **Depth Buffer**: This tracks how "deep" each pixel is (its z-coordinate)

The depth buffer is crucial because it helps us solve the "painter's problem" — determining which parts of an object should be visible when some parts are behind others. For each pixel position, we only draw a new point if it's closer to the viewer than what's already there.

Here's a simplified look at how this works:

1. Initialize both buffers with empty spaces and "infinity" depth values
2. For each triangle in our 3D model:
   - Project its vertices to 2D screen coordinates
   - Calculate its surface normal and lighting intensity
   - Fill in the projected triangle area with appropriate ASCII characters
   - For each position, check if this point is closer than what's already in the buffer
   - If it is closer, update both the character and depth buffers

3. Once all triangles are processed, display the character buffer to the terminal

The implementation is in `src/core/renderer/terminal.ts` where I've built the `Terminal` class to handle all these operations. It manages the buffers, provides methods for drawing points and triangles, and keeps track of depth to ensure proper rendering.

### Handling Terminal Constraints

Working with a terminal introduces some unique challenges:

- Terminal "pixels" (characters) aren't square — they're taller than they are wide
- Terminal resolution is much lower than a graphical display
- We can only use text characters, not actual pixels or colors (though some terminals do support color!)

To address these challenges, I've built scaling and offsetting into our projection system to account for the non-square aspect ratio of terminal characters. This prevents our objects from looking squished or distorted.

### Refreshing the Display

Once we've filled our buffers and are ready to show a new frame, we need to update the terminal display. This process involves:

1. Clearing the previous frame
2. Converting our 2D character buffer into a string representation
3. Writing that string to the terminal
4. Positioning the cursor back at the top-left for the next frame

This creates the illusion of animation as we repeatedly update the display with each new frame. The rendering loop in the main application handles this process, calculating new positions and orientations for each frame before rendering.

## 3D Objects Implementation

We've covered the math and rendering, but how do we actually create and manage 3D objects in our code? Let's take a look at the implementation details!

At the core of our 3D system is a simple but flexible approach that separates the creation of vertices from the definition of faces. This separation of concerns gives us a clean and maintainable design.

### The Object3D Class

The `Object3D` class is responsible for creating the fundamental 3D shapes in our system. Unlike more complex graphics engines, I've kept this class intentionally simple and focused:

```typescript
export class Object3D {
    createCube(origin: Vector3, scale: number): Array<Vector3> {
        const halfScale = scale / 2;
        return [
            new Vector3(origin.x - halfScale, origin.y - halfScale, origin.z - halfScale),
            new Vector3(origin.x + halfScale, origin.y - halfScale, origin.z - halfScale),
            // ... more vertices
        ];
    }
    
    getCubeFaces(): Array<number[]> {
        return [
            // Front face
            [0, 1, 2], [1, 3, 2],
            // Back face
            [4, 6, 5], [5, 6, 7],
            // ... more faces
        ];
    }
    
    // Other shape methods...
}
```

The class provides methods for both generating vertices that define different shapes like cubes and prisms, and for defining how those vertices connect to form faces. This encapsulation keeps our code clean and organized.

### Working with Triangular Faces

Each 3D object is constructed from triangular faces. Why triangles? Because they're the simplest polygon that can define a plane in 3D space. Unlike squares or other polygons which might become distorted during transformation, triangles always remain flat. Additionally, any complex shape can be broken down into triangles, making them the fundamental building block for 3D graphics.

Each triplet of numbers in our face definitions is a reference to three vertices from our vertex array. For example, `[0, 1, 2]` means "create a triangle using the vertices at indices 0, 1, and 2."

### Creating and Working with 3D Objects

To create a 3D object in our system, we:

```typescript
// Initialize components
const terminal = new Terminal();
const object3D = new Object3D();
const projector = new Projection(
  terminal.getWidth(),
  terminal.getHeight()
);
const shading = new Shading();
const logger = new Logger(true, LogLevel.INFO);

// Define available shapes
const shapes = {
  cube: () => object3D.createCube(new Vector3(0, 0, 0), Settings.OBJECT_SCALE),
  prism: () => object3D.createPrism(new Vector3(0, 0, 0), Settings.OBJECT_SCALE + 4, Settings.OBJECT_SCALE + 4),
};

// Create the initial 3D object and set our current shape
const currentShape = 'cube';
const vertices = shapes[currentShape]();

// Animation variables
let rotationX = 0;
let rotationY = 0;
let rotationZ = 20;

// The update function that handles animation
function update() {
  // Clear the buffer for the next frame
  terminal.clearBuffer();
  
  // Auto-rotate the object
  rotationX += Settings.ANIMATION_SPEED / 2;
  rotationY += Settings.ANIMATION_SPEED / 4;
  
  // Apply rotation to vertices
  const rotatedVertices = Transformation.rotate(
    vertices,
    new Angle(rotationX),
    new Angle(rotationY),
    new Angle(rotationZ)
  );
  
  // Move the object away from the camera for better visibility
  const translatedVertices = Transformation.translate(
    rotatedVertices,
    new Vector3(0, 0, Settings.RENDER_DISTANCE)
  );
  
  // Project 3D vertices to 2D
  const projectedVertices = projector.project3Dto2D(translatedVertices);
  
  // Get current shape faces
  const faces = currentShape === 'cube' 
    ? object3D.getCubeFaces() 
    : object3D.getPrismFaces();
  
  // Render each face with appropriate shading
  // ... rendering code here
  
  // Display the frame
  terminal.render();
}

// Create and start the animation timer
const timer = new Timer(Settings.FPS, update);
timer.start();
```

This creates a continuous animation loop that updates and renders our 3D objects in real-time, with proper handling of different shapes, transformations, and rendering.

## Rendering System Implementation

Now let's tie everything together and see how our rendering system works as a whole! This is where all the components we've discussed so far come together to create a smooth, animated 3D experience in your terminal.

### The Main Class

The `Main` class is the central orchestrator of our rendering process handling the 3D terminal animation and integrating all the components together:

```typescript
class Main {
  // Class variables
  private _terminal: Terminal;
  private _object3D: Object3D;
  private _projector: Projection;
  private _shading: Shading;
  private _logger: Logger;
  private _timer: Timer;

  // Animation variables
  private _rotationX: number = 0;
  private _rotationY: number = 0;
  private _rotationZ: number = 20;
  private _currentShape: string = 'cube';
  private _vertices: Vector3[];
  
  // Shape definitions
  private _shapes: { [key: string]: () => Vector3[] };
  
  constructor() {
    // Initialize components
    this._terminal = new Terminal();
    this._object3D = new Object3D();
    this._projector = new Projection(
      this._terminal.getWidth(),
      this._terminal.getHeight()
    );
    this._shading = new Shading();
    this._logger = new Logger(true, LogLevel.INFO);
    
    // Define available shapes
    this._shapes = {
      cube: () => this._object3D.createCube(new Vector3(0, 0, 0), Settings.OBJECT_SCALE),
      prism: () => this._object3D.createPrism(new Vector3(0, 0, 0), Settings.OBJECT_SCALE + 4, Settings.OBJECT_SCALE + 4),
    };
    
    // Create the initial 3D object
    this._vertices = this._shapes[this._currentShape]();
    
    // Initialize animation timer
    this._timer = new Timer(Settings.FPS, this._update.bind(this));
  }
  
  // Other methods...
}
```

### The Rendering Pipeline

Let's walk through the complete rendering pipeline, from 3D object to terminal display:

1. **Object Selection**: The main application chooses between different shape generators (cube, prism)
2. **Animation Loop**: For each frame, the `_update()` method:
   - Clears the terminal buffer
   - Updates rotation angles
   - Applies transformations to the vertices
3. **Transformations**: Applied in sequence:
   - Rotation transformations using the `Transformation.rotate()` method
   - Translation to move the object for better visibility
4. **Projection**: Convert 3D vertices to 2D screen coordinates:
   - Using the `Projection.project3Dto2D()` method
5. **Face Rendering**: Process each triangle face:
   - Get face definitions from `Object3D.getCubeFaces()` or `Object3D.getPrismFaces()`
   - Calculate face normals for lighting
   - Perform back-face culling (skip faces pointing away from the camera)
   - Calculate light intensity and select appropriate shading character
   - Draw triangles to the terminal buffer
6. **Display**: Show the result on the terminal:
   - Add UI information (shape name, FPS, rotation angles)
   - Call `terminal.render()` to display the frame

### Putting It All Together

Here's how the update method brings everything together in the rendering pipeline:

```typescript
private _update(): void {
  try {
    // Clear the buffer for the next frame
    this._terminal.clearBuffer();
    
    // Auto-rotate the object
    this._rotationX += Settings.ANIMATION_SPEED / 2;
    this._rotationY += Settings.ANIMATION_SPEED / 4;
    
    // Apply rotation to vertices
    const rotatedVertices = Transformation.rotate(
      this._vertices,
      new Angle(this._rotationX),
      new Angle(this._rotationY),
      new Angle(this._rotationZ)
    );
    
    // Move the object away from the camera for better visibility
    const translatedVertices = Transformation.translate(
      rotatedVertices,
      new Vector3(0, 0, Settings.RENDER_DISTANCE)
    );
    
    // Project 3D vertices to 2D
    const projectedVertices = this._projector.project3Dto2D(translatedVertices);
    
    // Get current shape faces
    const faces = this._currentShape === 'cube' 
      ? this._object3D.getCubeFaces() 
      : this._object3D.getPrismFaces();
    
    // Render each face with appropriate shading
    this._renderFaces(translatedVertices, projectedVertices, faces);
    
    // Render info text
    this._terminal.drawText(1, 1, `Shape: ${this._currentShape}`, 0);
    this._terminal.drawText(1, 2, `FPS: ${this._timer.getCurrentFps().toFixed(1)}`, 0);
    this._terminal.drawText(1, 3, `Rotation: X=${this._rotationX.toFixed(1)} Y=${this._rotationY.toFixed(1)} Z=${this._rotationZ.toFixed(1)}`, 0);
    
    // Render the frame
    this._terminal.render();
  } catch (error) {
    this._logger.error(`Error in update: ${error}`);
  }
}
```

This creates a continuous animation loop that updates and renders our 3D objects in real-time, with keyboard controls allowing you to interact with the animation by changing rotations or switching between shapes.

### Performance Optimization

Rendering even simple 3D shapes in a terminal can be computationally intensive. To keep performance snappy, I've implemented several optimizations:

- **Backface Culling**: Skip triangles that face away from the viewer
- **Depth Buffering**: Only render pixels that are in front of already-rendered pixels
- **Buffer Reuse**: Reuse buffers between frames instead of reallocating memory
- **Efficient Triangle Filling**: Use a scanline algorithm to fill triangles with minimal computation

These optimizations ensure that even on modest hardware, you can enjoy smooth animation of 3D objects in your terminal.

## Conclusion

What I love about this project is how it bridges the gap between abstract mathematical concepts and something visually tangible. You can literally see the math in action as the cube rotates on your screen.

This project is meant to be both educational and fun. It demonstrates core concepts of computer graphics in a uniquely accessible way. By using the terminal instead of a fancy graphics API, we get to see exactly what's happening at each step of the rendering process.

I've designed the code to be modular and extensible, so you can easily:

- Add new 3D shapes beyond cubes
- Implement different shading models
- Create more complex scenes with multiple objects
- Add interactive elements like keyboard controls

I hope you've enjoyed exploring this project with me. There's something magical about creating 3D worlds from nothing but text characters, and I encourage you to experiment further with the code.

If you'd like to learn more about the concepts we've covered, check out resources on linear algebra, computer graphics fundamentals, and 3D rendering techniques. The principles we've used here are the same ones that power modern video games and 3D applications — just simplified to their essence.

### A Note on Development Approach

Creating Axis has been a fascinating journey of learning and collaboration. Rather than being intimidated by 3D math concepts, I approached them systematically &mdash; researching thoroughly and breaking complex ideas into manageable pieces before writing any code.

In today's development landscape, understanding concepts is more valuable than just writing code. AI assistants served not just as code generators, but as learning partners that helped explore the "why" behind the "how." This methodical process made Axis both powerful and approachable.

The journey itself became as rewarding as the destination, proving that even seemingly complex 3D graphics can be conquered through thoughtful, step-by-step development focused on understanding rather than merely implementing.

Happy coding, and enjoy your terminal-based 3D adventures!
