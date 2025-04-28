import { Vector3 } from "./vector";

/**
 * Angle class to represent angles in degrees.
 */
class Angle {
    /**
     * 
     * @param degrees - the angle in degrees
     */
    constructor(public degrees: number) {}

    /**
     * Converts the angle to radians.
     * @returns the angle in radians
     * @example
     * const angle = new Angle(90);
     * const radians = angle.toRadians(); // radians is 1.5707963267948966
     */
    toRadians(): number {
        return (this.degrees * Math.PI) / 180;
    }
}

/**
 * Rotates a 3D vector around the X axis by a given angle.
 * @param vector - the vector to rotate
 * @param angle - the angle to rotate by
 * @returns a new Vector3 instance representing the rotated vector
 * @example
 * const vector = new Vector3(1, 2, 3);
 * const angle = new Angle(90);
 * const rotatedVector = rotateX(vector, angle); // rotatedVector is Vector3(1, -3, 2)
 */
function rotateX(vector: Vector3, angle: Angle): Vector3 {
    const rad = angle.toRadians();
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    return new Vector3(
        vector.x,
        vector.y * cos - vector.z * sin,
        vector.y * sin + vector.z * cos
    )
}

/**
 * Rotates a 3D vector around the y axis by a given angle.
 * @param vector - the vector to rotate
 * @param angle - the angle to rotate by
 * @returns a new Vector3 instance representing the rotated vector
 * @example
 * const vector = new Vector3(1, 2, 3);
 * const angle = new Angle(90);
 * const rotatedVector = rotateY(vector, angle); // rotatedVector is Vector3(3, 2, -1)
 */
function rotateY(vector: Vector3, angle: Angle): Vector3 {
    const rad = angle.toRadians();
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    return new Vector3(
        vector.x * cos + vector.z * sin,
        vector.y,
        -vector.x * sin + vector.z * cos
    )
}

/**
 * Rotates a 3D vector around the z axis by a given angle.
 * @param vector - the vector to rotate
 * @param angle - the angle to rotate by
 * @returns a new Vector3 instance representing the rotated vector
 * @example
 * const vector = new Vector3(1, 2, 3);
 * const angle = new Angle(90);
 * const rotatedVector = rotateZ(vector, angle); // rotatedVector is Vector3(-2, 1, 3)
 */
function rotateZ(vector: Vector3, angle: Angle): Vector3 {
    const rad = angle.toRadians();
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    return new Vector3(
        vector.x * cos - vector.y * sin,
        vector.x * sin + vector.y * cos,
        vector.z
    )
}