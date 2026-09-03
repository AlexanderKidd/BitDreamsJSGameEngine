import React, { useEffect, useRef } from 'react';
import { BitGameImpl } from '../game/BitGame';
import { loadAllAssets } from '../game/Assets';

export const GameView: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameRef = useRef<BitGameImpl | null>(null);

    useEffect(() => {
        const initGame = async () => {
            if (canvasRef.current) {
                try {
                    console.log('Loading assets...');
                    await loadAllAssets();
                    console.log('Assets loaded, starting game...');
                    const game = new BitGameImpl(canvasRef.current);
                    gameRef.current = game;
                    game.start();
                } catch (error) {
                    console.error('Failed to initialize game:', error);
                }
            }
        };

        initGame();

        return () => {
            // Cleanup if needed
        };
    }, []);

    return (
        <div className="game-container" style={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000'
        }}>
            <canvas
                ref={canvasRef}
                width={800}
                height={480}
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    imageRendering: 'pixelated'
                }}
            />
        </div>
    );
};
