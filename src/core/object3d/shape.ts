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
     * Gets the face definitions for a cube.
     * Each triplet of numbers represents the indices of vertices that form a triangular face.
     * @returns an array of triangle face definitions
     */
    getCubeFaces(): Array<number[]> {
        return [
            // Front face
            [0, 1, 2], [1, 3, 2],
            // Back face
            [4, 6, 5], [5, 6, 7],
            // Left face
            [0, 2, 4], [2, 6, 4],
            // Right face
            [1, 5, 3], [3, 5, 7],
            // Top face
            [2, 3, 6], [3, 7, 6],
            // Bottom face
            [0, 4, 1], [1, 4, 5]
        ];
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
            new Vector3(origin.x - halfBase, origin.y - halfHeight / 1.5, origin.z),
            new Vector3(origin.x + halfBase, origin.y - halfHeight / 1.5, origin.z),
            new Vector3(origin.x + halfBase, origin.y + halfHeight / 1.5, origin.z),
            new Vector3(origin.x - halfBase, origin.y + halfHeight / 1.5, origin.z),
            
            new Vector3(origin.x, origin.y, origin.z - halfBase * 2),
        ]
    }

    /**
     * Gets the face definitions for a prism.
     * Each triplet of numbers represents the indices of vertices that form a triangular face.
     * @returns an array of triangle face definitions
     */
    getPrismFaces(): Array<number[]> {
        return [
            // Base
            [0, 1, 2], [0, 2, 3],
            // Side faces
            [0, 4, 1],
            [1, 4, 2],
            [2, 4, 3],
            [3, 4, 0]
        ];
    }
}