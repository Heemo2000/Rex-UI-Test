import Phaser from "phaser";
import ClickableButton from "../helpers/ClickableButton";
import TextInputBox from "../helpers/TextInputBox";



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
            150, 
            250, 
            50, 
            15, 
            "30px",
            "Arial", 
            "Enter-text-here", 
        );
        textInputBox.setName('textInputBox'); // Add this line to give it a name
    }

	private showButtonIsClicked() : void
	{
		console.log("Button is clicked");
	}
}
