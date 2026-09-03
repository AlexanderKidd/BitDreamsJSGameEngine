export interface Point {
    x: number;
    y: number;
}

export interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}

export enum TouchEventType {
    TOUCH_DOWN,
    TOUCH_UP,
    TOUCH_DRAGGED
}

export interface GameTouchEvent {
    type: TouchEventType;
    x: number;
    y: number;
    pointer: number;
}

export interface ImageAsset {
    width: number;
    height: number;
    data: HTMLImageElement;
}

export interface AudioAsset {
    play(volume?: number): void;
    stop(): void;
    pause(): void;
    setLooping(looping: boolean): void;
    isLooping(): boolean;
    dispose(): void;
}

export interface Graphics {
    clear(color: string | number): void;
    drawPixel(x: number, y: number, color: string): void;
    drawLine(x1: number, y1: number, x2: number, y2: number, color: string): void;
    drawRect(x: number, y: number, width: number, height: number, color: string | number): void;
    drawImage(image: ImageAsset, x: number, y: number): void;
    drawImageSection(image: ImageAsset, x: number, y: number, srcX: number, srcY: number, srcWidth: number, srcHeight: number): void;
    getWidth(): number;
    getHeight(): number;
}

export interface Input {
    isTouchDown(pointer: number): boolean;
    getTouchX(pointer: number): number;
    getTouchY(pointer: number): number;
    getTouchEvents(): GameTouchEvent[];
}

export interface Screen {
    update(deltaTime: number): void;
    present(deltaTime: number): void;
    pause(): void;
    resume(): void;
    dispose(): void;
    backButton(): void;
}

export interface Game {
    getGraphics(): Graphics;
    getInput(): Input;
    getAudio(): any; // Audio implementation simplified for now
    setScreen(screen: Screen): void;
    getCurrentScreen(): Screen;
    getInitScreen(): Screen;
}

declare global {
  interface ImportMeta {
    env: Record<string, string>;
  }
}
