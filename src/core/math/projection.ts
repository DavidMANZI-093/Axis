import { Vector2, Vector3 } from "./vector";

/**
 * Projection class for converting 3D coordinates to 2D screen coordinates.
 */
export class Projection {
    /**
     * 
     * @param _screenWidth - the width of the screen
     * @param _screenHeight - the height of the screen
     * @param _fov - the field of view for projection
     * @param _distanceOffset - the distance offset for projection
     */
    constructor(
        public _screenWidth: number = process.stdout.columns,
        public _screenHeight: number = process.stdout.rows,
        public _fov: number = 40,
        public _distanceOffset: number = 1,
    ) {}

    /**
     * Projects an array of 3D vertices to 2D screen coordinates.
     * @param v - the 3D vector to project
     * @returns a new Vector2 instance representing the projected 2D coordinates
     */
    project3Dto2D(v: Array<Vector3>): Array<Vector2> {
        const centerX = this._screenWidth / 2;
        const centerY = this._screenHeight / 2;

        const projected: Array<Vector2> = [];
        for (const vector of v) {
            const scale = this._fov / (this._distanceOffset + vector.z);
            const x = centerX + vector.x * scale;
            const y = centerY - vector.y * scale; // Invert Y axis for screen coordinates
            projected.push(new Vector2(x, y));
        }
        return projected;
    }
}