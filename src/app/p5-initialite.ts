import { AfterViewInit } from '@angular/core';
import { P5Module } from './p5Module';

import * as p5 from 'p5';
export abstract class P5Initialize extends P5Module implements AfterViewInit {

    protected height: number;
    protected width: number;


    abstract getContainer(): HTMLElement;

    p5Init(innerp5: p5) {
        innerp5.draw = () => this.draw.call(this);
        innerp5.setup = () => this.setup.call(this);
        innerp5.keyPressed = () => this.keyPressed.call(this);
        innerp5.preload = () => this.preload.call(this);
    }

    keyPressed() {
    }

    abstract draw(): void;

    setup() {
        this.p5.createCanvas(this.width, this.height);
    }
    preload() {

    }
    ngAfterViewInit(): void {

        const comp = this.getContainer();
        this.height = comp.offsetHeight;
        this.width = comp.offsetWidth;
        // @ts-ignore
        this.p5 = this.add(new this.p5((p) => this.p5Init.call(this, p), comp));
    }

}

