import {CGFobject} from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';

/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyStem extends CGFobject {
	constructor(scene, radius, height) {
		super(scene);

        this.radius = radius;
        this.height = height;
		
        this.myCylinder = new MyCylinder(this.scene, 64, 32, radius, height);
	}

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.myCylinder.display();
        this.scene.popMatrix();
    }
}

