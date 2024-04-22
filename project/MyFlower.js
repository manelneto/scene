import { CGFobject } from '../lib/CGF.js';
import { MyStem } from './MyStem.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';

/**
 * MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
    constructor(scene, radiusFlower, numberPetals, radiusReceptacle, radiusStem, numberStems/*, stemColor, leafColor*/) {
        super(scene);

        this.radiusFlower = radiusFlower;
        this.numberPetals = numberPetals;
        this.radiusReceptacle = radiusReceptacle;
        this.radiusStem = radiusStem;
        this.numberStems = numberStems;
        this.radiusFlower = radiusFlower;

        this.myStem = [];
        for (let i = 0; i < numberStems; i++) {
            this.myStem.push(new MyStem(this.scene, radiusStem));
        }
        this.myReceptacle = new MyReceptacle(this.scene, radiusReceptacle);
        this.myPetal = [];
        for (let i = 0; i < numberPetals; i++) {
            this.myPetal.push(new MyPetal(this.scene, (radiusFlower - radiusReceptacle)));
        }
    }

    display() {
        this.scene.pushMatrix();

        // Display the stems
        this.myStem[0].display();
        for (let i = 1; i < this.myStem.length; i++) {
            this.scene.translate(0, 1, 0); 
            this.myStem[i].display();
        }

        this.scene.popMatrix();

        // Display the receptacle
        this.scene.pushMatrix();
        this.scene.translate(0, this.numberStems, 0);
        this.myReceptacle.display();
        this.scene.popMatrix();

        // Display the petals
        const numPetals = this.myPetal.length;
        const angleIncrement = (2 * Math.PI) / numPetals;

        for (let i = 0; i < numPetals; i++) {
            this.scene.pushMatrix();
            this.scene.translate(0, this.numberStems, 0);
            this.scene.rotate(angleIncrement * i, 0, 0, 1);
            this.scene.translate(((this.radiusFlower - this.radiusReceptacle) / 2), 0, 0);
            this.scene.rotate(Math.PI / 2, 0, 0, 1);
            this.myPetal[i].display();
            this.scene.popMatrix();
        }
    }
}
