/**
 * Timer class for controlling animation frame rates.
 */
export class Timer {
    private _lastFrameTime: number;
    private _frameCount: number;
    private _fpsUpdateInterval: number;
    private _lastFpsUpdateTime: number;
    private _currentFps: number;
    private _targetFps: number;
    private _running: boolean;
    private _callback: () => void;
  
    /**
     * Creates a new Timer instance.
     * @param targetFps - target frames per second
     * @param callback - function to call on each frame
     */
    constructor(targetFps: number, callback: () => void) {
      this._lastFrameTime = Date.now();
      this._frameCount = 0;
      this._fpsUpdateInterval = 1000; // Update FPS every second
      this._lastFpsUpdateTime = Date.now();
      this._currentFps = 0;
      this._targetFps = targetFps;
      this._running = false;
      this._callback = callback;
    }
  
    /**
     * Starts the animation loop.
     */
    start(): void {
      if (this._running) return;
      
      this._running = true;
      this._lastFrameTime = Date.now();
      this._frameCount = 0;
      this._lastFpsUpdateTime = Date.now();
      this._animationLoop();
    }
  
    /**
     * Stops the animation loop.
     */
    stop(): void {
      this._running = false;
    }
  
    /**
     * Main animation loop that calls the callback function at the target FPS.
     */
    private _animationLoop(): void {
      if (!this._running) return;
      
      const now = Date.now();
      const elapsed = now - this._lastFrameTime;
      const frameTime = 1000 / this._targetFps;
      
      if (elapsed >= frameTime) {
        // Update frame counter
        this._frameCount++;
        this._lastFrameTime = now;
        
        // Execute the callback
        this._callback();
        
        // Update FPS calculation
        if (now - this._lastFpsUpdateTime >= this._fpsUpdateInterval) {
          this._currentFps = 
            (this._frameCount * 1000) / (now - this._lastFpsUpdateTime);
          this._lastFpsUpdateTime = now;
          this._frameCount = 0;
        }
      }
      
      // Schedule next frame
      setTimeout(() => this._animationLoop(), 1);
    }
  
    /**
     * Gets the current FPS.
     * @returns current frames per second
     */
    getCurrentFps(): number {
      return this._currentFps;
    }
  
    /**
     * Checks if the timer is running.
     * @returns true if the timer is running, false otherwise
     */
    isRunning(): boolean {
      return this._running;
    }
  }