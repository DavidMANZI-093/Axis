import { Vector3 } from "../math/vector";
import { Angle, rotateX, rotateY, rotateZ } from "../math/rotation";

/**
 * Transformation class for applying multiple transformations to 3D objects.
 */
export class Transformation {
  /**
   * Translates an array of vertices by a given offset.
   * @param vertices - array of vertices to translate
   * @param offset - vector to translate by
   * @returns new array of translated vertices
   */
  static translate(vertices: Vector3[], offset: Vector3): Vector3[] {
    return vertices.map(vertex => vertex.add(offset));
  }

  /**
   * Scales an array of vertices from an origin point.
   * @param vertices - array of vertices to scale
   * @param scale - scale factor to apply
   * @param origin - origin point for scaling (default: 0,0,0)
   * @returns new array of scaled vertices
   */
  static scale(
    vertices: Vector3[], 
    scale: number, 
    origin: Vector3 = new Vector3(0, 0, 0)
  ): Vector3[] {
    return vertices.map(vertex => {
      // Translating to origin, scaling, translating back
      const translated = vertex.subtract(origin);
      const scaled = translated.multiply(scale);
      return scaled.add(origin);
    });
  }

  /**
   * Rotates an array of vertices around all three axes.
   * @param vertices - array of vertices to rotate
   * @param angleX - rotation angle around X axis
   * @param angleY - rotation angle around Y axis
   * @param angleZ - rotation angle around Z axis
   * @param origin - origin point for rotation (default: 0,0,0)
   * @returns new array of rotated vertices
   */
  static rotate(
    vertices: Vector3[],
    angleX?: Angle,
    angleY?: Angle,
    angleZ?: Angle,
    origin: Vector3 = new Vector3(0, 0, 0)
  ): Vector3[] {
    return vertices.map(vertex => {
      // Translating to origin, rotating, translating back
      let rotated = vertex.subtract(origin);
      if(angleX) rotated = rotateX(rotated, angleX);
      if(angleY) rotated = rotateY(rotated, angleY);
      if(angleZ) rotated = rotateZ(rotated, angleZ);
      return rotated.add(origin);
    });
  }
}