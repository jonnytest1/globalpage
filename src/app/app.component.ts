import { Component, ViewChild, ElementRef } from '@angular/core';
import { p5Initialize } from './p5-initialite';
import { Terrain } from './terrain';
import { Player } from './player/player';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends p5Initialize {

  @ViewChild("myCanvas")
  container: ElementRef<HTMLDivElement>;

  private player: Player
  terrain: Terrain
  title = 'globalwebpage';
  ter: any;

  constructor() {
    super();
  }

  getContainer(): HTMLElement {
    return this.container.nativeElement;
  }
  setup() {
    this.p5.createCanvas(this.width, this.height, this.p5.WEBGL);
    this.player = new Player(this.p5);
    this.terrain = new Terrain(this.p5);
    this.container.nativeElement.children[0].requestPointerLock();
  }
  draw(): void {
    let pos = this.p5.createVector(0, 0, 60);
    this.sphere(pos, 50)
    this.terrain.draw(this.p5.createVector(-1000, -1000, -100));
    this.player.draw();
    this.p5.noCursor();
  }
}
