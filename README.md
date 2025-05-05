# Project Axis

## A foreword

As I begin building this project &mdash; for the first time pairing it with proper documentation and a blog &mdash; I also begin a new chapter of my journey: opening up to the world and sharing my humble experiences in the realm of computer science and programming. My hope is to grow through this process, and maybe, just maybe, enjoy your precious company along the way.

Thank you!

## Axis

This project is inspired by the well-known YouTuber *@Joma Tech*, who &mdash; in what I assume was parody comedy &mdash; showcased a spinning 3D donut model rendered right in the terminal. That quirky little idea got stuck in my head, and now I want to try building a simple 3D renderer using JavaScript (layered with TypeScript for some added convenience). I’ll experiment with different 3D objects and do my best to recreate Joma’s fun idea. Let’s jump right into it!

## Genesis

In this section, I’d like to start with a few key details to ensure clarity and consistency as we move forward. We’ll build a conceptual model to help us make sense of the project, sketch out a roadmap to align everything in perfect, and lay out the project directory structure.

And for the record &mdash; we’re about to explore some really cool math concepts in this one!

## The Axis Concept

The idea behind this project is intentionally minimal. We’re working with vectors in 3D space, applying some cool math operations like rotation to bring the animation to life, and projection to present everything on a 2D surface &mdash; in our case, the terminal. To make it feel more realistic, we’ll also include surface normalization and light vectors, so we can create some nice shading effects and depth.

After diving into the fascinating math behind it all, we’ll explore how each piece is transformed into clean, object-oriented code &mdash; where all the components come together to produce the final effect. Now, let’s step into the world of 3D vector space.

### The 3D and 2D Vector Space

Let’s consider a cube. In mathematics, any 3D object like a cube is represented by a set of points called vertices. When these points are connected, we form vectors, or edges, which define the shape of the object. In 3D space specifically, each vertex is defined by coordinates $(x,y,z)$, where:

- $x$ represents left and right,
- $y$ represents up and down,
- $z$ represents depth &mdash; in and out of the screen (well... if only our screen could let things pop out for real!).

<figure style='display: flex; flex-direction: column; margin: 2rem auto; gap: 1rem'>
    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Coord_planes_color.svg/800px-Coord_planes_color.svg.png' alt='A representation of a three-dimensional Cartesian coordinate system' style='display: block; margin: 0 auto; height: 16rem; background-color: #fff; border-radius: 0.5rem'>
    <figcaption style='font-style: italic; margin: 0 auto; font-size: 85%'>A representation of a three-dimensional Cartesian coordinate system</figcaption>
</figure>

Now, in 2D space, things are a bit simpler &mdash; and more practical for our terminal-based project. Here, we only work with (x,y) coordinates. That means we lose the depth component, which is where projection comes in... but let’s not get ahead of ourselves just yet.

<figure style='display: flex; flex-direction: column; margin: 2rem auto; gap: 1rem'>
    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Cartesian-coordinate-system.svg/250px-Cartesian-coordinate-system.svg.png' alt='Illustration of a Cartesian coordinate plane. Four points are marked and labeled with their coordinates: (2, 3) in green, (−3, 1) in red, (−1.5, −2.5) in blue, and the origin (0, 0) in purple.' style='display: block; margin: 0 auto; height: 16rem; background-color: #fff; border-radius: 0.5rem'>
    <figcaption style='font-style: italic; margin: 0 auto; font-size: 85%'>Illustration of a two-dimension Cartesian coordinate system. Four points are marked and labeled with their coordinates: (2, 3) in green, (−3, 1) in red, (−1.5, −2.5) in blue, and the origin (0, 0) in purple.</figcaption>
</figure>

### Rotation in 3D Space

Rotation is a key mathematical concept that brings our 3D cube to life by animating it frame by frame. It allows us to turn or spin our 3D object along any axis &mdash; and that’s exactly what makes it feel dynamic.

To rotate points in 3D space, we apply trigonometric functions like $sine()$ and $cosine()$ to their coordinates. Each rotation is done around a specific axis &mdash; X, Y, or Z &mdash; and for each axis, we have a specific formula that transforms a point's position.

- Rotating around the X-axis affects the Y and Z coordinates:

$$
\begin{bmatrix} x' \\ y' \\ z' \end{bmatrix} = \begin{bmatrix} x \\ y.\cos(\theta) - z.\sin(\theta) \\ y.\sin(\theta) + z.\cos(\theta) \end{bmatrix}
$$

- Rotating around the Y-axis affects the X and Z coordinates:

$$
\begin{bmatrix} x' \\ y' \\ z' \end{bmatrix} = \begin{bmatrix} x.\cos(\theta) - z.\sin(\theta) \\ y \\ -x.\sin(\theta) + z.\cos(\theta) \end{bmatrix}
$$

- Rotating around the Z-axis affects the X and Y coordinates:

$$
\begin{bmatrix} x' \\ y' \\ z' \end{bmatrix} = \begin{bmatrix} x.\cos(\theta) - y.\sin(\theta) \\ x.\sin(\theta) + y.\cos(\theta) \\ z \end{bmatrix}
$$

We can apply these rotations individually or combine them by applying them one after another. That’s how we’ll simulate smooth spinning &mdash; just to keep rotating slightly over time!

We’ll later turn these into reusable code in our object-oriented setup.

## Projection

In 3D graphics, projection is the process of translating 3D points onto a 2D plane &mdash; sort of like casting the shadow of a 3D shape onto a flat surface. While our cube lives and rotates freely in 3D space, when it's time to render it in the terminal (which is 2D), we use mathematics to flatten those 3D coordinates into something drawable.

This process lets us simulate depth and movement even though the terminal has no concept of real 3D space.

There are two main types of projection:

- **Perspective projection**: This approach mimics how our eyes work: objects farther away appear smaller. It introduces realistic depth by scaling based on the z coordinate (depth). However, it's not always practical in low-resolution environments like a terminal &mdash; where precision is limited by character size.

<figure style='display: flex; flex-direction: column; margin: 2rem 0; gap: 1rem'>
    <img src='https://player.slideplayer.com/13/3916031/data/images/img14.jpg' alt='Three-point perspective projection' style='display: block; margin: 0 auto; height: 16rem; background-color: #fff; border-radius: 0.5rem'>
    <figcaption style='font-style: italic; margin: 0 auto; font-size: 85%'>Illustration of a three-point perspective projection.</figcaption>
</figure>

- **Orthographic projection**: In orthographic projection, objects maintain their size regardless of depth. It ignores the z-axis for scaling, keeping things simple and accurate. Though it's less “realistic,” it's perfect for clean, readable representations, especially in text-based or schematic visualizations.

<figure style='display: flex; flex-direction: column; margin: 2rem 0; gap: 1rem'>
    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Axonometric_projection.svg/800px-Axonometric_projection.svg.png' alt='Axonometric projection.' style='display: block; margin: 0 auto; height: 16rem; background-color: #fff; border-radius: 0.5rem'>
    <figcaption style='font-style: italic; margin: 0 auto; font-size: 85%'>Illustration of a three-point orthographic projection.</figcaption>
</figure>

We’ll be using orthographic projection in this project, because it provides a stable and clear representation of our cube that suits terminal rendering just right.

### Math Behind Orthographic Projection

As we discussed above, in orthographic projection, the size of the object &mdash; a cube, in our case &mdash; remains constant no matter how far it moves from the viewer. It’s as if we’re observing the cube from an infinitely far distance, where our line of sight becomes perfectly parallel. Because of this, parallel lines never converge, and there’s no illusion of depth caused by scaling. This allows us to represent the cube clearly and consistently, which is especially helpful when working in environments like the terminal where every pixel (or character) counts!

Given a 3D point $(x,y,z)$, its 2D screen projection is:

$x' = x.scale$ and $y' = y.scale$ or $P' = (x.scale,y.scale)$

Simple scaling might be applied to $x$ and $y$.

$z$ is ignored completely in the projection (intesrestingly, it can still be used for sorting, like in hidden surface removal or layering).

## Lighting

In our real world, what we see is just light bouncing off surfaces into our eyes. In a 3D space, we can simulate lighting by making surfaces appear:

- **Bright** if they're facing the light,

- **Dim** if they're turned away,

- And **dark** if they're in shadow (though we're not simulating shadows here).

We'll be modeling this using vectors and dot products, following a classic and elegant mathematical approach.

### Lambert's Cosine Law &mdash; The Math of Diffuse Lighting

This is a physics classic, and it tells us that:

>*"The amount of light hitting a surface is proportional to the cosine of the angle between the light direction and the surface normal." &mdash; **Johann Heinrich Lambert, 1760, Photomotria***

Mathematically:

$$
I_{\text{diffuse}} = \max(0, \vec{N} \cdot \vec{L})
$$

Let's unpack this aligning to our own terms:

- Let $\vec{N}$ be the normal vector of a surface on our cube (a unit vector).
- Let $\vec{L}$ be the light direction vector, pointing from the surface point but also normalized.
- Let's also introduce constant $A$ for **ambient light**&mdash;a small amount of background light (typically between 0 and 1) that keeps the surface from going completely dark when it faces away from the light.

So, the total light intensity $I_{\text{diffuse}}$ at a given point on our cube is:

$$
I_{\text{diffuse}} = \max(0, \vec{N} \cdot \vec{L}) + A
$$

Here's what's going on:

- The dot product $\vec{N}.\vec{L} = \cos(\theta)$, where $\theta$ is the gievn angle between the surface normal and the light direction.

- If the surface faces directly toward the light, $\theta = 0^\circ$, so $\cos(\theta) = 1$ &rightarrow; maximum brightness.

- If it faces away, $\theta = 180^\circ$, so $\cos(\theta) = -1$ &rightarrow; darkness (but we clamp that to zero using the $max()$ function).

- The ambient light $A$ makes sure that even those unshaded areas still get a soft touch of light.

To make sure the final intensity doesn’t overshoot, we clamp the total value between 0 and 1:

$$
I_\text{diffuse} = \min(1,\max(0,(\vec{N}).(\vec{L})+A))
$$

And there we have it: a beautifully simple yet realistic lighting model driven by pure angles. It’s the math behind flat shading.

## Terminal Rendering

The terminal is our canvas for this 3D rendering project. Unlike traditional graphics rendering that uses pixels, we'll be working with characters in a grid. This unique constraint requires us to think differently about how we represent 3D objects.

### Character Grid and Frame Buffer

Think of the terminal as a grid of characters, much like a pixel grid in traditional graphics. Each cell in this grid can hold one character. In our case, this grid is defined by:

- **Width**: Number of characters that fit horizontally
- **Height**: Number of lines that fit vertically

The frame buffer is a crucial concept in terminal rendering. Instead of directly writing to the terminal, we'll maintain a buffer that represents the entire screen. This buffer will allow us to:

1. Update only the parts of the screen that have changed
2. Maintain proper depth ordering (closer objects appear in front &mdash; more on this below)
3. Prevent flickering by updating the entire screen at once

### Depth Buffering

In 3D rendering, depth buffering is crucial for maintaining proper object ordering. In our terminal renderer, we implement this through two parallel buffers:

- **Frame Buffer**: Stores the characters to be displayed
- **Depth Buffer**: Stores the z-coordinate (depth) for each position

For each position (x,y) in the terminal grid:

1. When rendering a new object:
   - We calculate its z-coordinate after transf ormation
   - We compare with the stored z-value in the depth buffer
   - If **new z** < **stored z** (closer object), we update both buffers:
     - Frame buffer: new character
     - Depth buffer: new z-value
   - If **new z** > **stored z** (farther object), we skip the update

This ensures that:

- Closer objects always appear in front
- Surfaces don't intersect incorrectly
- The final image maintains proper perspective

### Character Set and Density

In traditional graphics, we use pixels of different colors to create images. In the terminal, we'll be using characters of different shapes and densities. The ASCII character set provides a range of characters that can be used to create varying levels of darkness and patterns:

- Light characters: `.`, `,`, `:`
- Medium characters: `o`, `*`, `+`
- Dark characters: `#`, `@`, `■`

The choice of character affects how the final image appears. Darker characters create more solid shapes, while lighter characters create softer gradients.

### Math Behind Terminal Rendering

While we're working with characters instead of pixels, many of the same mathematical concepts apply:

- Vector transformations for camera movement
- Matrix operations for efficient rendering
- Projection calculations to map 3D points to 2D grid positions
- Depth calculations for proper object ordering

The main difference is that instead of drawing pixels, we're placing characters in specific grid positions based on the calculated 3D transformations.

## Axis Implementation

Let’s dive into how our mathematical concepts are transformed into code. The Axis project is organized into several key components, each playing a crucial role in our 3D rendering system.

### Project Structure

    /src
    ├── core/
    │    ├── math/
    │    │    ├── rotation.ts
    │    │    ├── projection.ts
    │    │    └── vector.ts
    │    ├── object3d/
    │    │    ├── shape.ts
    │    │    └── transformation.ts
    │    └── renderer/
    │         ├── terminal.ts
    │         └── shading.ts
    │
    ├── app/
    │    ├── main.ts
    │    └── settings.ts
    │
    └── utils/
        ├── timer.ts
        └── logger.ts

### Core Components

The core directory is the heart of our system, divided into three main parts:

1. **Math Core**
   - Handles all mathematical operations and transformations
   - Provides the foundation for 3D space calculations
   - Implements vector operations and transformations

2. **3D Objects**
   - Defines 3D shapes and their properties
   - Handles object transformations and animations
   - Manages object relationships and hierarchies

3. **Renderer**
   - Implements terminal-based rendering
   - Handles shading and lighting calculations
   - Manages frame buffer and depth buffer

### Supporting Components

1. **Application Layer**
   - Main application logic and state management
   - Configuration and settings
   - Input handling and user interaction

2. **Utilities**
   - Timer for animation control
   - Logger for debugging and monitoring

Each component is designed to be modular and reusable, making the codebase easy to maintain and extend.

### Math Core Implementation

Let’s dive into the heart of our 3D rendering system: the mathematical core. This is where all the magic happens, transforming our abstract mathematical concepts into concrete code.

#### Vectors

The `vector.ts` file is our foundation, implementing both 3D and 2D vector operations. Let's dive into the mathematical concepts and their implementation:

##### Vector3 Class

The Vector3 class represents points in 3D space. Mathematically, a 3D vector is defined by three coordinates:

$$
\vec{v} = (x, y, z)
$$

The implementation follows this mathematical definition:

```typescript
export class Vector3 {
    constructor(public x: number, public y: number, public z: number) {}
}
```

##### Vector Operations

The class implements basic vector operations that form the foundation of our 3D transformations:

1. **Vector Addition**
   - Mathematically: $\vec{a} + \vec{b} = (a_x + b_x, a_y + b_y, a_z + b_z)$
   - Implementation:
   ```typescript
   add(v: Vector3): Vector3 {
       return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
   }
   ```

2. **Vector Subtraction**
   - Mathematically: $\vec{a} - \vec{b} = (a_x - b_x, a_y - b_y, a_z - b_z)$
   - Implementation:
   ```typescript
   subtract(v: Vector3): Vector3 {
       return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
   }
   ```

3. **Scalar Multiplication**
   - Mathematically: $k\vec{v} = (kx, ky, kz)$
   - Implementation:
   ```typescript
   multiply(Scalar: number): Vector3 {
       return new Vector3(this.x * Scalar, this.y * Scalar, this.z * Scalar);
   }
   ```

##### Vector2 Class

The Vector2 class handles 2D operations, crucial for our terminal rendering:

```typescript
export class Vector2 {
    constructor(public x: number, public y: number) {}
}
```

It implements the same operations as Vector3 but for 2D space:

1. **2D Vector Addition**
   - Mathematically: $\vec{a} + \vec{b} = (a_x + b_x, a_y + b_y)$
   - Implementation:
   ```typescript
   add(v: Vector2): Vector2 {
       return new Vector2(this.x + v.x, this.y + v.y);
   }
   ```

2. **2D Vector Subtraction**
   - Mathematically: $\vec{a} - \vec{b} = (a_x - b_x, a_y - b_y)$
   - Implementation:
   ```typescript
   subtract(v: Vector2): Vector2 {
       return new Vector2(this.x - v.x, this.y - v.y);
   }
   ```

##### Key Features

- **Immutability**: Each operation returns a new instance, ensuring predictable behavior
- **Type Safety**: TypeScript's type system ensures correct vector operations
- **Clean Separation**: Vector3 for 3D space, Vector2 for 2D projections
- **Functional Approach**: Pure functions that don't modify state

These vector operations form the foundation of all our 3D transformations, from rotations to projections. The immutability pattern helps maintain consistency in our animation loops and transformations.

#### Rotation Implementation

In `rotation.ts`, we bring our rotation concepts to life with a clean, functional approach. Let's explore the mathematical concepts and their implementation:

##### Angle Representation

The Angle class handles angle representation and conversion:

```typescript
export class Angle {
    constructor(public degrees: number) {}
    
    toRadians(): number {
        return (this.degrees * Math.PI) / 180;
    }
}
```

This class ensures consistent angle handling throughout the system, converting degrees to radians for trigonometric calculations.

##### Axis-Specific Rotations

The implementation provides three main rotation functions, each corresponding to an axis:

1. **X-Axis Rotation**
   - Rotation matrix:
   $$
   R_x(\theta) = 
   \begin{pmatrix}
   1 & 0 & 0 \\
   0 & \cos\theta & -\sin\theta \\
   0 & \sin\theta & \cos\theta
   \end{pmatrix}
   $$
   - Implementation:
   ```typescript
   export function rotateX(vector: Vector3, angle: Angle): Vector3 {
       const rad = angle.toRadians();
       const cos = Math.cos(rad);
       const sin = Math.sin(rad);
       return new Vector3(
           vector.x,
           vector.y * cos - vector.z * sin,
           vector.y * sin + vector.z * cos
       )
   }
   ```

2. **Y-Axis Rotation**
   - Rotation matrix:
   $$
   R_y(\theta) = 
   \begin{pmatrix}
   \cos\theta & 0 & \sin\theta \\
   0 & 1 & 0 \\
   -\sin\theta & 0 & \cos\theta
   \end{pmatrix}
   $$
   - Implementation:
   ```typescript
   export function rotateY(vector: Vector3, angle: Angle): Vector3 {
       const rad = angle.toRadians();
       const cos = Math.cos(rad);
       const sin = Math.sin(rad);
       return new Vector3(
           vector.x * cos + vector.z * sin,
           vector.y,
           -vector.x * sin + vector.z * cos
       )
   }
   ```

3. **Z-Axis Rotation**
   - Rotation matrix:
   $$
   R_z(\theta) = 
   \begin{pmatrix}
   \cos\theta & -\sin\theta & 0 \\
   \sin\theta & \cos\theta & 0 \\
   0 & 0 & 1
   \end{pmatrix}
   $$
   - Implementation:
   ```typescript
   export function rotateZ(vector: Vector3, angle: Angle): Vector3 {
       const rad = angle.toRadians();
       const cos = Math.cos(rad);
       const sin = Math.sin(rad);
       return new Vector3(
           vector.x * cos - vector.y * sin,
           vector.x * sin + vector.y * cos,
           vector.z
       )
   }
   ```

##### Key Features

- **Immutability**: Each rotation returns a new Vector3 instance
- **Trigonometric Precision**: Uses Math.cos and Math.sin for accurate rotations
- **Axis Separation**: Clear separation of concerns for each axis
- **Memory Efficiency**: Reuses calculations (cos and sin) for performance
- **Type Safety**: Strong TypeScript typing ensures correct usage

The rotation implementation follows the mathematical principles of rotation matrices while maintaining a clean, functional approach. Each axis rotation is independent, allowing for easy combination of rotations around multiple axes.

#### Projection Implementation

The `projection.ts` file handles our 2D-to-3D transformations. Let's explore the mathematical concepts and their implementation:

##### Orthographic Projection

Orthographic projection transforms 3D coordinates into 2D screen coordinates while maintaining consistent scaling. Mathematically, it's defined as:

$$
\begin{pmatrix}
x' \\
y' \\
\end{pmatrix}
=
\begin{pmatrix}
x \cdot scale + centerX \\
-y \cdot scale + centerY \\
\end{pmatrix}
$$

The implementation follows this mathematical model:

```typescript
export class Projection {
    constructor(
        public _screenWidth: number = process.stdout.columns,
        public _screenHeight: number = process.stdout.rows,
        public _scale: number = 1,
        public _zOffset?: number
    ) {}
}
```

##### Projection Process

The projection process involves several key steps:

1. **Center Calculation**
   - CenterX = screenWidth / 2
   - CenterY = screenHeight / 2
   
2. **Coordinate Transformation**

   ```typescript
   project3Dto2D(v: Array<Vector3>): Array<Vector2> {
       const centerX = this._screenWidth / 2;
       const centerY = this._screenHeight / 2;

       const projected: Array<Vector2> = [];
       for (const vector of v) {
           const x = centerX + vector.x * this._scale;
           const y = centerY - vector.y * this._scale;
           projected.push(new Vector2(x, y));
       }
       return projected;
   }
   ```

##### Key Features

- **Orthographic Projection**: Maintains consistent scaling regardless of depth
- **Y-Axis Inversion**: Adjusts for terminal coordinate system (top-left origin)
- **Screen Centering**: Automatically centers objects on the screen
- **Scaling Control**: Allows for size adjustment through scale parameter
- **Depth Sorting**: Maintains depth information for proper object ordering

The projection implementation is crucial for our terminal-based renderer as it:
- Transforms 3D coordinates into terminal grid positions
- Maintains proper proportions through consistent scaling
- Handles terminal-specific coordinate systems
- Preserves depth information for proper rendering order

### 3D Objects Implementation

Let's dive into how we create and manage 3D objects in our system. This is where we define the shapes that will be transformed and rendered.

#### Shape Creation

The Shape class provides methods for creating various 3D objects:

```typescript
export class Object3D {
    createCube(origin: Vector3, scale: number): Array<Vector3> {
        const halfScale = scale / 2;
        return [
            new Vector3(origin.x - halfScale, origin.y - halfScale, origin.z - halfScale),
            new Vector3(origin.x + halfScale, origin.y - halfScale, origin.z - halfScale),
            new Vector3(origin.x - halfScale, origin.y + halfScale, origin.z - halfScale),
            new Vector3(origin.x + halfScale, origin.y + halfScale, origin.z - halfScale),
            new Vector3(origin.x - halfScale, origin.y - halfScale, origin.z + halfScale),
            new Vector3(origin.x + halfScale, origin.y - halfScale, origin.z + halfScale),
            new Vector3(origin.x - halfScale, origin.y + halfScale, origin.z + halfScale),
            new Vector3(origin.x + halfScale, origin.y + halfScale, origin.z + halfScale),
        ];
    }
}
```

##### Prism Creation

A prism is defined by its base and height. Mathematically, it's constructed using a combination of rectangular faces:

$$
\begin{aligned}
V_1 &= (x - b/2, y - h/2, z) \\
V_2 &= (x + b/2, y - h/2, z) \\
V_3 &= (x + b/2, y + h/2, z) \\
V_4 &= (x - b/2, y + h/2, z) \\
V_5 &= (x, y, z - b/2)
\end{aligned}
$$

The implementation follows this mathematical definition:

```typescript
createPrism(origin: Vector3, base: number, height: number): Array<Vector3> {
    const halfBase = base / 2;
    const halfHeight = height / 2;
    return [
        new Vector3(origin.x - halfBase, origin.y - halfHeight, origin.z),
        new Vector3(origin.x + halfBase, origin.y - halfHeight, origin.z),
        new Vector3(origin.x + halfBase, origin.y + halfHeight, origin.z),
        new Vector3(origin.x - halfBase, origin.y + halfHeight, origin.z),
        new Vector3(origin.x, origin.y, origin.z - halfBase),
    ];
}
```

#### Transformations

The Transformation class handles all 3D transformations. Let's explore the mathematical concepts and their implementation:

##### Translation

Translation moves objects in 3D space using vector addition:

$$
\begin{pmatrix}
x' \\
y' \\
z'
\end{pmatrix}
=
\begin{pmatrix}
x + t_x \\
y + t_y \\
z + t_z
\end{pmatrix}
$$

```typescript
static translate(vertices: Vector3[], offset: Vector3): Vector3[] {
    return vertices.map(vertex => vertex.add(offset));
}
```

##### Scaling

Scaling adjusts object size from a center point:

$$
\begin{pmatrix}
x' \\
y' \\
z'
\end{pmatrix}
=
\begin{pmatrix}
s_x(x - c_x) + c_x \\
s_y(y - c_y) + c_y \\
s_z(z - c_z) + c_z
\end{pmatrix}
$$

```typescript
static scale(vertices: Vector3[], scale: number, origin: Vector3 = new Vector3(0, 0, 0)): Vector3[] {
    return vertices.map(vertex => {
        const translated = vertex.subtract(origin);
        const scaled = translated.multiply(scale);
        return scaled.add(origin);
    });
}
```

##### Rotation

Rotation combines X, Y, and Z axis rotations using the rotation functions from our rotation implementation (discussed earlier in the Rotation Implementation section). Each axis rotation uses the corresponding rotation matrix:

- X-axis rotation: $R_x(\theta)$
- Y-axis rotation: $R_y(\theta)$
- Z-axis rotation: $R_z(\theta)$

The implementation chains these rotations in sequence:

```typescript
static rotate(vertices: Vector3[], angleX?: Angle, angleY?: Angle, angleZ?: Angle): Vector3[] {
    return vertices.map(vertex => {
        let result = vertex;
        if (angleX) result = rotateX(result, angleX);
        if (angleY) result = rotateY(result, angleY);
        if (angleZ) result = rotateZ(result, angleZ);
        return result;
    });
}
```

Here's a practical example of how these rotation functions work:

```typescript
const vector = new Vector3(1, 2, 3);
const angle = new Angle(90);
const rotatedVector = rotateZ(vector, angle); // rotatedVector is Vector3(-2, 1, 3)
```

This example demonstrates how the Z-axis rotation function transforms a vector by 90 degrees around the Z-axis, maintaining the Z coordinate while rotating the X and Y coordinates.

##### Key Features

- **Vertex Management**: Uses Vector3 arrays for precise vertex storage
- **Transformation Chaining**: Supports multiple transformations in sequence
- **Origin-Based Operations**: All transformations can be relative to any point
- **Type Safety**: Strong TypeScript typing ensures correct operations
- **Performance**: Uses vector operations for efficient calculations
- **Mathematical Consistency**: Implements geometric transformations accurately
- **Shape Preservation**: Maintains object proportions during transformations
- **Rotation Reusability**: Leverages the rotation implementation from math/rotation.ts

### Rendering System Implementation

Let's dive into how we transform our 3D objects into ASCII graphics in the terminal. This is where our mathematical concepts meet the screen.

#### Terminal Rendering

The Terminal class manages our ASCII graphics with two key buffers:

```typescript
export class Terminal {
    private _buffer: string[][];        // Stores ASCII characters
    private _depthBuffer: number[][];   // Stores z-depth values
    
    constructor(
        width: number = process.stdout.columns, 
        height: number = process.stdout.rows,
        defaultChar: string = ' '
    ) {
        // Initialize buffers
        this._buffer = [];
        this._depthBuffer = [];
        
        for (let y = 0; y < height; y++) {
            this._buffer[y] = Array(width).fill(defaultChar);
            this._depthBuffer[y] = Array(width).fill(Infinity);
        }
    }
}
```

##### Key Features of Terminal

1. **Double Buffering**
   - Frame buffer for characters
   - Depth buffer for z-ordering
   - Ensures proper object ordering

2. **Screen Management**
   - Terminal size aware
   - Cursor control
   - Screen clearing

3. **Drawing Operations**
   - Point drawing with z-buffering
   - Line drawing using Bresenham's algorithm
   - Character-based rendering

```typescript
// Example drawing operations
const terminal = new Terminal();

terminal.drawPoints(vertices, "@", zDepth);

terminal.drawLine(p1, p2, "#", zDepth);
```

#### Shading System

The Shading class handles light calculations and ASCII character mapping:

```typescript
export class Shading {
    constructor(
        shadingChars: string = Settings.SHADING_CHARACTERS,
        lightPosition: Vector3 = new Vector3(
            Settings.LIGHT_POSITION.x,
            Settings.LIGHT_POSITION.y,
            Settings.LIGHT_POSITION.z
        ),
        ambientLight: number = Settings.AMBIENT_LIGHT
    ) {
        this._shadingChars = shadingChars;
        this._lightPosition = lightPosition;
        this._ambientLight = ambientLight;
    }
}
```

##### Normal Calculation

The shading system calculates surface normals using vector cross products:

$$
\vec{n} = \vec{e_1} \times \vec{e_2}
$$

Where:
- $\vec{e_1}$ and $\vec{e_2}$ are edge vectors of the triangle
- $\vec{n}$ is the normal vector

```typescript
calculateNormal(v1: Vector3, v2: Vector3, v3: Vector3): Vector3 {
    const edge1 = v2.subtract(v1);
    const edge2 = v3.subtract(v1);
    
    return new Vector3(
        edge1.y * edge2.z - edge1.z * edge2.y,
        edge1.z * edge2.x - edge1.x * edge2.z,
        edge1.x * edge2.y - edge1.y * edge2.x
    );
}
```

##### Light Intensity Calculation

Light intensity is calculated using the dot product of the normal and light direction:

$$
I = \max(0, \vec{n} \cdot \vec{l}) + I_{ambient}
$$

Where:
- $\vec{n}$ is the normalized surface normal
- $\vec{l}$ is the normalized light direction
- $I_{ambient}$ is the ambient light level

```typescript
calculateLightIntensity(point: Vector3, normal: Vector3): number {
    const lightDir = this._lightPosition.subtract(point);
    const dotProduct = normal.dot(lightDir);
    return Math.max(0, dotProduct) + this._ambientLight;
}
```

##### Key Features of Shading

- **Lighting Model**: Uses dot product for realistic lighting
- **Ambient Light**: Prevents complete darkness
- **Character Mapping**: Maps light intensity to ASCII characters
- **Performance**: Optimized calculations for real-time rendering
- **Configurable**: Customizable shading characters and light position

#### Rotation in Rendering

The rotation functions are extensively used in the rendering pipeline. Here's a practical example of how they're used:

```typescript
const vector = new Vector3(1, 2, 3);
const angle = new Angle(90);
const rotatedVector = rotateZ(vector, angle); // rotatedVector is Vector3(-2, 1, 3)
```

This example demonstrates how the Z-axis rotation function transforms a vector by 90 degrees around the Z-axis, maintaining the Z coordinate while rotating the X and Y coordinates.`

#### Shading System

The Shading class handles light calculations and ASCII character mapping:

```typescript
export class Shading {
    calculateNormal(v1: Vector3, v2: Vector3, v3: Vector3): Vector3 {
        const edge1 = v2.subtract(v1);
        const edge2 = v3.subtract(v1);
        
        return new Vector3(
            edge1.y * edge2.z - edge1.z * edge2.y,
            edge1.z * edge2.x - edge1.x * edge2.z,
            edge1.x * edge2.y - edge1.y * edge2.x
        );
    }

    calculateLightIntensity(normal: Vector3, lightPosition: Vector3): number {
        // Calculate light intensity based on normal and light position
    }
}
```

##### Key Features

- **Frame Buffer**: Stores current frame state
- **Depth Buffer**: Manages object ordering
- **Light Calculations**: Handles normal vectors and light intensity
- **ASCII Mapping**: Converts light intensity to characters
- **Performance**: Optimized for real-time rendering

#### Vectors

The `vector.ts` file is our foundation, implementing both 3D and 2D vector operations. Let's dive into the mathematical concepts and their implementation:

##### Vector3 Class

The Vector3 class represents points in 3D space. Mathematically, a 3D vector is defined by three coordinates:

$$
\vec{v} = (x, y, z)
$$

The implementation follows this mathematical definition:

```typescript
export class Vector3 {
    constructor(public x: number, public y: number, public z: number) {}
}
```

##### Vector Operations

The class implements basic vector operations that form the foundation of our 3D transformations:

1. **Vector Addition**
   - Mathematically: $\vec{a} + \vec{b} = (a_x + b_x, a_y + b_y, a_z + b_z)$
   - Implementation:

        ```typescript
        add(v: Vector3): Vector3 {
            return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
        }
        ```

2. **Vector Subtraction**
   - Mathematically: $\vec{a} - \vec{b} = (a_x - b_x, a_y - b_y, a_z - b_z)$
   - Implementation:

        ```typescript
        subtract(v: Vector3): Vector3 {
            return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
        }
        ```

3. **Scalar Multiplication**
   - Mathematically: $k\vec{v} = (kx, ky, kz)$
   - Implementation:

        ```typescript
        multiply(Scalar: number): Vector3 {
            return new Vector3(this.x * Scalar, this.y * Scalar, this.z * Scalar);
        }
        ```

##### Vector2 Class

The Vector2 class handles 2D operations, crucial for our terminal rendering:

```typescript
export class Vector2 {
    constructor(public x: number, public y: number) {}
}
```

It implements the same operations as Vector3 but for 2D space:

1. **2D Vector Addition**
   - Mathematically: $\vec{a} + \vec{b} = (a_x + b_x, a_y + b_y)$
   - Implementation:

        ```typescript
        add(v: Vector2): Vector2 {
            return new Vector2(this.x + v.x, this.y + v.y);
        }
        ```

2. **2D Vector Subtraction**
   - Mathematically: $\vec{a} - \vec{b} = (a_x - b_x, a_y - b_y)$
   - Implementation:

        ```typescript
        subtract(v: Vector2): Vector2 {
            return new Vector2(this.x - v.x, this.y - v.y);
        }
        ```

##### Key Features

- **Immutability**: Each operation returns a new instance, ensuring predictable behavior
- **Type Safety**: TypeScript's type system ensures correct vector operations
- **Clean Separation**: Vector3 for 3D space, Vector2 for 2D projections
- **Functional Approach**: Pure functions that don't modify state

These vector operations form the foundation of all our 3D transformations, from rotations to projections. The immutability pattern helps maintain consistency in our animation loops and transformations.

#### Rotation Implementation

In `rotation.ts`, we bring our rotation concepts to life with a clean, functional approach. Let's explore the mathematical concepts and their implementation:

##### Angle Representation

The Angle class handles angle representation and conversion:

```typescript
export class Angle {
    constructor(public degrees: number) {}
    
    toRadians(): number {
        return (this.degrees * Math.PI) / 180;
        }
    }
```

This class ensures consistent angle handling throughout the system, converting degrees to radians for trigonometric calculations.

##### Axis-Specific Rotations

The implementation provides three main rotation functions, each corresponding to an axis:

1. **X-Axis Rotation**
   - Rotation matrix:
   $$
   R_x(\theta) = 
   \begin{pmatrix}
   1 & 0 & 0 \\
   0 & \cos\theta & -\sin\theta \\
   0 & \sin\theta & \cos\theta
   \end{pmatrix}
   $$
   - Implementation:

        ```typescript
        export function rotateX(vector: Vector3, angle: Angle): Vector3 {
            const rad = angle.toRadians();
            const cos = Math.cos(rad);
            const sin = Math.sin(rad);
            return new Vector3(
                vector.x,
                vector.y * cos - vector.z * sin,
                vector.y * sin + vector.z * cos
            )
        }
        ```

2. **Y-Axis Rotation**
   - Rotation matrix:
   $$
   R_y(\theta) = 
   \begin{pmatrix}
   \cos\theta & 0 & \sin\theta \\
   0 & 1 & 0 \\
   -\sin\theta & 0 & \cos\theta
   \end{pmatrix}
   $$
   - Implementation:

        ```typescript
        export function rotateY(vector: Vector3, angle: Angle): Vector3 {
            const rad = angle.toRadians();
            const cos = Math.cos(rad);
            const sin = Math.sin(rad);
            return new Vector3(
                vector.x * cos + vector.z * sin,
                vector.y,
                -vector.x * sin + vector.z * cos
            )
        }
        ```

3. **Z-Axis Rotation**
   - Rotation matrix:
   $$
   R_z(\theta) = 
   \begin{pmatrix}
   \cos\theta & -\sin\theta & 0 \\
   \sin\theta & \cos\theta & 0 \\
   0 & 0 & 1
   \end{pmatrix}
   $$
   - Implementation:

        ```typescript
        export function rotateZ(vector: Vector3, angle: Angle): Vector3 {
            const rad = angle.toRadians();
            const cos = Math.cos(rad);
            const sin = Math.sin(rad);
            return new Vector3(
                vector.x * cos - vector.y * sin,
                vector.x * sin + vector.y * cos,
                vector.z
            )
        }
        ```

##### Key Features

- **Immutability**: Each rotation returns a new Vector3 instance
- **Trigonometric Precision**: Uses Math.cos and Math.sin for accurate rotations
- **Axis Separation**: Clear separation of concerns for each axis
- **Memory Efficiency**: Reuses calculations (cos and sin) for performance
- **Type Safety**: Strong TypeScript typing ensures correct usage

The rotation implementation follows the mathematical principles of rotation matrices while maintaining a clean, functional approach. Each axis rotation is independent, allowing for easy combination of rotations around multiple axes.

#### Projection Implementation

The `projection.ts` file bridges our 3D world with the terminal screen. Let's explore the mathematical concepts and their implementation:

##### Orthographic Projection

Orthographic projection transforms 3D coordinates into 2D screen coordinates while maintaining consistent scaling. Mathematically, it's defined as:

$$
\begin{pmatrix}
x' \\
y' \\
\end{pmatrix}
=
\begin{pmatrix}
x \cdot scale + centerX \\
-y \cdot scale + centerY \\
\end{pmatrix}
$$

The implementation follows this mathematical model:

```typescript
export class Projection {
    constructor(
        public _screenWidth: number = process.stdout.columns,
        public _screenHeight: number = process.stdout.rows,
        public _scale: number = 1,
        public _zOffset?: number
    ) {}
}
```

##### Projection Process

The projection process involves several key steps:

1. **Center Calculation**
   - CenterX = screenWidth / 2
   - CenterY = screenHeight / 2
   
2. **Coordinate Transformation**

   ```typescript
   project3Dto2D(v: Array<Vector3>): Array<Vector2> {
       const centerX = this._screenWidth / 2;
       const centerY = this._screenHeight / 2;

       const projected: Array<Vector2> = [];
       for (const vector of v) {
           const x = centerX + vector.x * this._scale;
           const y = centerY - vector.y * this._scale;
           projected.push(new Vector2(x, y));
       }
       return projected;
   }
   ```

##### Key Features

- **Orthographic Projection**: Maintains consistent scaling regardless of depth
- **Y-Axis Inversion**: Adjusts for terminal coordinate system (top-left origin)
- **Screen Centering**: Automatically centers objects on the screen
- **Scaling Control**: Allows for size adjustment through scale parameter
- **Depth Sorting**: Maintains depth information for proper object ordering

The projection implementation is crucial for our terminal-based renderer as it:
- Transforms 3D coordinates into terminal grid positions
- Maintains proper proportions through consistent scaling
- Handles terminal-specific coordinate systems
- Preserves depth information for proper rendering order

### Code Structure

The math core is designed to be:

- Reusable across different parts of the renderer
- Efficient for real-time calculations
- Easy to extend for new mathematical operations
- Well-documented for easy understanding

Each file focuses on a specific mathematical concept, making the code organized and maintainable.

This implementation forms the foundation of our entire 3D rendering system. Everything else builds upon these mathematical operations to create our final terminal-based 3D renderer.
