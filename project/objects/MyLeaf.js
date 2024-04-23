import { CGFobject } from '../../lib/CGF.js';
import { MyTriangle } from '../geometrics/MyTriangle.js';
import { MyCylinder } from '../geometrics/MyCylinder.js';

/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyLeaf extends CGFobject {
	constructor(scene) {
		super(scene);
        this.cylinder = new MyCylinder(this.scene, 0.08, 1.5);
        this.triangle1 = new MyTriangle(this.scene, 1);
        this.triangle2 = new MyTriangle(this.scene, 1);
	}

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 4, 0, 0, 1);
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1, 1.7, 0);
        this.scene.rotate(-Math.PI / 4, 0, 0, 1);
        this.scene.rotate(Math.PI / 5, 1, 0, 0);
        this.triangle1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1, 1.7, 0);
        this.scene.rotate(-Math.PI / 4, 0, 0, 1);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.triangle2.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.triangle1.enableNormalViz();
        this.triangle2.enableNormalViz();
        this.cylinder.enableNormalViz();
    }

    disableNormalViz() {
        this.triangle1.disableNormalViz();
        this.triangle2.disableNormalViz();
        this.cylinder.disableNormalViz();
    }
}
