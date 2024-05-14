import { CGFobject, CGFappearance, CGFtexture } from '../../../lib/CGF.js';
import { MyCircle } from '../../geometrics/MyCircle.js';
import { MyCylinder } from '../../geometrics/MyCylinder.js';
import { MyCube } from '../../geometrics/MyCube.js';

/**
 * MyHive
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyHive extends CGFobject {
	constructor(scene) {
		super(scene);

		this.trunk = new MyCylinder(scene, 1, 3, this.woodMaterial, false);
		this.cover = new MyCircle(scene, 64, 1);
		this.entrance = new MyCube(scene);

		this.trunkMaterial = this.createMaterial([0.76, 0.6, 0.42, 1.0], 'images/trunk.png');
		this.woodMaterial = this.createMaterial([0.64, 0.47, 0.47, 1.0], 'images/wood.png');
	}

	display() {
        this.trunkMaterial.apply();
        
		this.trunk.display();

		this.scene.pushMatrix();
		this.scene.translate(0, 3, 0);
		this.scene.scale(1.3, 0.1, 1.3);
		this.trunk.display();
		this.scene.popMatrix();

		this.woodMaterial.apply();

		this.cover.display();

		this.scene.pushMatrix();
		this.scene.translate(0, 0.3, 0);

		this.scene.pushMatrix();
		this.scene.translate(0, 3, 0);
		this.scene.scale(1.3, 1, 1.3);
		this.cover.display();
		this.cover.display();
		this.scene.popMatrix();
		
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0, 1.5, 0.8);
		this.scene.scale(1, 0.2, 0.5);
		this.entrance.display();
		this.scene.popMatrix();
    }

	createMaterial(colour, texturePath) {
        let r = colour[0];
        let g = colour[1];
        let b = colour[2];
        let alpha = colour[3];
        let texture = new CGFtexture(this.scene, texturePath);
        let material = new CGFappearance(this.scene);
        material.setAmbient(r, g, b, alpha);
        material.setDiffuse(r, g, b, alpha);
        material.setSpecular(r, g, b, alpha);
        material.setEmission(r, g, b, alpha);
        material.setTexture(texture);
        material.setTextureWrap('REPEAT', 'REPEAT');
        return material;
    }
}
