import { CGFobject } from '../../../lib/CGF.js';
import { MyCylinder } from '../../geometrics/MyCylinder.js';
import { MyTriangle } from '../../geometrics/MyTriangle.js';

/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyLeaf extends CGFobject {
	constructor(scene) {
		super(scene);
        
        this.radius = 0.08;
        this.cylinderHeight = 1;
        this.width = 1;
        this.triangleHeight = 1;

        this.cylinder = new MyCylinder(this.scene, this.radius, this.cylinderHeight);
        this.triangle1 = new MyTriangle(this.scene, this.width, this.triangleHeight);
        this.triangle2 = new MyTriangle(this.scene, this.width, this.triangleHeight);
	}

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 4, 0, 0, 1);
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate((this.cylinderHeight + this.triangleHeight) * Math.SQRT1_2 - 0.1, (this.cylinderHeight + this.triangleHeight) * Math.SQRT1_2 - 0.1, 0);
        this.scene.rotate(-Math.PI / 4, 0, 0, 1);
        this.scene.translate(- this.width / 2, 0, 0);
        this.scene.rotate(Math.PI / 5, 1, 0, 0);
        this.triangle1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(Math.SQRT1_2 - 0.1, Math.SQRT1_2 - 0.1, 0);
        this.scene.rotate(-Math.PI / 4, 0, 0, 1);
        this.scene.translate(- this.width / 2, this.triangleHeight, 0);
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
