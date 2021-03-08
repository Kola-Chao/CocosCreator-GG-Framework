// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameModel {
    /**
     * 玩家等级
     */
    userLv: number = 0;

    userHp: number = 100;

    userExp: number = 0;

    userGold: number = 0;

    fromJSON(json: any): GameModel {
        this.userLv = json.userLv;
        this.userHp = json.userHp;
        this.userExp = json.userExp;
        this.userGold = json.userGold;
        return this;
    }

    toJSON() {
        let json = {};
        /**
         * Object.assign(target, source);
         * 把source对象更新，添加到targed对象
         */
        json = Object.assign(json, this);
        return json;
    }

    toJsonString() {
        return JSON.stringify(this.toJSON());
    }
}
