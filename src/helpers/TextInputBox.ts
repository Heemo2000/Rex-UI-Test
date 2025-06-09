import Phaser from "phaser";

export default class TextInputBox extends Phaser.GameObjects.Container {
    private background: Phaser.GameObjects.Rectangle;
    private textObject: Phaser.GameObjects.Text;
    private cursor: Phaser.GameObjects.Text;
    private placeholder: Phaser.GameObjects.Text;
    private value: string = '';
    private maxLength: number;
    private isFocused: boolean = false;
    private blinkTimer?: Phaser.Time.TimerEvent;
    private fontFamily: string = 'Arial';
    private tempText: Phaser.GameObjects.Text;
    private cursorPosition: number = 0; // Track cursor position within text
    
    constructor(
        scene: Phaser.Scene, 
        x: number, 
        y: number, 
        width: number = 300, 
        height: number = 40, 
        maxLength: number = 50,
        fontSize: string = '18px',
        fontFamily: string = 'Arial',
        placeholderText: string = 'Enter text...'
    ) {
        super(scene, x, y);
        this.maxLength = maxLength;
        this.width = width;
        this.height = height;
        this.fontFamily = fontFamily;
        this.cursorPosition = 0;
        // Background with rounded corners
        this.background = scene.add.rectangle(x, y, width, height, 0xf0f0f0)
            .setStrokeStyle(2, 0x4e342e)
            .setInteractive();
            
        
        
        // Add subtle shadow effect
        const shadow = scene.add.rectangle(x + 2, y + 2, width, height, 0x000000, 0.2);
        
        
        // Placeholder text
        this.placeholder = scene.add.text(x -width / 2 + 10, y -height / 2 + 10, placeholderText, {
            fontSize: fontSize,
            color: '#999999',
            fontFamily: fontFamily,
            fontStyle: 'italic'
        });

        // Text
        this.textObject = scene.add.text(x -width / 2 + 10, y-height / 2 + 10, '', {
            fontSize: fontSize,
            color: '#333333',
            fontFamily: this.fontFamily,
            wordWrap: { width: width - 20 }
        });

        // Cursor
        this.cursor = scene.add.text(x -width / 2 + 10, y-height / 2 + 10, '|', {
            fontSize: fontSize,
            color: '#333333',
            fontFamily: this.fontFamily
        });

        //Temp text
        this.tempText = this.scene.add.text(this.x, this.y, placeholderText, {
                fontSize: this.textObject.style.fontSize,
                fontFamily: this.textObject.style.fontFamily
            });

        this.tempText.setVisible(false);

        this.cursor.setVisible(false); // Initially hidden

        this.add([shadow, this.background, this.placeholder, this.textObject, this.cursor]);
        scene.add.existing(this);

        // Make the background interactive
        this.background.on('pointerdown', () => {
            this.setFocus(true);
        });

        // Blur when clicked outside
        scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            if (this.isFocused && !this.background.getBounds().contains(pointer.x, pointer.y)) {
                this.setFocus(false);
            }
            else if(this.isFocused && this.background.getBounds().contains(pointer.x, pointer.y))
            {
                this.setFocus(true);
            }
        });

        // Keyboard input
        scene.input.keyboard?.on('keydown', (event: KeyboardEvent) => {
            if (!this.isFocused) return;

            if (event.key === 'Backspace') {
                if (this.cursorPosition > 0) {
                    // Remove character before cursor
                    this.value = this.value.substring(0, this.cursorPosition - 1) + 
                                this.value.substring(this.cursorPosition);
                    this.cursorPosition--;
                }
            } else if (event.key === 'ArrowLeft') {
                // Move cursor left
                if (this.cursorPosition > 0) {
                    this.cursorPosition--;
                    this.updateCursorPosition();
                }
            } else if (event.key === 'ArrowRight') {
                // Move cursor right
                if (this.cursorPosition < this.value.length) {
                    this.cursorPosition++;
                    this.updateCursorPosition();
                }
            } else if (event.key.length === 1 && this.value.length < this.maxLength) {
                if (/^[a-zA-Z0-9 .,!?@#$%^&*()-=_+[\]{}|;:'",.<>/?\\]$/.test(event.key)) {
                    // Insert character at cursor position
                    this.value = this.value.substring(0, this.cursorPosition) + 
                                event.key + 
                                this.value.substring(this.cursorPosition);
                    this.cursorPosition++;
                }
            }

            this.textObject.setText(this.value);
            this.updateCursorPosition();
            this.updatePlaceholderVisibility();
        });

        this.updateCursorPosition();
        this.updatePlaceholderVisibility();
    }

    private updateCursorPosition() {
        // Base position (left edge of text area)
        const baseX = this.x -this.width / 2 + 10;
        const baseY = this.y -this.height / 2 + 10;
        
        if (this.value.length === 0 || this.cursorPosition === 0) {
            // If no text or cursor at start, position at the start
            this.cursor.setPosition(baseX, baseY);
        } else {
            // Get the width of the text up to the cursor position
            const textBeforeCursor = this.value.substring(0, this.cursorPosition);
            
            this.tempText.text = textBeforeCursor;
            
            const textWidth = this.tempText.width;
            //tempText.destroy(); // Clean up the temporary object
            
            // Position cursor at the calculated position
            this.cursor.setPosition(baseX + textWidth + 1, baseY);
        }
    }

    private updatePlaceholderVisibility() {
        this.placeholder.setVisible(this.value.length === 0 && !this.isFocused);
    }

    private startCursorBlink() {
        this.stopCursorBlink(); // Clear previous
        this.blinkTimer = this.scene.time.addEvent({
            delay: 500,
            loop: true,
            callback: () => {
                this.cursor.setVisible(!this.cursor.visible);
            }
        });
    }

    private stopCursorBlink() {
        this.blinkTimer?.remove();
        this.blinkTimer = undefined;
        this.cursor.setVisible(false);
    }

    public getValue(): string {
        return this.value;
    }

    public setValue(newValue: string): void {
        this.value = newValue.slice(0, this.maxLength);
        this.cursorPosition = this.value.length; // Set cursor at the end
        this.textObject.setText(this.value);
        this.updateCursorPosition();
        this.updatePlaceholderVisibility();
    }

    // Method to handle focus state changes
    private setFocus(focused: boolean): void {
        this.isFocused = focused;
        
        if (focused) {
            this.cursor.setVisible(true);
            this.startCursorBlink();
            this.updatePlaceholderVisibility();
            
            // Visual feedback on focus
            this.background.setFillStyle(0xffffff);
            this.background.setStrokeStyle(2, 0x7b5e57);
            
            // Set cursor to end of text when gaining focus
            this.cursorPosition = this.value.length;
            this.updateCursorPosition();
        } else {
            this.cursor.setVisible(false);
            this.stopCursorBlink();
            this.updatePlaceholderVisibility();
            
            // Reset visual style on blur
            this.background.setFillStyle(0xf0f0f0);
            this.background.setStrokeStyle(2, 0x4e342e);
        }
    }
}
