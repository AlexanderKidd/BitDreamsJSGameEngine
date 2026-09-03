import { ImageAsset, AudioAsset } from '../engine/types';

export class WebAudioAsset implements AudioAsset {
    private audio: HTMLAudioElement;

    constructor(src: string) {
        this.audio = new Audio(src);
    }

    play(volume: number = 1): void {
        this.audio.volume = volume;
        this.audio.currentTime = 0;
        this.audio.play().catch(e => console.warn("Audio playback failed (usually requires user gesture):", e));
    }

    stop(): void {
        this.audio.pause();
        this.audio.currentTime = 0;
    }

    pause(): void {
        this.audio.pause();
    }

    setLooping(looping: boolean): void {
        this.audio.loop = looping;
    }

    isLooping(): boolean {
        return this.audio.loop;
    }

    dispose(): void {
        this.audio.pause();
        this.audio.src = '';
    }
}

export class AssetLoader {
    static async loadImage(src: string): Promise<ImageAsset> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve({
                width: img.width,
                height: img.height,
                data: img
            });
            img.onerror = () => {
                console.error(`Failed to load image: ${src}`);
                reject(new Error(`Failed to load image: ${src}`));
            };
            img.src = src;
        });
    }

    static async loadAudio(src: string): Promise<AudioAsset> {
        return new WebAudioAsset(src);
    }
}

export const Assets = {
    // Images
    bg: null as ImageAsset | null,
    bitBorder: null as ImageAsset | null,
    fontSheet: null as ImageAsset | null,
    bitDpad: null as ImageAsset | null,
    bitFireButton: null as ImageAsset | null,
    bitBullet: null as ImageAsset | null,

    // Player sprites
    bitSoldierDown: null as ImageAsset | null,
    bitSoldierDown2: null as ImageAsset | null,
    bitSoldierLeft: null as ImageAsset | null,
    bitSoldierLeft2: null as ImageAsset | null,
    bitSoldierRight: null as ImageAsset | null,
    bitSoldierRight2: null as ImageAsset | null,
    bitSoldierUp: null as ImageAsset | null,
    bitSoldierUp2: null as ImageAsset | null,

    // Enemy sprites
    eLSoldier: null as ImageAsset | null,
    eLSoldier2: null as ImageAsset | null,
    eRSoldier: null as ImageAsset | null,
    eRSoldier2: null as ImageAsset | null,
    eUSoldier: null as ImageAsset | null,
    eUSoldier2: null as ImageAsset | null,
    eDSoldier: null as ImageAsset | null,
    eDSoldier2: null as ImageAsset | null,
    eBullet: null as ImageAsset | null,

    // Map objects
    labTile: null as ImageAsset | null,
    blueFlag: null as ImageAsset | null,
    orangeFlag: null as ImageAsset | null,
    reactor: null as ImageAsset | null,
    machine: null as ImageAsset | null,
    menuBlueTile: null as ImageAsset | null,
    menuOrangeTile: null as ImageAsset | null,
    electrowire: null as ImageAsset | null,
    healthPack: null as ImageAsset | null,
    coin: null as ImageAsset | null,
    chest: null as ImageAsset | null,
    grassTile: null as ImageAsset | null,
    tree: null as ImageAsset | null,
    vine: null as ImageAsset | null,

    // Audio
    menuMusic: null as AudioAsset | null,
    bitPopSound: null as AudioAsset | null,
    ouch: null as AudioAsset | null,
    heal: null as AudioAsset | null,
    coinCollect: null as AudioAsset | null,
};

export async function loadAllAssets() {
    Assets.bg = await AssetLoader.loadImage('/assets/mainMenu.png');
    Assets.bitBorder = await AssetLoader.loadImage('/assets/bit_border.png');
    Assets.fontSheet = await AssetLoader.loadImage('/assets/bit_normFont.png');
    Assets.bitDpad = await AssetLoader.loadImage('/assets/bit_dpad.png');
    Assets.bitFireButton = await AssetLoader.loadImage('/assets/bit_firebutton.png');
    Assets.bitBullet = await AssetLoader.loadImage('/assets/bit_bullet.png');

    Assets.bitSoldierDown = await AssetLoader.loadImage('/assets/bit_soldierDown.png');
    Assets.bitSoldierDown2 = await AssetLoader.loadImage('/assets/bit_soldierDown2.png');
    Assets.bitSoldierLeft = await AssetLoader.loadImage('/assets/bit_soldierLeft.png');
    Assets.bitSoldierLeft2 = await AssetLoader.loadImage('/assets/bit_soldierLeft2.png');
    Assets.bitSoldierRight = await AssetLoader.loadImage('/assets/bit_soldierRight.png');
    Assets.bitSoldierRight2 = await AssetLoader.loadImage('/assets/bit_soldierRight2.png');
    Assets.bitSoldierUp = await AssetLoader.loadImage('/assets/bit_soldierUp.png');
    Assets.bitSoldierUp2 = await AssetLoader.loadImage('/assets/bit_soldierUp2.png');

    // Load available audio
    Assets.menuMusic = await AssetLoader.loadAudio('/assets/bit_menu7.wav');
    Assets.bitPopSound = await AssetLoader.loadAudio('/assets/bit_pop.mp3');
    Assets.ouch = await AssetLoader.loadAudio('/assets/ouch.mp3');
    Assets.heal = await AssetLoader.loadAudio('/assets/heal.mp3');
    Assets.coinCollect = await AssetLoader.loadAudio('/assets/coin.mp3');

    /* Remaining missing images
    Assets.eLSoldier = await AssetLoader.loadImage('/assets/bit_enemy_soldierLeft.png');
    Assets.eLSoldier2 = await AssetLoader.loadImage('/assets/bit_enemy_soldierLeft2.png');
    Assets.eRSoldier = await AssetLoader.loadImage('/assets/bit_enemy_soldierRight.png');
    Assets.eRSoldier2 = await AssetLoader.loadImage('/assets/bit_enemy_soldierRight2.png');
    Assets.eUSoldier = await AssetLoader.loadImage('/assets/bit_enemy_soldierUp.png');
    Assets.eUSoldier2 = await AssetLoader.loadImage('/assets/bit_enemy_soldierUp2.png');
    Assets.eDSoldier = await AssetLoader.loadImage('/assets/bit_enemy_soldierDown.png');
    Assets.eDSoldier2 = await AssetLoader.loadImage('/assets/bit_enemy_soldierDown2.png');
    Assets.eBullet = await AssetLoader.loadImage('/assets/bit_enemy_bullet.png');

    Assets.labTile = await AssetLoader.loadImage('/assets/bit_labTile.png');
    Assets.blueFlag = await AssetLoader.loadImage('/assets/bit_blueFlag.png');
    Assets.orangeFlag = await AssetLoader.loadImage('/assets/bit_orangeFlag.png');
    Assets.reactor = await AssetLoader.loadImage('/assets/bit_reactor.png');
    Assets.machine = await AssetLoader.loadImage('/assets/bit_machineTile.png');
    Assets.menuBlueTile = await AssetLoader.loadImage('/assets/menu_blueTile.png');
    Assets.menuOrangeTile = await AssetLoader.loadImage('/assets/menu_orangeTile.png');
    Assets.electrowire = await AssetLoader.loadImage('/assets/bit_electrowire.png');
    Assets.healthPack = await AssetLoader.loadImage('/assets/bit_healthPack.png');
    Assets.coin = await AssetLoader.loadImage('/assets/bit_coin.png');
    Assets.chest = await AssetLoader.loadImage('/assets/bit_chest.png');
    Assets.grassTile = await AssetLoader.loadImage('/assets/bit_grassTile.png');
    Assets.tree = await AssetLoader.loadImage('/assets/bit_tree.png');
    Assets.vine = await AssetLoader.loadImage('/assets/bit_thornVine.png');
    */
}
