import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        super.init(application);
        this.gui = new dat.GUI();

        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'displayNormals').name("Display Normals");

        const f1 = this.gui.addFolder('Sky-Sphere');
        f1.add(this.scene, 'displayPanorama').name('Display Panorama');

        const f2 = this.gui.addFolder('Flowers');
        f2.add(this.scene, 'displayGarden').name('Display Garden');
        f2.add(this.scene, 'gardenRows', 0, 10, 1).name('Garden Rows').onChange(this.scene.updateGardenRows.bind(this.scene));
        f2.add(this.scene, 'gardenCols', 0, 10, 1).name('Garden Columns').onChange(this.scene.updateGardenCols.bind(this.scene));

        const f3 = this.gui.addFolder('Rocks and Boulders');

        const sf0 = f3.addFolder('Rock Pyramid');
        sf0.add(this.scene, 'displayPyramid').name('Display Pyramid')
        sf0.add(this.scene, 'pyramidLevels', 0, 10, 1).name('Rock Pyramid Levels').onChange(this.scene.updatePyramidLevels.bind(this.scene));

        const sf1 = f3.addFolder('Random Rocks');
        sf1.add(this.scene, 'displayRocks').name('Display Rocks');
        sf1.add(this.scene, 'nRocks', 0, 10, 1).name('Rocks Number').onChange(this.scene.updateNRocks.bind(this.scene));

        const f4 = this.gui.addFolder('Bee');
        f4.add(this.scene, 'displayBee').name('Display Bee');
        f4.add(this.scene, 'moveBee').name('Move Bee');
        f4.add(this.scene, 'speedFactor', 0.1, 3).name('Speed Factor');
        f4.add(this.scene, 'scaleFactor', 0.5, 3).name('Scale Factor');

        const f5 = this.gui.addFolder('Pollen and Hive')
        f5.add(this.scene, 'displayPollen').name('Display Pollen');
        f5.add(this.scene, 'displayHive').name('Display Hive');

        this.initKeys();

        return true;
    }

    initKeys() {
        // create reference from the scene to the GUI
        this.scene.gui = this;

        // disable the processKeyboard function
        this.processKeyboard = function() {};

        // create a named array to store which keys are being pressed
        this.activeKeys = {};
    }

    /**
     * Called when a key is pressed down, mark it as active in the array
     */
    processKeyDown(event) {
        this.activeKeys[event.code] = true;
    }

    /**
     * Called when a key is released, mark it as inactive in the array
     */
    processKeyUp(event) {
        this.activeKeys[event.code] = false;
    }

    /**
     * Returns true if a key is marked as pressed, false otherwise
     */
    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }
}
