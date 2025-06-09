import Phaser from "phaser";


export default class ClickableButton extends Phaser.GameObjects.Container
{
    private background: Phaser.GameObjects.Image;
    private label: Phaser.GameObjects.Text;
    private clickCallback: ()=> void;

    public constructor(scene: Phaser.Scene, x: number, y: number, textureName: string, text: string, scale: number, clickCallback: ()=> void)
    {
        super(scene, x, y);
        this.background = scene.add.image(x,y,textureName).setInteractive({ useHandCursor: true});
        
        this.background.setScale(scale);

        this.label = scene.add.text(x,y, text, {
                                    fontSize: "16px",
                                    color: "#000",
                                    font: "style-font"
                                    }).setOrigin(0.5);
        
        this.clickCallback = clickCallback;
        
        this.add([this.background, this.label]);
        
        scene.add.existing(this);

        this.setSize(this.background.width, this.background.height);
        this.background.setInteractive(new Phaser.Geom.Rectangle(
            -this.width / 2, -this.height / 2, this.width, this.height
        ), Phaser.Geom.Rectangle.Contains);

        this.background.on('pointerover', () => {
            console.log("Pointer Over");
            this.setHighlight(true);
            scene.input.setDefaultCursor('pointer');
        });
        this.background.on('pointerout', () => {
            console.log("Pointer Out");
            this.setHighlight(false);
            scene.input.setDefaultCursor('default');
        });

        this.background.on('pointerdown', ()=> {
            console.log("Pointer Down");
            this.clickCallback();
        });
    }

    public setHighlight(value: boolean): void
    {
        if(value == true)
        {
            this.background.alpha = 0.5;
        }
        else
        {
            this.background.alpha = 1.0;
        }
    }

    public setClickCallback(callback: ()=> void)
    {
        this.clickCallback = callback;
    }

    public manuallyInvokeClick()
    {
        this.clickCallback();
    }
}