import { CGFobject } from '../../../lib/CGF.js';
import { MySphere } from '../../geometrics/MySphere.js';

/**
 * MyAntennae
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyAntennae extends CGFobject {
	constructor(scene) {
		super(scene);

        this.part1 = new MySphere(this.scene, 64, 32, false, 0.5);
        this.part2 = new MySphere(this.scene, 64, 32, false, 0.3);
	}

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 6, 1, 0, 0);
        this.scene.scale(0.4, 0.8, 0.3);
        this.eye.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.eye.enableNormalViz();
    }

    disableNormalViz() {
        this.eye.disableNormalViz();
    }
}
