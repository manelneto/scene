import { CGFobject } from '../../../lib/CGF.js';
import { MySphere } from '../../geometrics/MySphere.js';

/**
 * MyAntenna
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyAntenna extends CGFobject {
	constructor(scene) {
		super(scene);

        this.sphere = new MySphere(this.scene, 64, 32, false, 1);
	}

    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.2, 0.2, 0.2);

        this.scene.pushMatrix();
        this.scene.scale(0.11, 1, 0.11);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 1.45, 0.8);
        this.scene.rotate(Math.PI / 3, 1, 0, 0);
        this.scene.scale(0.11, 1, 0.11);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.sphere.enableNormalViz();
    }

    disableNormalViz() {
        this.sphere.disableNormalViz();
    }
}
