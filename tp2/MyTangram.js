import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.paralellogram = new MyParallelogram(scene);
        this.triangleSmall1 = new MyTriangleSmall(scene);
        this.triangleSmall2 = new MyTriangleSmall(scene);
        this.triangleBig1 = new MyTriangleBig(scene);
        this.triangleBig2 = new MyTriangleBig(scene);
	}

    display() {
        var translate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0.9, Math.sqrt(2) + 0.87 , 0, 1
          ];
      
        var rotate = [
            Math.cos(-Math.PI / 6), Math.sin(-Math.PI / 6), 0, 0,
            -Math.sin(-Math.PI / 6), Math.cos(-Math.PI / 6), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
        
        this.scene.pushMatrix();
        this.scene.multMatrix(translate);
        this.scene.multMatrix(rotate);
        this.diamond.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2), 0, 0);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.triangleBig1.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2), -Math.sqrt(2) ,0);
        this.scene.rotate(-Math.PI/4, 0, 0, 1);
        this.triangleBig2.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.scale(1, -1, 1);
        this.scene.translate(-1.81, 1, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.paralellogram.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.translate(-4.9, 0.1, 0);
        this.scene.rotate(3 * Math.PI/4, 0, 0, 1);
        this.triangleSmall1.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2), -2 * Math.sqrt(2), 0);
        this.scene.rotate(3 * Math.PI/4, 0, 0, 1);
        this.triangle.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.translate(-1.5, -4.3, 0);
        this.scene.rotate(-3 * Math.PI/4, 0, 0, 1);
        this.triangleSmall2.display();
        this.scene.popMatrix();
    }
}

