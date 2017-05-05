import PIXI = require("pixi.js");
import {BasicStageConfig} from "./config/BasicStageConfig";
import {StageManager} from "./core/StageManager";


export interface IAssetsDictionary {
  [index: string]: string;
}
/**
 * A base application class that has a basic loader set up.
 *
 * Created: 2017-01-03
 * @author jonas
 */
export class Application {
  protected _resources: PIXI.loaders.IResourceDictionary;
  protected _backgroundLayer: PIXI.Container;
  protected _foregroundLayer: PIXI.Container;
  protected _stageWidth: number;
  protected _stageHeight: number;
  protected _baseUrl: string;
  protected _textures: PIXI.loaders.Resource;



  constructor(assets?: IAssetsDictionary, baseUrl: string = "") {
    this._baseUrl = baseUrl;
    this._stageWidth = BasicStageConfig.stageWidth;
    this._stageHeight = BasicStageConfig.stageHeight;
    this._backgroundLayer = StageManager.getLayer(BasicStageConfig.LAYER_BACK_GROUND);
    this._foregroundLayer = StageManager.getLayer(BasicStageConfig.LAYER_FORE_GROUND);
    

    this.loadAssets(assets);
    document.addEventListener('keydown', (event: KeyboardEvent) => this.onKeyDown(event));
  }

  private loadAssets(assets?: IAssetsDictionary) {
    if (assets) {
      let loader = PIXI.loader;
      for (let assetName in assets) {
        loader.add(assetName, this._baseUrl + assets[assetName]);
      }
      loader.load((loader: PIXI.loaders.Loader, resources: PIXI.loaders.IResourceDictionary) => this.onAssetsLoaded(loader, resources));
    }
    else {
      this.initAnimations();
    }

  }

  private onAssetsLoaded(loader: PIXI.loaders.Loader, resources: PIXI.loaders.IResourceDictionary) {
    this._resources = resources;
    this.initAnimations();
    this.createSpriteFrames();
  }




  protected initAnimations(): void {
    let gfx = new PIXI.Graphics();
    gfx.beginFill(0x777799, 1);
    gfx.drawRect(0, 0, this._stageWidth, this._stageHeight);
    gfx.endFill();
    this._backgroundLayer.addChild(gfx);
  }

  protected createSpriteFrames(): void {
    // create an array of textures from an image path
    let frames = [];

    for (let i = 27; i < 48; i++) {
      frames.push(PIXI.Texture.fromFrame('BW_000' + i + '.png'));
    }
    // create an AnimatedSprite (brings back memories from the days of Flash, right ?)
    let anim = new PIXI.extras.AnimatedSprite(frames);
    /*
     * An AnimatedSprite inherits all the properties of a PIXI sprite
     * so you can change its position, its anchor, mask it, etc
     */
    anim.x = 345;
    anim.y = 345;
    anim.scale.set(0.8);
    anim.anchor.set(0.5);
    anim.animationSpeed = 0.1;
    anim.scale.set(0.75 + Math.random() * 0.5);
    anim.play();
    this._foregroundLayer.addChild(anim);

  }

  public getTexture(name: string): PIXI.Texture {
    return this._resources[name].texture;
  }

  public getTextures(name: string): PIXI.Texture[] {
    let asset: PIXI.loaders.Resource = this._resources[name];
    let textures: PIXI.Texture[] = [];
    for (let textureName in asset.textures) {
      textures.push(asset.textures[textureName]);
    }
    return textures;
  }


  protected onKeyDown(event: KeyboardEvent) {
    //If you want keyboard input override this function.
  }
}
