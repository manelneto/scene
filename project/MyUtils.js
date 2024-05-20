import { CGFappearance, CGFtexture } from '../lib/CGF.js';

export class MyUtils {
    static createMaterial(scene, colour, emission, texturePath) {
        const r = colour[0];
        const g = colour[1];
        const b = colour[2];
        const a = colour[3];
        const texture = new CGFtexture(scene, texturePath);
        const material = new CGFappearance(scene);
        material.setAmbient(r, g, b, a);
        material.setDiffuse(r, g, b, a);
        material.setSpecular(r, g, b, a);
        
        if (emission) {
            material.setEmission(r, g, b, a);
        }
        
        material.setTexture(texture);
        material.setTextureWrap('REPEAT', 'REPEAT');
        return material;
    }

    static generateRandom(min, max) {
        return Math.random() * (max - min) + min;
    }
}
