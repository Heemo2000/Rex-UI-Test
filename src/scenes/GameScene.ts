import Phaser from "phaser";
import type InputText from "phaser3-rex-plugins/plugins/inputtext";
import type Label from "phaser3-rex-plugins/templates/ui/label/Label";
import ClickableButton from "../helpers/ClickableButton";
import TextInputBox from "../helpers/TextInputBox";

const defaultColor = 0xcccccc;   // Grey
const hoverColor = 0xdddddd;     // Light grey
const pressedColor = 0xaaaaaa;   // Darker grey
const strokeColor = 0x000000;    // Black outline

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;


export default class GameScene extends Phaser.Scene
{
	private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private dragStartPoint: Phaser.Math.Vector2 | null = null;

	private constructor()
	{
		super("game-scene");
		
	}

	public preload(): void
	{
		this.load.image("button-orange", "images/Glossy03.png");
		this.load.font("style-font", "fonts/KalamaykaVF.ttf", "truetype");
	}
    public create(): void
    {
		
        /*
        const inputText = this.add.rexInputText(100, 200, 50, 10, {
            type: 'text',
    		text: '',
    		fontSize: '16px',
    		color: '#000000', // Text color (black)
    		backgroundColor: '#ff3333',
    		border: 2,
            borderRadius: "10px", // Black outline
    		align: 'center',
			placeholder: "Enter text here",
    		// Style input element via CSS string
    		fontFamily: 'Arial',
    		paddingLeft: '4px',
			paddingTop: '8px',
    		outline: 'none',
    		})
    		.resize(200, 100)
    		.setOrigin(0.5);
			
        this.input.on('pointerdown', () => {
            inputText.setBlur();
            console.log('pointerdown outside');
        });

        inputText.on('keydown', (inputText: InputText, e: KeyboardEvent) => {
            if ((inputText.inputType !== 'textarea') && (e.key === 'Enter')) {
                inputText.setBlur();
            }
        });
		*/
		
		this.cameras.main.setBounds(-300, -300, 2000, 2000);

        // Example objects spread across the world
        this.add.rectangle(400, 300, 100, 100, 0x00ff00); // near start
        this.add.rectangle(1800, 1800, 200, 200, 0xff0000); // bottom-right
        this.add.rectangle(1000, 500, 150, 150, 0x0000ff); // somewhere in middle

        // Add debug text
        this.add.text(50, 50, 'Use arrow keys or drag with mouse', {
            fontSize: '18px',
            color: '#ffffff',
        }).setScrollFactor(0); // lock text to camera

        // Input setup
        this.cursors = this.input?.keyboard?.createCursorKeys();

        // Mouse drag setup
        // this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
        //     // Get a reference to the TextInputBox
        //     const textInputBox = this.children.getByName('textInputBox') as TextInputBox;
            
        //     // Check if the pointer is over the TextInputBox
        //     if (textInputBox && textInputBox.getBounds().contains(pointer.x, pointer.y)) {
        //         // Don't start dragging if clicking on the TextInputBox
        //         return;
        //     }
            
        //     this.dragStartPoint = new Phaser.Math.Vector2(
        //         pointer.x + this.cameras.main.scrollX,
        //         pointer.y + this.cameras.main.scrollY
        //     );
        // });

        // this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
        //     if (!pointer.isDown || !this.dragStartPoint) return;

        //     this.cameras.main.scrollX = this.dragStartPoint.x - pointer.x;
        //     this.cameras.main.scrollY = this.dragStartPoint.y - pointer.y;
        // });

        // this.input.on('pointerup', () => {
        //     this.dragStartPoint = null;
        // });

		let clickBtn = new ClickableButton(this, 100, 200, "button-orange", "CLick me", 0.2, this.showButtonIsClicked.bind(this));
        
        // Create a TextInputBox with a custom outline color
        let textInputBox = new TextInputBox(
            this, 
            100, 
            250, 
            250, 
            50, 
            15, 
            "30px", 
            "Enter-text-here", 
        );
        textInputBox.setName('textInputBox'); // Add this line to give it a name
    }

	// update() {
    //     // Keyboard camera movement
    //     const cam = this.cameras.main;

    //     if (this.cursors?.left?.isDown) {
    //         cam.scrollX -= 5;
    //     } else if (this.cursors?.right?.isDown) {
    //         cam.scrollX += 5;
    //     }

    //     if (this.cursors?.up?.isDown) {
    //         cam.scrollY -= 5;
    //     } else if (this.cursors?.down?.isDown) {
    //         cam.scrollY += 5;
    //     }
    // }

	private createButton(scene: Phaser.Scene, text: string, x: number, y: number, width: number, height: number, fontSize: number): Label
	{
		return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(x, y, width, height, 10).setStrokeStyle(2, COLOR_LIGHT),
        text: scene.add.text(0 , 0 , text, {
            fontSize: fontSize,
			color: "black"
        }).setOrigin(0.5),
        align: 'center'
    	}).layout();
	}

	private showButtonIsClicked() : void
	{
		console.log("Button is clicked");
	}
}
