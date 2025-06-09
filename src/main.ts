import './style.css'
import Phaser from 'phaser';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import InputTextPlugin from 'phaser3-rex-plugins/plugins/inputtext-plugin';
import GameScene from './scenes/GameScene';

const gameCanvas = document.getElementById("gameCanvas") as HTMLCanvasElement;

const config: Phaser.Types.Core.GameConfig = 
{
    
    type: Phaser.WEBGL,
    width: 300,
    height: 600,
    parent: "phaser-example",
    dom: {
      createContainer: true
    },
    plugins: {
      global: [
            {
                key: 'rexInputTextPlugin',
                plugin: InputTextPlugin,
                start: true
            }
        ],
      scene: [{
            key: 'rexUI',
            plugin: RexUIPlugin,
            mapping: 'rexUI'
            }
    ]
    },
    backgroundColor: "#fff",
    canvas: gameCanvas,
    scene: [GameScene],
    scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};

new Phaser.Game(config);
