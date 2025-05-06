import { Vector2 } from "../math/vector";

/**
 * Enhanced Terminal class for rendering ASCII graphics with frame buffer.
 */
export class Terminal {
  private _width: number;
  private _height: number;
  private _buffer: string[][];
  private _depthBuffer: number[][];
  private _defaultChar: string;

  /**
   * Creates a new Terminal instance.
   * @param width - width of the terminal (default: process.stdout.columns)
   * @param height - height of the terminal (default: process.stdout.rows)
   * @param defaultChar - default character to fill the buffer with (default: space)
   */
  constructor(
    width: number = process.stdout.columns, 
    height: number = process.stdout.rows,
    defaultChar: string = ' '
  ) {
    this._width = width;
    this._height = height;
    this._defaultChar = defaultChar;
    
    // Initializing buffers
    this._buffer = [];
    this._depthBuffer = [];
    
    for (let y = 0; y < height; y++) {
      this._buffer[y] = Array(width).fill(defaultChar);
      this._depthBuffer[y] = Array(width).fill(Infinity);
    }
    
    this._clearScreen();
    this._moveCursor(0, 0);
  }

  /**
   * Moves the cursor to a specific position.
   * @param x - x coordinate
   * @param y - y coordinate
   */
  _moveCursor(x: number, y: number): void {
    process.stdout.write(`\x1b[${y + 1};${x + 1}H`);
  }

  /**
   * Clears the screen and resets the cursor.
   */
  _clearScreen(): void {
    process.stdout.write(`\x1b[2J\x1b[H`);
  }

  /**
   * Clears the frame buffer.
   */
  clearBuffer(): void {
    for (let y = 0; y < this._height; y++) {
      for (let x = 0; x < this._width; x++) {
        this._buffer[y][x] = this._defaultChar;
        this._depthBuffer[y][x] = Infinity;
      }
    }
  }

  /**
   * Draws points on the screen.
   * @param vertices - array of 2D points
   * @param char - character to draw
   * @param zDepth - z-depth for depth buffer (lower values = closer to camera)
   */
  drawPoints(vertices: Vector2[], char: string = "@", zDepth: number = 0): void {
    vertices.forEach(vertex => {
      const x = Math.floor(vertex.x);
      const y = Math.floor(vertex.y);
      
      // Checking if point is within screen bounds
      if (x >= 0 && x < this._width && y >= 0 && y < this._height) {
        // Checking depth buffer to determine if point should be drawn
        if (zDepth < this._depthBuffer[y][x]) {
          this._buffer[y][x] = char;
          this._depthBuffer[y][x] = zDepth;
        }
      }
    });
  }

  /**
   * Draws a line between two points using Bresenham's line algorithm.
   * @param p1 - start point
   * @param p2 - end point
   * @param char - character to draw
   * @param zDepth - z-depth for depth buffer
   */
  drawLine(p1: Vector2, p2: Vector2, char: string = "@", zDepth: number = 0): void {
    const x1 = Math.floor(p1.x);
    const y1 = Math.floor(p1.y);
    const x2 = Math.floor(p2.x);
    const y2 = Math.floor(p2.y);
    
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    const sx = x1 < x2 ? 1 : -1;
    const sy = y1 < y2 ? 1 : -1;
    let err = dx - dy;
    
    let x = x1;
    let y = y1;
    
    while (true) {
      // Checking if point is within screen bounds
      if (x >= 0 && x < this._width && y >= 0 && y < this._height) {
        // Checking depth buffer to determine if point should be drawn
        if (zDepth < this._depthBuffer[y][x]) {
          this._buffer[y][x] = char;
          this._depthBuffer[y][x] = zDepth;
        }
      }
      
      if (x === x2 && y === y2) break;
      
      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x += sx;
      }
      if (e2 < dx) {
        err += dx;
        y += sy;
      }
    }
  }

  /**
   * Draws text at a specific position.
   * @param x - x coordinate
   * @param y - y coordinate
   * @param text - text to draw
   * @param zDepth - z-depth for depth buffer
   */
  drawText(x: number, y: number, text: string, zDepth: number = 0): void {
    for (let i = 0; i < text.length; i++) {
      const posX = x + i;
      
      // Checking if position is within screen bounds
      if (posX >= 0 && posX < this._width && y >= 0 && y < this._height) {
        // Checking depth buffer to determine if character should be drawn
        if (zDepth < this._depthBuffer[y][posX]) {
          this._buffer[y][posX] = text[i];
          this._depthBuffer[y][posX] = zDepth;
        }
      }
    }
  }

  /**
   * Renders the frame buffer to the terminal.
   */
  render(): void {
    // Hiding cursor during rendering
    process.stdout.write('\x1b[?25l');
    
    // Moving cursor to top-left corner
    this._moveCursor(0, 0);
    
    // Rendering each line of the buffer
    for (let y = 0; y < this._height; y++) {
      process.stdout.write(this._buffer[y].join(''));
      
      // Moving to the next line if not the last line
      if (y < this._height - 1) {
        process.stdout.write('\n');
      }
    }
    
    // Showing cursor after rendering
    process.stdout.write('\x1b[?25h');
  }

  /**
   * Gets the width of the terminal.
   * @returns width of the terminal
   */
  getWidth(): number {
    return this._width;
  }

  /**
   * Gets the height of the terminal.
   * @returns height of the terminal
   */
  getHeight(): number {
    return this._height;
  }
}