import {Application, IAssetsDictionary} from "./Application";
/**
 * Class description
 *
 * created on 2017-04-19
 * @author jowa
 */
export class BigWin extends Application {
private i:number;
private textures:any;
private requestAnimationFrame:any;
    constructor() {
        let assets: IAssetsDictionary = {
            "bw-intro": "animations/bw-intro.json"
        };

        super(assets, "../media/");

    }


    protected initAnimations(): void {
        debugger;
        super.initAnimations();
        this.requestAnimationFrame = (this.gameLoop)
        {
          requestAnimationFrame(this.gameLoop);
        };
        let textStyle: PIXI.TextStyleOptions = {
            "fontFamily": "Futura LT",
            "fontSize": "40px",
            "fontWeight": "400",
            "fill": "#00FF00"
        };

        let winStateText: PIXI.Text = new PIXI.Text("BIG WIN", textStyle);
        winStateText.anchor.set(0.5, 0.5);
        winStateText.style.fill = 0xEAB348;
        winStateText.position.set(this._stageWidth * 0.5, this._stageHeight * 0.5 - 160);
        this._foregroundLayer.addChild(winStateText);

        let bidStateText: PIXI.Text = new PIXI.Text("0", textStyle);
        bidStateText.anchor.set(0.5, 0.5);
        bidStateText.style.fill = 0xEAB348;
        bidStateText.position.set(this._stageWidth * 0.5, this._stageHeight * 0.6);
        this._foregroundLayer.addChild(bidStateText);
        this.i=0;
        this.gameLoop();


    }

    protected gameLoop(): void{
      this.i++;
      this.textures = this.getTextures("bw-intro");
      let sprite: PIXI.Sprite = new PIXI.Sprite(this.textures[this.i]);
      sprite.anchor.set(0.5, 0.5);
      sprite.position.set(this._stageWidth * 0.5, this._stageHeight * 0.6);
      this._foregroundLayer.addChild(sprite);
        this.requestAnimationFrame();

    }
}
