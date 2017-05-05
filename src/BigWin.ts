import {Application, IAssetsDictionary} from "./Application";
/**
 * Class description
 *
 * created on 2017-04-19
 * @author jowa
 */
export class BigWin extends Application {

  protected bidStateText: PIXI.Text;
  protected winStateText: PIXI.Text;
  protected initailWinAmount: number;
  protected finalWinAmount: number;
  protected betAmount: number;
  protected betRatio: number;
  protected counter: number;

    constructor() {
        let assets: IAssetsDictionary = {
            "bw-intro": "animations/bw-intro.json"
        };
          super(assets, "../media/");

        // this.bidStateText.text ="";
        //   this.winStateText.text ="";


    }



    protected initAnimations(): void {debugger;

      //  super.initAnimations();

      this.initailWinAmount= 0;
      this.finalWinAmount = 1000;
      this.betAmount =10;
      this.betRatio= 0;;
      this.counter =0;

        let textStyle: PIXI.TextStyleOptions = {
            "fontFamily": "Futura LT",
            "fontSize": "40px",
            "fontWeight": "400",
            "fill": "#00FF00"
        };

        this.winStateText = new PIXI.Text("", textStyle);
        this.winStateText.anchor.set(0.5, 0.5);
        this.winStateText.style.fill = 0xEAB348;
        this.winStateText.position.set(this._stageWidth * 0.5, this._stageHeight * 0.5 - 120);
        this._foregroundLayer.addChild(this.winStateText);

        this.bidStateText = new PIXI.Text("0", textStyle);
        this.bidStateText.anchor.set(0.5, 0.5);
        this.bidStateText.style.fill = 0xEAB348;
        this.bidStateText.position.set(this._stageWidth * 0.5, this._stageHeight * 2.6);
        this._foregroundLayer.addChild(this.bidStateText);
            this.incrementCount();


    }


    public incrementCount(this:any):void{

      if(this.counter === 1000){
        // TODO
      }
        if((this.counter/ this.betAmount) < 15){
          this.winStateText.text = "";
        } else if((this.counter/ this.betAmount) >= 15 && (this.counter/ this.betAmount) <= 30){
            this.winStateText.text ="BIG WIN";
        }
        else if((this.counter/ this.betAmount) > 30 && (this.counter/ this.betAmount) <= 60){
            this.winStateText.text ="MEGA WIN";
        }
        else {
          this.winStateText.text ="SUPER MEGA WIN";
        }
        this.counter++;
        this.bidStateText.text = this.counter.toString();
      requestAnimationFrame(()=>this.incrementCount());



    }



}
