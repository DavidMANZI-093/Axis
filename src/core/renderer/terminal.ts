import { Vector2 } from "../math/vector";

export class Terminal {
    constructor() {
        this._clearScreen();
        this._moveCursor(0, 0);
    }

    _moveCursor(x: number, y: number) {
        if (x < 0 || y < 0) {
            throw new Error("Cursor positions must be non-negative.");
        }
        process.stdout.write(`\x1b[${y + 1};${x + 1}H`)
    }

    _clearScreen() {
        process.stdout.write(`\x1b[2J\x1b[H`)
    }

    drawPoints(vertices: Array<Vector2>, char: string = "@") {
        vertices.map((vertex) => {
            this._moveCursor(vertex.x, vertex.y);
            process.stdout.write(char);
        });
    }

}