// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { gg } from "../../../scripts/framework/gg";
import { GameConst } from "./GameConst";
import GameModel from "./GameModel";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameModule {

    static data: GameModel = null;

    static initGameInfo() {
        let gameInfo = gg.storage.getItem(GameConst.UserInfo);
        if (gameInfo == null || gameInfo == "") {
            this.data = new GameModel();
        } else {
            try {
                this.data = new GameModel().fromJSON(JSON.parse(gameInfo));
            } catch (error) {
                gg.logger.error("解析游戏信息时失败", error);
                gg.logger.error("将游戏信息");
                this.data = new GameModel();
            }
        }
        gg.logger.log("游戏信息", this.data);
    }

     /**
     * 保存游戏信息
     */
      static saveGameInfo() {
        this.data && gg.storage.setItem(GameConst.UserInfo, this.data.toJsonString());
    }
}
