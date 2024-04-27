import { CGFobject } from '../../../lib/CGF.js';
import { MySphere } from '../../geometrics/MySphere.js';

/**
 * MyWing
 * @constructor
 * @param scene - Reference to MyScene object
 * @param length - Wing length
 */
export class MyWing extends CGFobject {
	constructor(scene, length) {
		super(scene);

        this.sphere = new MySphere(this.scene, 64, 32, false, length);
	}

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(0.4, 0.1, 1);
        this.sphere.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.sphere.enableNormalViz();
    }

    disableNormalViz() {
        this.sphere.disableNormalViz();
    }
}
