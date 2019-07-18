import { Action } from './action';
import { p5Added } from '../../p5Module';
import { Player } from '../player';


export class MouseAction extends Action {
    constructor(p5: p5Added) {
        super(p5);
    }

    private mouseX: number;
    private mouseY: number;

    private readonly DOWN = this.p5.createVector(0, -1, 0);
    private readonly UP = this.p5.createVector(0, 1, 0);
    execute(player: Player) {
        if (!this.mouseX) {
            this.mouseX = this.p5.mouseX
        }
        if (!this.mouseY) {
            this.mouseY = this.p5.mouseY
        }

        const diffY = this.p5.mouseY - this.mouseY;
        let yLerp = this.UP.copy();
        if (diffY < 0) {
            yLerp = this.DOWN.copy();
        }
        const percentY = this.toPercent(diffY)
        player.look.lerp(yLerp.x, yLerp.y, yLerp.z, percentY * 0.5)


        const diffX = this.p5.mouseX - this.mouseX;
        let xLerp = player.look.copy().cross(this.UP.copy());
        if (diffX < 0) {
            xLerp = player.look.copy().cross(this.DOWN.copy());
        }
        const percentX = this.toPercent(diffX)
        player.look.lerp(xLerp.x, xLerp.y, xLerp.z, percentX * 0.5)
        this.mouseX = this.p5.mouseX;
        this.mouseY = this.p5.mouseY;
    }

    toPercent(diff: number) {
        return this.p5.map(Math.abs(diff), 0, 200, 0, 1);
    }
}