import { CGFobject } from '../../../lib/CGF.js';
import { MyTriangle } from '../../geometrics/MyTriangle.js';

/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 * @param length - Petal length
 * @param angle - Petal rotation angle
 */
export class MyPetal extends CGFobject {
	constructor(scene, length, angle) {
		super(scene);

        this.angle = angle;
		
        this.triangle = new MyTriangle(this.scene, 1, length/2);
	}

    display() {
        this.scene.pushMatrix();
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI - this.angle, 1, 0, 0);
        this.triangle.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.triangle.enableNormalViz();
    }

    disableNormalViz() {
        this.triangle.disableNormalViz();
    }
}
