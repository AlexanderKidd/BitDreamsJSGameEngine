import React from 'react';

interface HUDProps {
    health: number;
    shield: number;
    coins: number;
    kills: number;
    time: string;
}

export const HUD: React.FC<HUDProps> = ({ health, shield, coins, kills, time }) => {
    return (
        <div className="hud-overlay" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '60px',
            pointerEvents: 'none',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px 20px',
            boxSizing: 'border-box',
            color: '#FFD800',
            fontFamily: 'monospace',
            fontSize: '24px',
            textShadow: '2px 2px #000'
        }}>
            <div className="hud-left">
                COINS: {coins}
            </div>
            <div className="hud-center">
                {time}
            </div>
            <div className="hud-right">
                KILLS: {kills}
            </div>
        </div>
    );
};
