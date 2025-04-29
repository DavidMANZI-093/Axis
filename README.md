# Project Axis

## A foreword

As I begin building this project — for the first time pairing it with proper documentation and a blog — I also begin a new chapter of my journey: opening up to the world and sharing my humble experiences in the realm of computer science and programming. My hope is to grow through this process, and maybe, just maybe, enjoy your precious company along the way.

Thank you!

## Axis

This project is an idea inspired by the well known *@Joma* the youtuber where, in parody comedy I suppose, he demonstrates a 3D model of a donut spinning in the terminal. I'll try to build a 3D renderer using Javascript (Layered with Typescript for convenience) and experiemnt with adding some 3D objects in it and try to recreate *@Joma's* idea! Let's jump right into it!

## Genesis

In this section, I’d like to start with a few key details to ensure clarity and consistency as we move forward. We’ll build a conceptual model to help us make sense of the project, sketch out a roadmap to align everything in perfect, and lay out the project directory structure.

And for the record — we’re about to explore some really cool math concepts in this one!

## The Axis Concept

The idea behind this project is intentionally minimal. We’re working with vectors in 3D space, applying some cool math operations like rotation to bring the animation to life, and projection to present everything on a 2D surface — in our case, the terminal. To make it feel more realistic, we’ll also include surface normalization and light vectors, so we can create some nice shading effects and depth.

After diving into the fascinating math behind it all, we’ll explore how each piece is transformed into clean, object-oriented code — where all the components come together to produce the final effect. Now, let’s step into the world of 3D vector space.

### The 3D and 2D Vector Space

Let’s consider a cube. In mathematics, any 3D object like a cube is represented by a set of points called vertices. When these points are connected, we form vectors, or edges, which define the shape of the object. In 3D space specifically, each vertex is defined by coordinates $(x,y,z)$, where:

- $x$ represents left and right,
- $y$ represents up and down,
- $z$ represents depth — in and out of the screen (well... if only our screen could let things pop out for real!).

<figure style='display: flex; flex-direction: column; margin: 2rem 0; gap: 1rem'>
    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Coord_planes_color.svg/800px-Coord_planes_color.svg.png' alt='A representation of a three-dimensional Cartesian coordinate system' style='display: block; margin: 0 auto; height: 16rem; background-color: #fff; border-radius: 0.5rem'>
    <figcaption style='font-style: italic; margin: 0 auto'>A representation of a three-dimensional Cartesian coordinate system</figcaption>
</figure>

Now, in 2D space, things are a bit simpler — and more practical for our terminal-based project. Here, we only work with (x,y) coordinates. That means we lose the depth component, which is where projection comes in... but let’s not get ahead of ourselves just yet.

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
