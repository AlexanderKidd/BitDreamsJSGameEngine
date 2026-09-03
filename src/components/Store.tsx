import React from 'react';
import { Player } from '../game/entities/Player';

interface StoreItem {
    name: string;
    price: number;
    description: string;
}

const ITEMS: StoreItem[] = [
    { name: "HEALTH PACK", price: 5, description: "Restores 2 HP" },
    { name: "SPEED PACK", price: 20, description: "Doubles move speed" },
    { name: "CADUCLYSM", price: 30, description: "+10 Shield" },
    { name: "SHOTGUN BURST", price: 45, description: "Unlocks Shotgun" },
    { name: "FAUX CAPACITOR", price: 50, description: "Time Warp component" },
    { name: "TIME WARP", price: 50, description: "Become a Dino (requires 2 Capacitors)" },
];

interface StoreProps {
    coins: number;
    onPurchase: (item: StoreItem) => void;
    onClose: () => void;
    capacitors: number;
}

export const Store: React.FC<StoreProps> = ({ coins, onPurchase, onClose, capacitors }) => {
    return (
        <div className="store-overlay" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '800px',
            height: '480px',
            backgroundColor: 'rgba(51, 51, 51, 0.95)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'monospace',
            zIndex: 100
        }}>
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 20px',
                backgroundColor: '#222',
                borderBottom: '4px solid #00FFFF'
            }}>
                <div style={{ color: '#FFD800', fontSize: '24px' }}>COINS: {coins}</div>
                <div style={{ color: '#4CFF00', fontSize: '32px', letterSpacing: '4px' }}>SHOP</div>
                <button onClick={onClose} style={{
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '20px',
                    padding: '5px 15px'
                }}>X</button>
            </header>

            <div className="store-items" style={{
                overflowY: 'auto',
                flex: 1,
                padding: '20px'
            }}>
                {ITEMS.map((item, index) => {
                    const canAfford = coins >= item.price;
                    const warpDisabled = item.name === "TIME WARP" && capacitors < 2;
                    const disabled = !canAfford || warpDisabled;

                    return (
                        <div key={item.name} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '15px',
                            marginBottom: '10px',
                            backgroundColor: disabled ? '#444' : '#666',
                            border: '2px solid #888',
                            opacity: disabled ? 0.6 : 1,
                            cursor: disabled ? 'not-allowed' : 'pointer'
                        }} onClick={() => !disabled && onPurchase(item)}>
                            <div>
                                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{item.name}</div>
                                <div style={{ fontSize: '14px', color: '#AAA' }}>{item.description}</div>
                            </div>
                            <div style={{ fontSize: '24px', color: '#FFD800' }}>
                                {item.price} G
                            </div>
                        </div>
                    );
                })}
            </div>

            <footer style={{ padding: '10px', textAlign: 'center', backgroundColor: '#222', fontSize: '12px' }}>
                Capacitors Collected: {capacitors} / 2
            </footer>
        </div>
    );
};
