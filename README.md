# Bit Dreams Game Engine 👾

## Overview
A modern React + TypeScript port of the Bit Dreams game engine. This project uses Vite for high-performance development and Capacitor for native Android/iOS deployment.

This is heavily based off of the original "Bit vs Bit" Android app game developed by Bit Dreams and as such has some mechanics and assets from it as a starting point.

## 📜 Licensing
This project is **source-available**. It is free to use for personal projects, educational learning, and showcasing in job portfolios or interviews.

## Project Structure
- `src/engine/`: Core framework (Graphics, Input, Game Loop)
- `src/game/`: Game-specific logic, entities (Player, Enemies), and Maps
- `src/components/`: React UI overlays (HUD, Shop, Menus)
- `assets/`: Game sprites, fonts, and audio files

## Getting Started

### Development
1. Install Node.js v20+
2. Run `npm install`
3. Run `npm run dev` to start the web-based development server

### Native Android Build
1. Run `npm run build`
2. Run `npx cap add android` (first time only)
3. Run `npx cap sync` to update the native project
4. Run `npx cap run android` to launch in the emulator

## Credits
Engine conceived and ported by Alexander C. Kidd. All assets are used with permission for demonstration. See license for details.
