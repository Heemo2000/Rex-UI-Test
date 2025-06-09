// types/phaser-rex-input.d.ts
import 'phaser';
declare module 'phaser' {
  interface Scene {
    rexInputText(x: number, y: number, config: any): Phaser.GameObjects.DOMElement;
  }
}
