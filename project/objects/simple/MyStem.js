import { CGFobject } from '../../../lib/CGF.js';
import { MyCylinder } from '../../geometrics/MyCylinder.js';

/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - Stem radius
 * @param height - Stem height
 */
export class MyStem extends CGFobject {
	constructor(scene, radius, height) {
		super(scene);
		
        this.cylinder = new MyCylinder(this.scene, radius, height);
	}

    display() {
        this.cylinder.display();
    }

    enableNormalViz() {
        this.cylinder.enableNormalViz();
    }

    disableNormalViz() {
        this.cylinder.disableNormalViz();
    }
}
