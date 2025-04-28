import { Vector3 } from "../math/vector";

/**
 * Object3D class that contains methods to create 3D shapes like cubes and prisms.
 */
export class Object3D {
    /**
     * Creates a cube shape with the given origin and scale.
     * @param origin - the center point of the cube
     * @param scale - the size of the cube
     * @returns an array of Vector3 instances representing the vertices of the cube
     */
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
        ]
    }

    /**
     * Creates a prism shape with the given origin, base, and height.
     * @param origin - the center point of the prism
     * @param base - the base size of the prism
     * @param height - the height of the prism
     * @returns an array of Vector3 instances representing the vertices of the prism
     */
    createPrism(origin: Vector3, base: number, height: number): Array<Vector3> {
        const halfBase = base / 2;
        const halfHeight = height / 2;
        return [
            new Vector3(origin.x - halfBase, origin.y - halfHeight, origin.z),
            new Vector3(origin.x + halfBase, origin.y - halfHeight, origin.z),
            new Vector3(origin.x, origin.y - halfHeight, origin.z - halfBase),

            new Vector3(origin.x - halfBase, origin.y + halfHeight, origin.z),
            new Vector3(origin.x + halfBase, origin.y + halfHeight, origin.z),
            new Vector3(origin.x, origin.y + halfHeight, origin.z - halfBase)
        ]
    }
}