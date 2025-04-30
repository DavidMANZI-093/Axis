import { Vector2, Vector3 } from "./vector";

/**
 * Projection class for converting 3D coordinates to 2D screen coordinates.
 * Now uses orthographic projection instead of perspective projection.
 */
export class Projection {
    /**
     * 
     * @param _screenWidth - the width of the screen
     * @param _screenHeight - the height of the screen
     * @param _scale - the scaling factor for the orthographic projection
     * @param _zOffset - optional z-offset for depth sorting (not affecting projection)
     */
    constructor(
        public _screenWidth: number = process.stdout.columns,
        public _screenHeight: number = process.stdout.rows,
        public _scale: number = 1,
        public _zOffset: number = 5,
    ) {}

    /**
     * Projects an array of 3D vertices to 2D screen coordinates using orthographic projection.
     * In orthographic projection, the z-coordinate doesn't affect the scale of the object.
     * 
     * @param v - the array of 3D vectors to project
     * @returns an array of Vector2 instances representing the projected 2D coordinates
     */
    project3Dto2D(v: Array<Vector3>): Array<Vector2> {
        const centerX = this._screenWidth / 2;
        const centerY = this._screenHeight / 2;

        const projected: Array<Vector2> = [];
        for (const vector of v) {
            // In orthographic projection, z-coordinate doesn't affect x and y scaling
            const x = centerX + vector.x * this._scale;
            const y = centerY - vector.y * this._scale; // Invert Y axis for screen coordinates
            projected.push(new Vector2(x, y));
        }
        return projected;
    }
}