import './style.css'
import Phaser from 'phaser';
import GameScene from './scenes/GameScene';

const gameCanvas = document.getElementById("gameCanvas") as HTMLCanvasElement;

const config: Phaser.Types.Core.GameConfig = 
{
    
    type: Phaser.WEBGL,
    width: 300,
    height: 600,
    backgroundColor: "#fff",
    canvas: gameCanvas,
    scene: [GameScene],
    scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};

new Phaser.Game(config);
