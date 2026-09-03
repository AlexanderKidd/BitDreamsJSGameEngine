import { Graphics, ImageAsset } from './types';

export class CanvasGraphics implements Graphics {
    private ctx: CanvasRenderingContext2D;
    private width: number;
    private height: number;

    constructor(canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('2d')!;
        this.width = canvas.width;
        this.height = canvas.height;
    }

    clear(color: string | number): void {
        this.ctx.fillStyle = typeof color === 'number' ? `#${color.toString(16).padStart(6, '0')}` : color;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    drawPixel(x: number, y: number, color: string): void {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, 1, 1);
    }

    drawLine(x1: number, y1: number, x2: number, y2: number, color: string): void {
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }

    drawRect(x: number, y: number, width: number, height: number, color: string | number): void {
        this.ctx.fillStyle = typeof color === 'number' ? `#${color.toString(16).padStart(6, '0')}` : color;
        this.ctx.fillRect(x, y, width, height);
    }

    drawImage(image: ImageAsset, x: number, y: number): void {
        this.ctx.drawImage(image.data, x, y);
    }

    drawImageSection(image: ImageAsset, x: number, y: number, srcX: number, srcY: number, srcWidth: number, srcHeight: number): void {
        this.ctx.drawImage(image.data, srcX, srcY, srcWidth, srcHeight, x, y, srcWidth, srcHeight);
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }
}
