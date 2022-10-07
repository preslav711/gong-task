import * as PIXI from "pixi.js";

export class Main {
    private static readonly GAME_WIDTH = 800;
    private static readonly GAME_HEIGHT = 600;

    private app!: PIXI.Application;

    constructor() {
        window.onload = (): void => {
            this.startLoadingAssets();
        };
    }

    // add for the test example purpose
    public helloWorld(): string {
        return "hello world";
    }

    private startLoadingAssets(): void {
        const loader = PIXI.Loader.shared;
        loader.add("rabbit", "./assets/rabbit.png");

        loader.onComplete.once(() => {
            this.onAssetsLoaded();
        });
        //
        loader.load();
    }

    private onAssetsLoaded(): void {
        this.createRenderer();

        const stage = this.app.stage;

        const bunny = this.getBunny();
        bunny.position.set(Main.GAME_WIDTH / 2, Main.GAME_HEIGHT / 2);

        stage.addChild(bunny);

        this.app.ticker.add(() => {
            bunny.rotation += 0.05;
        });
    }

    private createRenderer(): void {
        this.app = new PIXI.Application({
            backgroundColor: 0xd3d3d3,
            width: Main.GAME_WIDTH,
            height: Main.GAME_HEIGHT,
        });

        document.body.appendChild(this.app.view);

        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        this.app.stage.scale.x = window.innerWidth / Main.GAME_WIDTH;
        this.app.stage.scale.y = window.innerHeight / Main.GAME_HEIGHT;

        window.addEventListener("resize", this.onResize.bind(this));
    }

    private onResize(): void {
        if (!this.app) {
            return;
        }

        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        this.app.stage.scale.x = window.innerWidth / Main.GAME_WIDTH;
        this.app.stage.scale.y = window.innerHeight / Main.GAME_HEIGHT;
    }

    private getBunny(): PIXI.Sprite {
        const bunnyRotationPoint = {
            x: 0.5,
            y: 0.5,
        };

        const bunny = new PIXI.Sprite(PIXI.Texture.from("rabbit"));
        bunny.anchor.set(bunnyRotationPoint.x, bunnyRotationPoint.y);
        bunny.scale.set(2, 2);

        return bunny;
    }
}

new Main();
