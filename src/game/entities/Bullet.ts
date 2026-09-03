import { Graphics, Rect } from '../../engine/types';
import { Assets } from '../Assets';

export class Bullet {
    public x: number;
    public y: number;
    public facing: number;
    public isAlive: boolean = true;
    public targetX: number | null = null;
    public targetY: number | null = null;

    public static readonly SPEED: number = 5;

    constructor(x: number, y: number, facing: number, targetX: number | null = null, targetY: number | null = null) {
        this.x = x;
        this.y = y;
        this.facing = facing;
        this.targetX = targetX;
        this.targetY = targetY;
    }

    update() {
        switch (this.facing) {
            case 1: // Right
                this.x += Bullet.SPEED;
                if (this.targetX !== null && this.x > this.targetX) this.isAlive = false;
                break;
            case 2: // Left
                this.x -= Bullet.SPEED;
                if (this.targetX !== null && this.x < this.targetX) this.isAlive = false;
                break;
            case 3: // Down (from original game.js)
                this.y += Bullet.SPEED;
                if (this.targetY !== null && this.y > this.targetY) this.isAlive = false;
                break;
            case 4: // Up (from original game.js)
                this.y -= Bullet.SPEED;
                if (this.targetY !== null && this.y < this.targetY) this.isAlive = false;
                break;
        }
    }

    draw(g: Graphics) {
        if (Assets.bitBullet) {
            g.drawImage(Assets.bitBullet, this.x, this.y);
        }
    }
}
