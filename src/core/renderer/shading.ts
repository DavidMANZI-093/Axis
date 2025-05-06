import { Vector3 } from "../math/vector";
import { Settings } from "../../app/settings";

/**
 * Shading class for calculating light intensity and mapping to ASCII characters.
 */
export class Shading {
  private readonly _shadingChars: string;
  private readonly _lightPosition: Vector3;
  private readonly _ambientLight: number;

  /**
   * Creates a new Shading instance.
   * @param shadingChars - characters to use for shading (from darkest to brightest)
   * @param lightPosition - position of the light source
   * @param ambientLight - ambient light level (0-1)
   */
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

  /**
   * Calculates the normal vector of a triangle face.
   * @param v1 - first vertex of the triangle
   * @param v2 - second vertex of the triangle
   * @param v3 - third vertex of the triangle
   * @returns the normal vector of the triangle face
   */
  calculateNormal(v1: Vector3, v2: Vector3, v3: Vector3): Vector3 {
    // Calculating two edges of the triangle
    const edge1 = v2.subtract(v1);
    const edge2 = v3.subtract(v1);
    
    // Calculating cross product of the two edges
    const normal = new Vector3(
      edge1.y * edge2.z - edge1.z * edge2.y,
      edge1.z * edge2.x - edge1.x * edge2.z,
      edge1.x * edge2.y - edge1.y * edge2.x
    );
    
    // Normalizing the normal vector
    const length = Math.sqrt(
      normal.x * normal.x + normal.y * normal.y + normal.z * normal.z
    );
    
    if (length === 0) {
      return new Vector3(0, 0, 0);
    }
    
    return new Vector3(
      normal.x / length,
      normal.y / length,
      normal.z / length
    );
  }

  /**
   * Calculates the light intensity at a given point with a given normal.
   * @param point - point to calculate light intensity at
   * @param normal - normal vector at the point
   * @returns light intensity (0-1)
   */
  calculateLightIntensity(point: Vector3, normal: Vector3): number {
    // Calculating direction from point to light
    const lightDir = this._lightPosition.subtract(point);
    
    // Normalizing the light direction vector
    const lightDirLength = Math.sqrt(
      lightDir.x * lightDir.x + lightDir.y * lightDir.y + lightDir.z * lightDir.z
    );
    
    if (lightDirLength === 0) {
      return this._ambientLight;
    }
    
    const normalizedLightDir = new Vector3(
      lightDir.x / lightDirLength,
      lightDir.y / lightDirLength,
      lightDir.z / lightDirLength
    );
    
    // Calculating dot product of normal and light direction
    const dotProduct = 
      normal.x * normalizedLightDir.x + 
      normal.y * normalizedLightDir.y + 
      normal.z * normalizedLightDir.z;
    
    // Calculating light intensity (dot product + ambient light)
    let intensity = Math.max(0, dotProduct) + this._ambientLight;
    
    // Clamping intensity to [0, 1]
    intensity = Math.min(1, Math.max(0, intensity));
    
    return intensity;
  }

  /**
   * Maps a light intensity value to an ASCII character.
   * @param intensity - light intensity (0-1)
   * @returns ASCII character representing the light intensity
   */
  getShadeChar(intensity: number): string {
    const index = Math.floor(intensity * (this._shadingChars.length - 1));
    return this._shadingChars[index];
  }
}