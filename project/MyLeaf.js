import {CGFobject} from '../lib/CGF.js';
import { MyTriangle } from './MyTriangle.js';
import { MyCylinder } from './MyCylinder.js';

/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyLeaf extends CGFobject {
	constructor(scene) {
		super(scene);

        this.myCylinder = new MyCylinder(this.scene, 64, 32, 0.1, 0.1);
		
        this.myTriangle1 = new MyTriangle(this.scene, 1);
        this.myTriangle2 = new MyTriangle(this.scene, 1);
	}

    display() {

        this.scene.pushMatrix();
        this.myCylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 4, 0, 0, 1);
        this.myTriangle1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 4, 0, 0, 1);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.myTriangle2.display();
        this.scene.popMatrix();
        
    }

    enableNormalViz() {
        this.myTriangle1.enableNormalViz();
        this.myTriangle2.enableNormalViz();
        this.myCylinder.enableNormalViz();
    }

    disableNormalViz() {
        this.myTriangle1.disableNormalViz();
        this.myTriangle2.disableNormalViz();
        this.myCylinder.disableNormalViz();
    }
}

