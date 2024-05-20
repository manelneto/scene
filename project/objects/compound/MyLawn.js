import { CGFobject } from '../../../lib/CGF.js';
import { MyGrass } from '../simple/MyGrass.js';

/**
 * MyLawn
 * @constructor
 * @param scene - Reference to MyScene object
 * @param rows - Number of rows 
 * @param columns - Number of columns
 * @param grassNumber - Number of differents grass
 */
export class MyLawn extends CGFobject {
    constructor(scene, rows, columns, grassNumber) {
        super(scene);

        this.rows = rows;
        this.columns = columns;
        this.grassNumber = grassNumber;

        this.grassList = []
        this.grassWidthList = []
        let width, height;
        for (let i = 0; i < this.grassNumber; i++) {
            width = Math.floor(this.generateRandom(1, 3));
            this.grassWidthList.push(width);
            height = Math.floor(this.generateRandom(6, 10));
            this.grassList.push(new MyGrass(this.scene, width, height));
        }
    }

    display() {
        for (let i = 0; i < this.rows; i++) {
            this.scene.pushMatrix();

            for (let j = 0; j < this.columns; j++) {
                let grassIndex = (i * this.columns + j) % this.grassNumber;
                this.grassList[grassIndex].display();
                this.scene.translate(this.grassWidthList[grassIndex], 0, 0);
            }

            this.scene.popMatrix();
            this.scene.translate(0, 0, 3);
        }
    }

    generateRandom(min, max) {
        return Math.random() * (max - min) + min;
    }
}
