import { Input, GameTouchEvent, TouchEventType } from './types';

export class WebInput implements Input {
    private touchEventsBuffer: GameTouchEvent[] = [];
    private isTouched: boolean[] = new Array(10).fill(false);
    private touchX: number[] = new Array(10).fill(0);
    private touchY: number[] = new Array(10).fill(0);
    private canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.registerListeners();
    }

    private registerListeners() {
        this.canvas.addEventListener('touchstart', (e: TouchEvent) => this.handleTouch(e, TouchEventType.TOUCH_DOWN), { passive: false });
        this.canvas.addEventListener('touchmove', (e: TouchEvent) => this.handleTouch(e, TouchEventType.TOUCH_DRAGGED), { passive: false });
        this.canvas.addEventListener('touchend', (e: TouchEvent) => this.handleTouch(e, TouchEventType.TOUCH_UP), { passive: false });
        this.canvas.addEventListener('touchcancel', (e: TouchEvent) => this.handleTouch(e, TouchEventType.TOUCH_UP), { passive: false });

        // Mouse fallbacks
        this.canvas.addEventListener('mousedown', (e: MouseEvent) => this.handleMouse(e, TouchEventType.TOUCH_DOWN));
        this.canvas.addEventListener('mousemove', (e: MouseEvent) => this.handleMouse(e, TouchEventType.TOUCH_DRAGGED));
        this.canvas.addEventListener('mouseup', (e: MouseEvent) => this.handleMouse(e, TouchEventType.TOUCH_UP));
    }

    private handleTouch(e: TouchEvent, type: TouchEventType) {
        e.preventDefault();

        for (let i = 0; i < e.changedTouches.length; i++) {
            const touch = e.changedTouches[i];
            const rect = this.canvas.getBoundingClientRect();

            // Map touch to canvas internal coordinate system (800x480)
            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;

            const x = (touch.clientX - rect.left) * scaleX;
            const y = (touch.clientY - rect.top) * scaleY;
            const pointer = touch.identifier;

            if (type === TouchEventType.TOUCH_DOWN) this.isTouched[pointer] = true;
            if (type === TouchEventType.TOUCH_UP) this.isTouched[pointer] = false;

            this.touchX[pointer] = x;
            this.touchY[pointer] = y;

            this.touchEventsBuffer.push({ type, x, y, pointer });
        }
    }

    private handleMouse(e: MouseEvent, type: TouchEventType) {
        const rect = this.canvas.getBoundingClientRect();

        // Map mouse to canvas internal coordinate system (800x480)
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;

        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        const pointer = 0;

        if (type === TouchEventType.TOUCH_DOWN) this.isTouched[pointer] = true;
        if (type === TouchEventType.TOUCH_UP) this.isTouched[pointer] = false;

        this.touchX[pointer] = x;
        this.touchY[pointer] = y;

        this.touchEventsBuffer.push({ type, x, y, pointer });
    }

    isTouchDown(pointer: number): boolean {
        return this.isTouched[pointer] || false;
    }

    getTouchX(pointer: number): number {
        return this.touchX[pointer] || 0;
    }

    getTouchY(pointer: number): number {
        return this.touchY[pointer] || 0;
    }

    getTouchEvents(): GameTouchEvent[] {
        const events = [...this.touchEventsBuffer];
        this.touchEventsBuffer = [];
        return events;
    }
}
