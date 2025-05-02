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



## Axis Directory Tree

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
