import {Application, IAssetsDictionary} from "./Application";

/**
 * Class description
 *
 * created on 2017-05-07
 * @author Mohamed Shanil
 */
export class BigWin extends Application {

    protected bidStateText: PIXI.Text;
    protected winStateText: PIXI.Text;
    protected initailWinAmount: number;
    protected finalWinAmount: number;
    protected betAmount: number;
    protected betRatio: number;
    protected counter: number;
    protected winMessages: any;

    constructor(messages:any) {
        let assets: IAssetsDictionary = {
            "bw-intro": "animations/bw-intro.json"
        };
        super(assets, "../media/");
        this.winMessages = messages;
    }

  protected initAnimations(): void {
        super.initAnimations();
        this.initailWinAmount = 0;
        this.finalWinAmount = 1000;
        this.betAmount = 10;
        this.betRatio = 0;;
        this.counter = 0;

        let textStyle: PIXI.TextStyleOptions = {
            "fontFamily": "Futura LT",
            "fontSize": "40px",
            "fontWeight": "400",
            "fill": "#00FF00"
        };

        this.winStateText = new PIXI.Text("", textStyle);
        this.winStateText.anchor.set(0.5, 0.5);
        this.winStateText.style.fill = 0xEAB348;
        this.winStateText.position.set(this._stageWidth * 0.5, this._stageHeight * 0.5 - 170);
        this._foregroundLayer.addChild(this.winStateText);

        this.bidStateText = new PIXI.Text("0", textStyle);
        this.bidStateText.anchor.set(0.5, 0.5);
        this.bidStateText.style.fill = 0xEAB348;
        this.bidStateText.position.set(this._stageWidth * 0.5, this._stageHeight * 0.8);
        this._foregroundLayer.addChild(this.bidStateText);
        this.incrementCount();
    }

    protected createSpriteFrames(): void{
      let frames = [];
      for (let i = 27; i < 48; i++) {
        frames.push(PIXI.Texture.fromFrame('BW_000' + i + '.png'));
      }
      let anim = new PIXI.extras.AnimatedSprite(frames);
      anim.x = 640;
      anim.y = 445;
      anim.scale.set(0.8);
      anim.anchor.set(0.5);
      anim.animationSpeed = 0.1;
      anim.play();
      this._foregroundLayer.addChild(anim);
    }

    public incrementCount() : void{
      let range = this.counter / this.betAmount;
      if(this.counter === 1000){
        this.counter = 0;
      }
      if (range < 15) {
        this.winStateText.text = "";
      } else if (range >= 15 && range <= 30) {
        this.winStateText.text = this.winMessages.BIG_WIN;
      }
      else if (range > 30 && range <= 60) {
        this.winStateText.text = this.winMessages.MEGA_WIN;
      }
      else {
        this.winStateText.text = this.winMessages.SUPER_MEGA_WIN;
      }
      this.bidStateText.text = this.counter.toString();
      this.counter++;
      requestAnimationFrame(() => this.incrementCount());
    }

}
