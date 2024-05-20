import { CGFappearance, CGFtexture } from '../lib/CGF.js';

/**
 * MyUtils
 */
export class MyUtils {
    /**
     * Creates a material with a given colour and a given texture.
     * @param scene - CGFScene to bind the material
     * @param colour - [Reg, Gren, Blue, Alpha] components of the color to apply to the material
     * @param emission - True if the material should have emission set, false otherwise
     * @param texturePath - Path where the texture to apply to the material is located
     * @returns the created material
     */
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

    /**
     * Generates a random number between two integers.
     * @param min - Low-end of the valid numbers to generate
     * @param max - High-end of the valid numbers to generate
     * @returns a random number in the interval [min, max[
     */
    static generateRandom(min, max) {
        return Math.random() * (max - min) + min;
    }
}
