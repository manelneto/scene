import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MyLeaf } from './MyLeaf.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyStem } from './MyStem.js';

/**
 * MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 * @param flowerRadius - External radius of the flower
 * @param petalsNumber - Number of petals
 * @param petalsColour - Colour of the petals
 * @param receptacleRadius - Radius of the flower's heart circle
 * @param receptacleColour - Colour of flower heart circle
 * @param stemRadius - Stem cylinder radius
 * @param stemNumber - Number of stem cylinders
 * @param stemColour - Stem colour
 * @param leavesColour - Colour of the leaves
 */
export class MyFlower extends CGFobject {
    constructor(scene, flowerRadius, petalsNumber, petalsColour, receptacleRadius, receptacleColour, stemRadius, stemNumber, leavesColour, minUnionAngle, maxUnionAngle) {
        super(scene);

        this.flowerRadius = flowerRadius;
        this.petalsNumber = petalsNumber;
        this.receptacleRadius = receptacleRadius;

        // TODO: colours
        this.petalsColour = petalsColour;
        this.receptacleColour = receptacleColour;
        this.leavesColour = leavesColour;
        this.unionAngle = Math.PI/4;//this.generateRandom(minUnionAngle, maxUnionAngle);

        let stemHeight;
        this.stems = [];
        this.stemHeights = [];
        for (let i = 0; i < stemNumber; i++) {
            stemHeight = Math.floor(this.generateRandom(1, 10));
            this.stems.push(new MyStem(this.scene, stemRadius, stemHeight));
            this.stemHeights.push(stemHeight);
        }

        this.receptacle = new MyReceptacle(this.scene, receptacleRadius);
        
        this.petalLength = flowerRadius - receptacleRadius;
        let petalAngle = Math.PI/4;
        this.petals = [];
        for (let i = 0; i < petalsNumber; i++) {
            this.petals.push(new MyPetal(this.scene, this.petalLength, petalAngle));
        }

        this.petalTexture = this.generateRandom(1, 2);

        this.leaf = new MyLeaf(this.scene);

        let petal1Texture = new CGFtexture(this.scene, 'images/petal.png')
        this.petal1Material = new CGFappearance(this.scene);
        this.petal1Material.setAmbient(0.9, 0.9, 0.9, 1.0);
        this.petal1Material.setDiffuse(0.9, 0.9, 0.9, 1.0);
        this.petal1Material.setEmission(0, 0, 0, 0);
        this.petal1Material.setShininess(10.0);
        this.petal1Material.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.petal1Material.setTexture(petal1Texture);
        this.petal1Material.setTextureWrap('REPEAT', 'REPEAT');

        let petal2Texture = new CGFtexture(this.scene, 'images/petal2.gif')
        this.petal2Material = new CGFappearance(this.scene);
        this.petal2Material.setAmbient(1.0, 0.8, 0.6, 1.0);
        this.petal2Material.setDiffuse(1.0, 0.8, 0.6, 1.0);
        this.petal2Material.setEmission(0, 0, 0, 0);
        this.petal2Material.setShininess(10.0);
        this.petal2Material.setSpecular(1.0, 0.8, 0.6, 1.0);
        this.petal2Material.setTexture(petal2Texture);
        this.petal2Material.setTextureWrap('REPEAT', 'REPEAT');

        let stemTexture = new CGFtexture(this.scene, 'images/stem.jpg')
        this.stemMaterial = new CGFappearance(this.scene);
        this.stemMaterial.setAmbient(0.45, 0.75, 0.2, 1.0);
        this.stemMaterial.setDiffuse(0.45, 0.75, 0.2, 1.0);
        this.stemMaterial.setEmission(0, 0, 0, 0);
        this.stemMaterial.setShininess(10.0);
        this.stemMaterial.setSpecular(0.45, 0.75, 0.2, 1.0);
        this.stemMaterial.setTexture(stemTexture);
        this.stemMaterial.setTextureWrap('REPEAT', 'REPEAT');

        let receptacleTexture = new CGFtexture(this.scene, 'images/receptacle.jpg')
        this.receptacleMaterial = new CGFappearance(this.scene);
        this.receptacleMaterial.setAmbient(1, 0.9, 0.2, 1.0);
        this.receptacleMaterial.setDiffuse(1, 0.9, 0.2, 1.0);
        this.receptacleMaterial.setEmission(0, 0, 0, 0);
        this.receptacleMaterial.setShininess(10.0);
        this.receptacleMaterial.setSpecular(1, 0.9, 0.2, 1.0);
        this.receptacleMaterial.setTexture(receptacleTexture);
        this.receptacleMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        let stem;
        this.stemMaterial.apply();
        this.stems[0].display();
        let totalStemHeight = this.stemHeights[0];
        for (let i = 1; i < this.stems.length; i++) {
            stem = this.stems[i];
            
            this.scene.pushMatrix();

            this.scene.translate(0, totalStemHeight, 0); 
            stem.display();
            this.leaf.display();

            this.scene.popMatrix();

            totalStemHeight += this.stemHeights[i];
        }

        this.scene.pushMatrix();

        this.receptacleMaterial.apply();
        this.scene.translate(0, totalStemHeight + this.receptacleRadius, 0);
        this.scene.scale(1, 1, 0.5);
        this.receptacle.display();

        this.scene.popMatrix();

        const angle = (2 * Math.PI) / this.petalsNumber;
        
        this.petalTexture > 1.5 ? this.petal1Material.apply() : this.petal2Material.apply();
        let petal;
        for (let i = 0; i < this.petalsNumber; i++) {
            petal = this.petals[i];

            this.scene.pushMatrix();
            this.scene.translate(0, totalStemHeight + this.receptacleRadius, 0);
            this.scene.rotate(angle * i, 0, 0, 1);
            this.scene.translate(this.receptacleRadius, 0, 0);
            this.scene.rotate(-this.unionAngle, 0, 1, 0);
            this.scene.rotate(Math.PI/2, 0, 0, 1);
            this.scene.translate(-0.5, -this.petalLength/2, 0);
            petal.display();

            this.scene.popMatrix();
        }
    }

    enableNormalViz() {
        this.petals.forEach((petal) => petal.enableNormalViz());
        this.receptacle.enableNormalViz();
        this.stems.forEach((stem) => stem.enableNormalViz());
    }

    disableNormalViz() {
        this.petals.forEach((petal) => petal.disableNormalViz());
        this.receptacle.disableNormalViz();
        this.stems.forEach((stem) => stem.disableNormalViz());
    }

    generateRandom(min, max) {
        return Math.random() * (max - min) + min;
    }
}
