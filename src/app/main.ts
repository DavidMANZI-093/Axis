import { Vector3 } from '../core/math/vector';
import { Object3D } from '../core/object3d/shape';
import readline from 'readline';
import { Terminal } from '../core/renderer/terminal';

const terminal = new Terminal;
const object3D = new Object3D;

terminal.drawPoints(object3D.createCube(new Vector3(1, 3, 5), 5), "*");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
  
rl.question("Press Enter to exit...", () => {
    rl.close();
});