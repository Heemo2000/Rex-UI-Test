import Phaser from "phaser";

export function createTextBox(scene: Phaser.Scene, x: number, y: number, config: any = {}) {
  const textBox = scene.rexUI.add.textBox({
    x,
    y,
    background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 10, 0x1565c0),

    icon: config.icon ?? undefined,

    text: scene.rexUI.add.BBCodeText(0, 0, '', {
      fixedWidth: 300,
      fixedHeight: 100,
      fontSize: '18px',
      wrap: {
        mode: 'word',
        width: 280
      }
    }),

    action: scene.rexUI.add.label({
      width: 40,
      height: 40,
      background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0xff6f00),
      text: scene.add.text(0, 0, '▶', { fontSize: '18px' }),
      align: 'center',
      space: {
        left: 10,
        right: 10
      }
    }),

    space: {
      icon: 10,
      left: 20,
      right: 20,
      top: 20,
      bottom: 20,
      text: 10,
    },

    align: {text: 'center'},  // text-align: center

    // Optional: page typing animation
    page: {
      maxLines: 3
    }
  })
    .layout()
    .setOrigin(0.5)
    .setInteractive()
    .on('pointerdown', () => {
      const isTyping = textBox.isTyping;
      if (isTyping) {
        textBox.stop(true); // Finish instantly
      } else {
        if (textBox.isLastPage) {
          console.log('End of text');
        } else {
          textBox.typeNextPage();
        }
      }
    });

  return textBox;
}
