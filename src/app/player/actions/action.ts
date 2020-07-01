import { Player } from '../player';
import { P5Added } from '../../p5Module';

export abstract class Action {
    constructor(protected p5: P5Added) { }

    isValid(player: Player) {
        return true;
    }

    abstract execute(player: Player);

}
