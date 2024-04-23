import { CGFappearance, CGFobject } from '../../lib/CGF.js';
import { MySphere } from '../geometrics/MySphere.js';

/**
 * MyPanorama
 * @constructor
 * @param scene - Reference to MyScene object
 * @param texture - Texture to apply to the sphere
 */
export class MyPanorama extends CGFobject {
    constructor(scene, texture) {
        super(scene);
        this.sphere = new MySphere(scene, 64, 32, true, 200);

        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0, 0, 0, 0);
        this.material.setDiffuse(0, 0, 0, 0);
        this.material.setEmission(1, 1, 1, 1);
        this.material.setShininess(0.0);
        this.material.setSpecular(0, 0, 0, 0);
        this.material.setTexture(texture);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
        this.material.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.sphere.enableNormalViz();
    }

    disableNormalViz() {
        this.sphere.disableNormalViz();
    }
}
