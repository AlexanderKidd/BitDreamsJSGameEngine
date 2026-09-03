import { Graphics, ImageAsset } from '../engine/types';
import { Assets } from './Assets';

const VALID_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "1234567890" + " " + ".:!?";
const LARGE_TEXT_WIDTH = 32;
const LARGE_TEXT_HEIGHT = 32;
const SMALL_TEXT_WIDTH = 24;
const SMALL_TEXT_HEIGHT = 16;

export class TextRenderer {
    static drawText(g: Graphics, text: string, isBigText: boolean, x: number, y: number) {
        const fontSheet = Assets.fontSheet;
        if (!fontSheet) return;

        const charLen = VALID_CHARACTERS.length;
        const upperText = text.toUpperCase();

        for (let i = 0; i < upperText.length; i++) {
            const char = upperText.charAt(i);
            const index = VALID_CHARACTERS.indexOf(char);
            if (index === -1) continue;

            if (isBigText) {
                const row = Math.floor(index / 12);
                const col = index % 12;
                g.drawImageSection(fontSheet, x + (i * 34), y, col * 32, row * 32, LARGE_TEXT_WIDTH, LARGE_TEXT_HEIGHT);
            } else {
                const row = Math.floor(index / 12);
                const col = index % 12;
                g.drawImageSection(fontSheet, x + (i * 28), y, col * 24, 160 + (row * 16), SMALL_TEXT_WIDTH, SMALL_TEXT_HEIGHT);
            }
        }
    }
}
