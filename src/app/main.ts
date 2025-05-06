import { Vector3, Vector2 } from '../core/math/vector';
import { Object3D } from '../core/object3d/shape';
import { Terminal } from '../core/renderer/terminal';
import { Projection } from '../core/math/projection';
import { Angle } from '../core/math/rotation';
import { Transformation } from '../core/object3d/transformation';
import { Settings } from './settings';
import { Timer } from '../utils/timer';
import { Logger, LogLevel } from '../utils/logger';
import { Shading } from '../core/renderer/shading';
import * as readline from 'readline';

/**
 * Main class for the 3D terminal animation.
 */
class Main {
  // Class variables
  private _terminal: Terminal;
  private _object3D: Object3D;
  private _projector: Projection;
  private _shading: Shading;
  private _logger: Logger;
  private _timer: Timer;

  // Animation variables
  private _rotationX: number = 0;
  private _rotationY: number = 0;
  private _rotationZ: number = 20; // Offets from 20
  private _currentShape: string = 'cube';
  private _vertices: Vector3[];
  
  // Shape definitions
  private _shapes: { [key: string]: () => Vector3[] };
  
  /**
   * Creates a new Main instance.
   */
  constructor() {
    // Initializing components
    this._terminal = new Terminal();
    this._object3D = new Object3D();
    this._projector = new Projection(
      this._terminal.getWidth(),
      this._terminal.getHeight()
    );
    this._shading = new Shading();
    this._logger = new Logger(true, LogLevel.INFO);
    
    // Defining available shapes
    this._shapes = {
      cube: () => this._object3D.createCube(new Vector3(0, 0, 0), Settings.OBJECT_SCALE),
      prism: () => this._object3D.createPrism(new Vector3(0, 0, 0), Settings.OBJECT_SCALE + 4, Settings.OBJECT_SCALE + 4),
    };
    
    // Creating the initial 3D object
    this._vertices = this._shapes[this._currentShape]();
    
    // Initializing animation timer
    this._timer = new Timer(Settings.FPS, this._update.bind(this));
    
    this._logger.info("3D Terminal Animation initialized");
  }

  /**
   * Starts the animation.
   */
  start(): void {
    this._logger.info("Starting animation");
    this._setupControls();
    this._timer.start();
  }

  /**
   * Sets up keyboard controls.
   */
  private _setupControls(): void {
    // Setting stdin to raw mode to capture keystrokes
    readline.emitKeypressEvents(process.stdin);
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
    }

    process.stdin.on('keypress', (str, key) => {
      if (key.ctrl && key.name === 'c') {
        this._logger.info("Exiting application");
        process.exit();
      }

      switch (key.name) {
        case 'x':
          this._rotationX += Settings.ANIMATION_SPEED;
          this._logger.debug(`Rotation X: ${this._rotationX}`);
          break;
        case 'y':
          this._rotationY += Settings.ANIMATION_SPEED;
          this._logger.debug(`Rotation Y: ${this._rotationY}`);
          break;
        case 'z':
          this._rotationZ += Settings.ANIMATION_SPEED;
          this._logger.debug(`Rotation Z: ${this._rotationZ}`);
          break;
        case 'r':
          this._rotationX = 0;
          this._rotationY = 0;
          this._rotationZ = 0;
          this._logger.info("Reset rotation");
          break;
        case 's':
          this._cycleShape();
          this._logger.info(`Switched to shape: ${this._currentShape}`);
          break;
        case 'q':
          this._logger.info("Exiting application");
          process.exit();
          break;
      }
    });

    this._logger.info("Controls: X/Y/Z - rotate, R - reset, S - switch shape, Q - quit");
  }

  /**
   * Cycles through available shapes.
   */
  private _cycleShape(): void {
    const shapes = Object.keys(this._shapes);
    const currentIndex = shapes.indexOf(this._currentShape);
    const nextIndex = (currentIndex + 1) % shapes.length;
    this._currentShape = shapes[nextIndex];
    this._vertices = this._shapes[this._currentShape]();
  }

  /**
   * Updates and renders a single animation frame.
   */
  private _update(): void {
    try {
      // Clearing the buffer for the next frame
      this._terminal.clearBuffer();
      
      // Auto-rotating the object
      this._rotationX += Settings.ANIMATION_SPEED / 2;
      this._rotationY += Settings.ANIMATION_SPEED / 4;
      
      // Applying rotation to vertices
      const rotatedVertices = Transformation.rotate(
        this._vertices,
        new Angle(this._rotationX),
        new Angle(this._rotationY),
        new Angle(this._rotationZ)
      );
      
      // Moving the object away from the camera for better visibility
      const translatedVertices = Transformation.translate(
        rotatedVertices,
        new Vector3(0, 0, Settings.RENDER_DISTANCE)
      );
      
      // Projecting 3D vertices to 2D
      const projectedVertices = this._projector.project3Dto2D(translatedVertices);
      
      // Getting current shape faces
      const faces = this._currentShape === 'cube' ? this._object3D.getCubeFaces() : this._object3D.getPrismFaces();
      
      // Rendering each face with appropriate shading
      this._renderFaces(translatedVertices, projectedVertices, faces);
      
      // Rendering info text
      this._terminal.drawText(1, 1, `Shape: ${this._currentShape}`, 0);
      this._terminal.drawText(1, 2, `FPS: ${this._timer.getCurrentFps().toFixed(1)}`, 0);
      this._terminal.drawText(1, 3, `Rotation: X=${this._rotationX.toFixed(1)} Y=${this._rotationY.toFixed(1)} Z=${this._rotationZ.toFixed(1)}`, 0);
      
      // Render the frame
      this._terminal.render();
    } catch (error) {
      this._logger.error(`Error in update: ${error}`);
    }
  }

  /**
   * Renders the faces of the 3D object with shading.
   * @param vertices3D - 3D vertices after transformation
   * @param vertices2D - 2D projected vertices
   * @param faces - faces definition (triangle indices)
   */
  private _renderFaces(vertices3D: Vector3[], vertices2D: Vector2[], faces: number[][]): void {
    for (const face of faces) {
      // Getting the vertices for this face
      const v1 = vertices3D[face[0]];
      const v2 = vertices3D[face[1]];
      const v3 = vertices3D[face[2]];
      
      // Calculating face normal for lighting
      const normal = this._shading.calculateNormal(v1, v2, v3);
      
      // Calculating average face position (for depth and lighting)
      const faceCenter = new Vector3(
        (v1.x + v2.x + v3.x) / 3,
        (v1.y + v2.y + v3.y) / 3,
        (v1.z + v2.z + v3.z) / 3
      );
      
      // Checking if face is facing towards the camera (back-face culling)
      if (faceCenter.z > 0) {
        // Calculating light intensity and getting appropriate ASCII character
        const intensity = this._shading.calculateLightIntensity(faceCenter, normal);
        const shadeChar = this._shading.getShadeChar(intensity);
        
        // Drawing the triangle edges
        this._terminal.drawLine(vertices2D[face[0]], vertices2D[face[1]], shadeChar, faceCenter.z);
        this._terminal.drawLine(vertices2D[face[1]], vertices2D[face[2]], shadeChar, faceCenter.z);
        this._terminal.drawLine(vertices2D[face[2]], vertices2D[face[0]], shadeChar, faceCenter.z);
      }
    }
  }
}

// Creating and starting the application
const app = new Main();
app.start();