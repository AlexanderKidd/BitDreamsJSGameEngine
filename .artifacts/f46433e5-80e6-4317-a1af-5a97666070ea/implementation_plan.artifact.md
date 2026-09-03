# Implementation Plan: Full Logic Migration to Root (React + TS)

This plan details the full conversion of the `bitvsbit` Java game logic into the root `/src/` directory, minimizing Java code and ensuring cross-platform compatibility (Web + Android).

## User Review Required

> [!IMPORTANT]
> The `bitvsbit` directory will be treated strictly as a platform wrapper. All future features and bug fixes should happen in the root `/src/` folder. We are using standard React (Web) + Canvas for high portability.

## Proposed Changes

### Entities & Combat (TypeScript)
Porting the remaining interactive entities and their AI/Combat logic.

#### [NEW] [EnemySoldier.ts](file:///E:/Users/Alex/Code/BitDreamsJSGameEngine/src/game/entities/EnemySoldier.ts)
Port of `EnemySoldier.java`. Includes AI movement, collision checks against trees, and firing logic.

#### [NEW] [Bullet.ts](file:///E:/Users/Alex/Code/BitDreamsJSGameEngine/src/game/entities/Bullet.ts)
Unified bullet class to replace the simplified logic in `Player.ts`.

---

### Maps & Game Modes (TypeScript)
Implementing the diverse game modes from the original Android version.

#### [NEW] [CTFMap.ts](file:///E:/Users/Alex/Code/BitDreamsJSGameEngine/src/game/maps/CTFMap.ts)
Implementation of the Capture The Fort mode logic and specific map layout.

#### [NEW] [DeathMatchMap.ts](file:///E:/Users/Alex/Code/BitDreamsJSGameEngine/src/game/maps/DeathMatchMap.ts)
Implementation of the Death Match mode logic.

---

### React UI & State Management
Using React for complex UI overlays like the shop and game menus.

#### [NEW] [Store.tsx](file:///E:/Users/Alex/Code/BitDreamsJSGameEngine/src/components/Store.tsx)
Port of `Store.java` as a React component for easier styling and item management.

#### [NEW] [ScreenManager.ts](file:///E:/Users/Alex/Code/BitDreamsJSGameEngine/src/game/ScreenManager.ts)
A centralized manager to handle transitions between Loading, Main Menu, Options, and Game states.

## Verification Plan

### Automated Tests
- Verification of bullet collision math between `Bullet.ts` and `EnemySoldier.ts`.
- AI behavior tests for `EnemySoldier.ts` to ensure they track the player correctly.

### Manual Verification
- Test all game modes (CTF, DeathMatch) in a browser.
- Verify the React Store overlay correctly pauses the game and updates player stats.
