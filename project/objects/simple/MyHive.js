import { CGFobject, CGFappearance, CGFtexture } from '../../../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
import { MyCircle } from './MyCircle.js';

/**
 * MyHive
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - Cylinder radius
 * @param height - Cylinder height
 */
export class MyHive extends CGFobject {
	constructor(scene) {
		super(scene);

		this.cylinder = new MyCylinder(scene, 1, 4);
		this.circle = new MyCircle(scene, 32, 1.5);

		const texture = new CGFtexture(this.scene, 'images/hive.png');
        this.material = new CGFappearance(this.scene);
		this.material.setAmbient(0.76, 0.6, 0.42, 1.0);
		this.material.setDiffuse(0.54, 0.27, 0.07, 1.0);
		this.material.setEmission(0, 0, 0, 0);
		this.material.setShininess(10.0);
		this.material.setSpecular(0.3, 0.15, 0.05, 1.0);
		this.material.setTexture(texture);

	}

	display() {
        this.material.apply();
        this.scene.pushMatrix();
        super.display();
        this.scene.popMatrix();
    }
}
