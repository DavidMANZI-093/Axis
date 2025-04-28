import { Vector3 } from '../core/math/vector';
import { Object3D } from '../core/object3d/shape';
import { Terminal } from '../core/renderer/terminal';

const terminal = new Terminal;
const object3D = new Object3D;

terminal.drawPoints(object3D.createCube(new Vector3(10, 10, 10), 1), "*");