import { Action } from './action';
import { Player } from '../player';
import { P5Added } from '../../p5Module';

export class MoveAction extends Action {

    constructor(p5: P5Added) {
        super(p5);
    }

    execute(player: Player) {
        player.move(this.p5.directionFromInput());
    }

}
