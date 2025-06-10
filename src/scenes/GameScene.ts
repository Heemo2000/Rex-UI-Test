import Phaser from "phaser";
import ClickableButton from "../helpers/ClickableButton";
import TextInputBox from "../helpers/TextInputBox";
import Label from "../helpers/Label";


export default class GameScene extends Phaser.Scene
{
	
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

		let clickBtn = new ClickableButton(this, 80, 100, "button-orange", "CLick me", 0.2, this.showButtonIsClicked.bind(this));
        clickBtn;
        // Create a TextInputBox with a custom outline color
        let textInputBox = new TextInputBox(
            this, 
            80, 
            50, 
            250, 
            50, 
            15, 
            "30px",
            "Arial", 
            "Enter-text-here", 
        );
        textInputBox.setName('textInputBox'); // Add this line to give it a name

        const label = new Label(this, 150, 300, 'I just love trance music. It heals your soul.', {
          backgroundColor: 0x223344,
          textColor: '#fff000',
          fontSize: 20,
          padding: 12,
          cornerRadius: 5,
          align: 'center',
          fixedWidth: true,
          width: 250,
          autoFontResize: true,
          backgroundAlpha: 0.5,
        });
    
        this.add.existing(label);
    
        // label.setInteractiveLabel(() => {
        //   label.setText('Clicked!');
        // });
    }

	private showButtonIsClicked() : void
	{
		console.log("Button is clicked");
	}
}
