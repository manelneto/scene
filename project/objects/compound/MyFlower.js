import { CGFappearance, CGFobject, CGFtexture } from '../../../lib/CGF.js';
import { MyStem } from '../simple/MyStem.js';
import { MyLeaf } from '../simple/MyLeaf.js';
import { MyReceptacle } from '../simple/MyReceptacle.js';
import { MyPetal } from '../simple/MyPetal.js';
import { MyPollen } from '../simple/MyPollen.js';
import { MyUtils } from '../../MyUtils.js';

/**
 * MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - External radius of the flower
 * @param petalsNumber - Number of petals
 * @param petalsColour - Colour of the petals
 * @param receptacleRadius - Radius of the flower's heart circle
 * @param receptacleColour - Colour of flower heart circle
 * @param stemRadius - Stem cylinder radius
 * @param stemNumber - Number of stem cylinders
 * @param stemColour - Stem colour
 * @param leafColour - Colour of the leaves
 * @param minUnionAngle - Minimum angle of union between the petals and the receptacle
 * @param maxUnionAngle - Maximum angle of union between the petals and the receptacle
 */
export class MyFlower extends CGFobject {
    constructor(scene, radius, petalsNumber, petalsColour, receptacleRadius, receptacleColour, stemRadius, stemNumber, stemColour, leafColour, minUnionAngle, maxUnionAngle) {
        super(scene);

        this.petalsNumber = petalsNumber;
        this.receptacleRadius = receptacleRadius;
        this.unionAngle = this.generateRandom(minUnionAngle, maxUnionAngle);

        let stemAngle, stemHeight;
        this.stems = [];
        this.stemAngles = [];
        this.stemHeights = [];
        this.x = 0;
        this.y = 0;
        for (let i = 0; i < stemNumber; i++) {
            stemAngle = this.generateRandom(-Math.PI/16, Math.PI/16);
            stemHeight = Math.floor(this.generateRandom(1, 4));
            this.stems.push(new MyStem(this.scene, stemRadius, stemHeight));
            this.stemAngles.push(stemAngle);
            this.stemHeights.push(stemHeight);
            this.x -= stemHeight * Math.sin(stemAngle);
            this.y += stemHeight * Math.cos(stemAngle);
        }

        this.receptacle = new MyReceptacle(this.scene, receptacleRadius);
        
        this.petalLength = radius - receptacleRadius;
        const petalAngle = this.generateRandom(Math.PI/12, Math.PI/8);
        this.petals = [];
        for (let i = 0; i < petalsNumber; i++) {
            this.petals.push(new MyPetal(this.scene, this.petalLength, petalAngle));
        }

        this.leaf = new MyLeaf(this.scene);

        this.pollen = new MyPollen(this.scene, 1, 2, this.generateRandom(-Math.PI/8, Math.PI/8));
        this.hasPollen = true;

        if (Math.random() < 0.5) {
            this.petalMaterial = MyUtils.createMaterial(this.scene, petalsColour, false, 'images/petal.png');
        } else {
            this.petalMaterial = MyUtils.createMaterial(this.scene, petalsColour, false, 'images/petal.gif');
        }

        this.stemMaterial = MyUtils.createMaterial(this.scene, stemColour, false, 'images/stem.jpg');
        this.leafMaterial = MyUtils.createMaterial(this.scene, leafColour, false, 'images/leaf.jpg');
        this.receptacleMaterial = MyUtils.createMaterial(this.scene, receptacleColour, false, 'images/receptacle.jpg');
    }

    getReceptacleRadius() {
        return this.receptacleRadius;
    }

    removePollen() {
        if (this.hasPollen) {
            this.hasPollen = false;
            return this.pollen;
        }
        return null;
    }

    display() {
        let stem, stemAngle, stemHeight;
        this.stemMaterial.apply();
        this.stems[0].display();
        let xOffset = 0;
        let yOffset = this.stemHeights[0];
        for (let i = 1; i < this.stems.length; i++) {
            stem = this.stems[i];
            stemAngle = this.stemAngles[i];
            stemHeight = this.stemHeights[i];
            
            this.scene.pushMatrix();
            
            this.scene.translate(xOffset, yOffset - 0.05, 0); 
            this.scene.rotate(stemAngle, 0, 0, 1);
            this.stemMaterial.apply();
            stem.display();
            
            this.leafMaterial.apply();
            this.leaf.display();
            
            this.scene.popMatrix();

            xOffset -= stemHeight * Math.sin(stemAngle);
            yOffset += stemHeight * Math.cos(stemAngle);
        }

        this.scene.pushMatrix();

        this.scene.translate(xOffset, yOffset, 0);
        this.scene.rotate(Math.PI + Math.PI/3, 1, 0, 0);
        this.scene.translate(-xOffset, 0.2 - yOffset - this.receptacleRadius, 0);

        this.receptacleMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(xOffset, yOffset + this.receptacleRadius - 0.2, 0);
        this.scene.scale(1, 1, 0.5);
        this.receptacle.display();
        this.scene.popMatrix();

        // TODO: o que é o 0.2 que aparece em todo o lado?
        
        if (this.hasPollen) {
            this.scene.pushMatrix();
            this.scene.translate(xOffset, yOffset + this.receptacleRadius - 0.2, 0.25);
            this.pollen.display();
            this.scene.popMatrix();
        }

        let petal;
        this.petalMaterial.apply();
        const angle = (2 * Math.PI) / this.petalsNumber;
        for (let i = 0; i < this.petalsNumber; i++) {
            petal = this.petals[i];

            this.scene.pushMatrix();
            this.scene.translate(xOffset, yOffset + this.receptacleRadius - 0.2, -0.15);
            this.scene.rotate(angle * i, 0, 0, 1);
            this.scene.translate(this.receptacleRadius - 0.4, 0, 0);
            this.scene.rotate(-this.unionAngle, 0, 1, 0);
            this.scene.rotate(Math.PI/2, 0, 0, 1);
            this.scene.translate(-0.5, -this.petalLength/2, 0);
            petal.display();
            this.scene.popMatrix();
        }
                
        this.scene.popMatrix();
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
