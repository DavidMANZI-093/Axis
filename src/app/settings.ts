/**
 * Settings for the 3D terminal animation.
 */
export class Settings {
  // Animation settings
  static readonly FPS: number = 30;
  static readonly ANIMATION_SPEED: number = 10; // Degrees per frame

  // Render settings
  static readonly RENDER_DISTANCE: number = 100;
  static readonly OBJECT_SCALE: number = 20;

  // Light source settings
  static readonly LIGHT_POSITION = { x: 0, y: 0, z: -50 };
  static readonly AMBIENT_LIGHT: number = 0.2; // Base light level (0-1)

  // ASCII shading settings
  static readonly SHADING_CHARACTERS: string = " .:-=+*#%@"; // From darkest to brightest
}
