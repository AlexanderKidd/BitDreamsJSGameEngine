import { Screen } from '../engine/types';

export enum GameState {
    SPLASH,
    MENU,
    OPTIONS,
    GAME_READY,
    GAME_RUNNING,
    GAME_OVER
}

export class ScreenManager {
    private static instance: ScreenManager;
    private currentGameState: GameState = GameState.SPLASH;
    private onStateChange: ((state: GameState) => void) | null = null;

    private constructor() {}

    static getInstance(): ScreenManager {
        if (!ScreenManager.instance) {
            ScreenManager.instance = new ScreenManager();
        }
        return ScreenManager.instance;
    }

    setListener(listener: (state: GameState) => void) {
        this.onStateChange = listener;
    }

    transitionTo(state: GameState) {
        this.currentGameState = state;
        if (this.onStateChange) {
            this.onStateChange(state);
        }
    }

    getState(): GameState {
        return this.currentGameState;
    }
}
