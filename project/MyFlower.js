import { CGFobject } from '../lib/CGF.js';
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
 * @param stemSize - Number of stem cylinders
 * @param stemColour - Stem colour
 * @param leavesColour - Colour of the leaves
 */
export class MyFlower extends CGFobject {
    constructor(scene, flowerRadius, petalsNumber, petalsColour, receptacleRadius, receptacleColour, stemRadius, stemSize, leavesColour, minUnionAngle, maxUnionAngle) {
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
        for (let i = 0; i < stemSize; i++) {
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
    }

    display() {
        let stem;
        let totalStemHeight = 0;
        for (let i = 0; i < this.stems.length; i++) {
            stem = this.stems[i];
            
            this.scene.pushMatrix();

            this.scene.translate(0, totalStemHeight, 0); 
            stem.display();
            
            this.scene.popMatrix();

            totalStemHeight += this.stemHeights[i];
        }


        this.scene.pushMatrix();
        this.scene.translate(0, totalStemHeight, 0);
        this.receptacle.display();
        this.scene.popMatrix();

        const angle = (2 * Math.PI) / this.petalsNumber;
        
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
