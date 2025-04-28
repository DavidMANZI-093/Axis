/**
 * Vector3 class representing a 3D vector with basic operations.
 * @class Vector3
 */
class Vector3 {
    /**
     * 
     * @param x - the x-coordinate of the vector
     * @param y - the y-coordinate of the vector
     * @param z - the z-coordinate of the vector
     */
    constructor(public x: number, public y: number, public z: number) {}

    /**
     * Adds another vector to this vector.
     * @param v - the vector to add
     * @returns a new Vector3 instance representing the sum
     * @example
     * const v1 = new Vector3(1, 2, 3);
     * const v2 = new Vector3(4, 5, 6);
     * const result = v1.add(v2); // result is Vector3(5, 7, 9)
     */
    add(v: Vector3): Vector3 {
        return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    /**
     * Subtracts another vector to this vector.
     * @param v - the vector to subtract
     * @returns a new Vector3 instance representing the difference
     * @example
     * const v1 = new Vector3(4, 5, 6);
     * const v2 = new Vector3(2, 6, 1);
     * const result = v1.subtract(v2); // result is Vector3(2, -1, 5)
     */
    subtract(v: Vector3): Vector3 {
        return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    /**
     * Multiplies this vector by a scalar.
     * @param Scalar - the scalar to multiply by
     * @returns a new Vector3 instance representing the product
     * @example
     * const v = new Vector3(1, 2, 3);
     * const result = v.multiply(2); // result is Vector3(2, 4, 6)
     */
    multiply(Scalar: number): Vector3 {
        return new Vector3(this.x * Scalar, this.y * Scalar, this.z * Scalar);
    }
}