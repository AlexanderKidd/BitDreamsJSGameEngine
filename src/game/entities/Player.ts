import { Graphics, ImageAsset } from '../../engine/types';
import { Assets } from '../Assets';

export class Player {
    public x: number = 0;
    public y: number = 0;
    public facing: number = 1;

    draw(g: Graphics) {
        let img: ImageAsset | null = null;

        // Simple animation logic from original graphics.js
        const animFrame = this.x % 16 < 8;

        switch (this.facing) {
            case 1: // Right
                img = animFrame ? Assets.bitSoldierRight : Assets.bitSoldierRight2;
                break;
            case 2: // Left
                img = animFrame ? Assets.bitSoldierLeft : Assets.bitSoldierLeft2;
                break;
            default:
                img = Assets.bitSoldierRight;
                break;
        }

        if (img) {
            g.drawImage(img, this.x, this.y);
        }
    }
}
