import Phaser from "phaser";

export default class Label extends Phaser.GameObjects.Container {
  private background: Phaser.GameObjects.Graphics;
  private textObject: Phaser.GameObjects.Text;
  private icon?: Phaser.GameObjects.Image;

  private config: {
    width?: number;
    height?: number;
    fontSize: number;
    fontFamily: string;
    textColor: string;
    backgroundColor: number;
    backgroundAlpha: number;
    cornerRadius: number;
    padding: number;
    align: 'left' | 'center' | 'right';
    iconKey?: string;
    iconSpacing: number;
    fixedWidth: boolean;
    autoFontResize: boolean;
    maxFontSize: number;
    minFontSize: number;
  };

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    config: Partial<{
      width: number;
      height: number;
      fontSize: number;
      fontFamily: string;
      textColor: string;
      backgroundColor: number;
      backgroundAlpha: number;
      cornerRadius: number;
      padding: number;
      align: 'left' | 'center' | 'right';
      iconKey: string;
      iconSpacing: number;
      fixedWidth: boolean;
      autoFontResize: boolean;
      maxFontSize: number;
      minFontSize: number;
    }> = {}
  ) {
    super(scene, x, y);

    this.config = {
      width: config.width ?? 200,
      height: config.height ?? 0, // dynamic height
      fontSize: config.fontSize ?? 20,
      fontFamily: config.fontFamily ?? 'Arial',
      textColor: config.textColor ?? '#ffffff',
      backgroundColor: config.backgroundColor ?? 0x000000,
      backgroundAlpha: config.backgroundAlpha ?? 0.8,
      cornerRadius: config.cornerRadius ?? 10,
      padding: config.padding ?? 10,
      align: config.align ?? 'center',
      iconKey: config.iconKey,
      iconSpacing: config.iconSpacing ?? 8,
      fixedWidth: config.fixedWidth ?? false,
      autoFontResize: config.autoFontResize ?? true,
      maxFontSize: config.maxFontSize ?? 24,
      minFontSize: config.minFontSize ?? 10,
    };

    this.background = scene.add.graphics();
    this.add(this.background);

    if (this.config.iconKey) {
      this.icon = scene.add.image(0, 0, this.config.iconKey).setOrigin(0, 0.5).setScale(1);
      this.add(this.icon);
    }

    this.textObject = scene.add.text(0, 0, text, {
      fontSize: `${this.config.fontSize}px`,
      fontFamily: this.config.fontFamily,
      color: this.config.textColor,
      wordWrap: {
        width: this.config.fixedWidth ? this.config.width! - this.config.padding * 2 - (this.icon ? this.icon.width + this.config.iconSpacing : 0) : undefined,
        useAdvancedWrap: true,
      },
      align: this.config.align,
    });
    this.textObject.setOrigin(0.0, 0.0);
    this.add(this.textObject);

    this.redraw();

    scene.add.existing(this);
  }

  private redraw() {
    const pad = this.config.padding;
    const spacing = this.icon ? this.config.iconSpacing : 0;
    const iconWidth = this.icon ? this.icon.displayWidth + spacing : 0;

    if (this.config.fixedWidth) {
      const targetWidth = this.config.width! - pad * 2 - iconWidth;
      if (this.config.autoFontResize) {
        this.resizeFontToFit(targetWidth);
      }
      this.textObject.setWordWrapWidth(targetWidth, true);
    }

    const textBounds = this.textObject.getBounds();
    const totalWidth = this.config.fixedWidth ? this.config.width! : textBounds.width + pad * 2 + iconWidth;
    const totalHeight = textBounds.height + pad * 2;

    // Draw rounded background
    this.background.clear();
    this.background.fillStyle(this.config.backgroundColor, this.config.backgroundAlpha);
    this.background.fillRoundedRect(-totalWidth / 2, -totalHeight / 2, totalWidth, totalHeight, this.config.cornerRadius);

    // Text alignment
    let textX = -totalWidth / 2 + pad + iconWidth;
    if (this.config.align === 'center') {
      textX = -textBounds.width / 2 + iconWidth / 2;
    } else if (this.config.align === 'right') {
      textX = totalWidth / 2 - pad - textBounds.width;
    }

    this.textObject.setX(textX);
    this.textObject.setY(-textBounds.height / 2);

    if (this.icon) {
      this.icon.setX(textX - spacing - this.icon.displayWidth);
      this.icon.setY(0);
    }

    this.setSize(totalWidth, totalHeight);
  }

  private resizeFontToFit(maxWidth: number) {
    let fontSize = this.config.maxFontSize;
    while (fontSize >= this.config.minFontSize) {
      this.textObject.setFontSize(fontSize);
      const metrics = this.textObject.getBounds();
      
      if (metrics.width <= maxWidth) break;
      fontSize -= 1;
    }
  }

  public setText(newText: string) {
    this.textObject.setText(newText);
    this.redraw();
  }

  public setBackgroundColor(color: number, alpha: number = 1) {
    this.config.backgroundColor = color;
    this.config.backgroundAlpha = alpha;
    this.redraw();
  }

  public setTextColor(color: string) {
    this.config.textColor = color;
    this.textObject.setColor(color);
  }

  public setFontSize(size: number) {
    this.config.fontSize = size;
    this.textObject.setFontSize(size);
    this.redraw();
  }

  public setInteractiveLabel(callback: () => void) {
    this.setInteractive(new Phaser.Geom.Rectangle(-this.width / 2, -this.height / 2, this.width, this.height), Phaser.Geom.Rectangle.Contains);
    this.on('pointerdown', callback);
    this.on('pointerover', () => this.setBackgroundColor(0x666666, 1));
    this.on('pointerout', () => this.setBackgroundColor(this.config.backgroundColor, this.config.backgroundAlpha));
  }
}




