import { CGFobject } from '../../../lib/CGF.js';
import { MyCircle } from '../../geometrics/MyCircle.js';

/**
 * MyWing
 * @constructor
 * @param scene - Reference to MyScene object
 * @param length - Wing length
 */
export class MyWing extends CGFobject {
	constructor(scene, length) {
		super(scene);

        this.circle = new MyCircle(this.scene, 64, length);
	}

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(0.4, 1, 1);
        this.circle.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.circle.enableNormalViz();
    }

    disableNormalViz() {
        this.circle.disableNormalViz();
    }
}
