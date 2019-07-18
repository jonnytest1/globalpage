import * as p5 from "p5";
//@ts-ignore
var p5I: p5 = require('../../node_modules/p5/lib/p5.js');

export interface p5Added extends p5 {
    rotat: any;
    crcl: (vec: p5.Vector, radius: number) => p5;
    sphre: (vec: p5.Vector, radius: number) => p5;

    directionFromInput: () => p5.Vector

}
export class p5Module {

    protected p5: p5Added = this.add(p5I)


    circle(pos: p5.Vector, radius: number): p5 {
        return this.p5.circle(pos.x, pos.y, radius);
    }
    sphere(pos: p5.Vector, radius: number): p5 {
        this.p5.translate(pos);
        this.p5.sphere(radius);
        return this.p5.translate(pos.mult(-1));

    }
    directionFromInput() {
        let y = 0;
        let x = 0;
        if (this.p5.keyIsDown(65)) {
            x--;
        }
        if (this.p5.keyIsDown(68)) {
            x++;
        }
        if (this.p5.keyIsDown(87)) {
            y++;
        }
        if (this.p5.keyIsDown(83)) {
            y--;
        }
        return this.p5.createVector(x, y);
    }
    add(p5: p5): p5Added {
        const p5Original = p5 as p5Added;
        p5Original.crcl = (...args) => this.circle.call(this, ...args)
        p5Original.sphre = (...args) => this.sphere.call(this, ...args);
        p5Original.directionFromInput = (...args) => this.directionFromInput.call(this, ...args);
        return p5Original;
    }

}

