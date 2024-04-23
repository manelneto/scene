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
        this.unionAngle = this.generateRandom(minUnionAngle, maxUnionAngle);

        let stemHeight;
        this.stems = [];
        this.stemHeights = [];
        for (let i = 0; i < stemNumber; i++) {
            stemHeight = Math.floor(this.generateRandom(1, 10));
            this.stems.push(new MyStem(this.scene, stemRadius, stemHeight));
            this.stemHeights.push(stemHeight);
        }

        this.receptacle = new MyReceptacle(this.scene, receptacleRadius);
        
        let petalLength = flowerRadius - receptacleRadius;
        let petalAngle = Math.PI/4;
        this.petals = [];
        for (let i = 0; i < petalsNumber; i++) {
            this.petals.push(new MyPetal(this.scene, petalLength, petalAngle));
        }

        this.leaf = new MyLeaf(this.scene);

        let petalTexture = new CGFtexture(this.scene, 'images/petal.png')
        this.petalMaterial = new CGFappearance(this.scene);
        this.petalMaterial.setAmbient(0.9, 0.9, 0.9, 1.0);
        this.petalMaterial.setDiffuse(0.9, 0.9, 0.9, 1.0);
        this.petalMaterial.setEmission(0, 0, 0, 0);
        this.petalMaterial.setShininess(10.0);
        this.petalMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.petalMaterial.setTexture(petalTexture);

        let stemTexture = new CGFtexture(this.scene, 'images/stem.jpg')
        this.stemMaterial = new CGFappearance(this.scene);
        this.stemMaterial.setAmbient(0.35, 0.55, 0.2, 1.0);
        this.stemMaterial.setDiffuse(0.35, 0.55, 0.2, 1.0);
        this.stemMaterial.setEmission(0, 0, 0, 0);
        this.stemMaterial.setShininess(10.0);
        this.stemMaterial.setSpecular(0.35, 0.55, 0.2, 1.0);
        this.stemMaterial.setTexture(stemTexture);

        let receptacleTexture = new CGFtexture(this.scene, 'images/receptacle.webp')
        this.receptableMaterial = new CGFappearance(this.scene);
        this.receptableMaterial.setAmbient(1, 0.9, 0.2, 1.0);
        this.receptableMaterial.setDiffuse(1, 0.9, 0.2, 1.0);
        this.receptableMaterial.setEmission(0, 0, 0, 0);
        this.receptableMaterial.setShininess(10.0);
        this.receptableMaterial.setSpecular(1, 0.9, 0.2, 1.0);
        this.receptableMaterial.setTexture(receptacleTexture);
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
        this.receptableMaterial.apply();
        this.scene.translate(0, totalStemHeight, 0);
        this.receptacle.display();
        this.scene.popMatrix();

        const angle = (2 * Math.PI) / this.petalsNumber;
        
        this.petalMaterial.apply();
        let petal;
        for (let i = 0; i < this.petalsNumber; i++) {
            petal = this.petals[i];

            this.scene.pushMatrix();

            // TODO: verificar transformações
            this.scene.translate(0, totalStemHeight, 0);
            this.scene.rotate(angle * i, 0, 0, 1);
            this.scene.translate(this.receptacleRadius + (this.flowerRadius - this.receptacleRadius) / 2, 0, 0);
            this.scene.rotate(Math.PI / 2, 0, 0, 1);
            this.scene.rotate(this.unionAngle, 0, 1, 0);
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
