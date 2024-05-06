import { CGFobject } from '../../../lib/CGF.js';
import { MySphere } from '../../geometrics/MySphere.js';

/**
 * MyLeg
 * @constructor
 * @param scene - Reference to MyScene object
 * @param length - Leg length
 */
export class MyLeg extends CGFobject {
	constructor(scene, length) {
		super(scene);

        this.length = length;

        this.lowerSphere = new MySphere(this.scene, 64, 32, false, 1);
        this.upperSphere = new MySphere(this.scene, 64, 32, false, 1);
	}

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0.09, 0.03, 0);
        this.scene.rotate(Math.PI/7, 0, 0, 1);
        this.scene.scale(0.03, this.length/2, 0.03);
        this.lowerSphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.4, 0);
        this.scene.scale(0.03, this.length/2, 0.03);
        this.upperSphere.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.lowerSphere.enableNormalViz();
        this.upperSphere.enableNormalViz();
    }

    disableNormalViz() {
        this.lowerSphere.disableNormalViz();
        this.upperSphere.disableNormalViz();
    }
}
