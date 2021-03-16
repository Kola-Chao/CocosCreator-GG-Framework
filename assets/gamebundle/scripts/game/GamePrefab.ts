import { ToastPanelShowArgs } from "../../../commonbundle/scripts/popwindow/ToastPanelPrefab";
import { PanelConfigs } from "../../../mainbundle/scripts/configs/PanelConfigs";
import { gg } from "../../../scripts/framework/gg";
import { PanelComponent, PanelHideOption, PanelShowOption } from "../../../scripts/framework/lib/router/PanelComponent";
import { GameConst } from "./GameConst";
import { GameEvent } from "./GameEvent";
import GameModel from "./GameModel";
import GameModule from "./GameModule";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePrefab extends PanelComponent {

    @property(cc.Node)
    headInfo: cc.Node = null;
    @property(cc.Node)
    TabPlayer: cc.Node = null;
    @property(cc.Node)
    TabBag: cc.Node = null;
    @property(cc.Node)
    TabBattle: cc.Node = null;

    lv: cc.Label = null;
    userName: cc.Label = null;
    hp: cc.ProgressBar = null;
    exp: cc.ProgressBar = null;
    hpLabel: cc.Label = null;
    expLabel: cc.Label = null;
    gold: cc.Label = null;

    show(option: PanelShowOption): void {
        option.onShowed();
        //     // 默认播放loading动画
        //     this._playPanelShowAnim(() => {
        //         option.onShowed();
        //     });

        this._initGame();
    }

    hide(option: PanelHideOption): void {
        option.onHided();
        // this._playPanelHideAnim(() => {
        //     option.onHided();
        // });
    }

    private async _initGame() {
        if (this.headInfo) {
            this.lv = this.headInfo.getChildByName("Lv").getComponent(cc.Label);
            // this.userName = this.headInfo.getChildByName("Name").getComponent(cc.Label);
            this.hp = this.headInfo.getChildByName("HP").getComponent(cc.ProgressBar);
            this.hpLabel = this.hp.node.getChildByName("HpLabel").getComponent(cc.Label);
            this.exp = this.headInfo.getChildByName("EXP").getComponent(cc.ProgressBar);
            this.expLabel = this.exp.node.getChildByName("ExpLabel").getComponent(cc.Label);
            this.refreshHeadInfo();
        } else {
            gg.logger.warn("获取headInfo出错");
        }
        gg.eventManager.on(GameEvent.OnClickBagTab, this.onTabBagClicked, this);
        gg.eventManager.on(GameEvent.OnClickBattleTab, this.onTabBattleClicked, this);
        gg.eventManager.on(GameEvent.OnClickPlayerTab, this.onTabPlayerClicked, this);

        this.TabBag.on(cc.Node.EventType.TOUCH_END, this.onClickTabBag, this);
        this.TabBattle.on(cc.Node.EventType.TOUCH_END, this.onClickTabBattle, this);
        this.TabPlayer.on(cc.Node.EventType.TOUCH_END, this.onClickTabPlayer, this);

    }

    refreshHeadInfo() {
        let myHpLabel = GameModule.data.userHp / 100;
        let myExpLabel = GameModule.data.userExp / 100;
        this.lv.string = GameModule.data.userLv.toString();
        this.hp.progress = myHpLabel;
        this.exp.progress = myExpLabel;
        this.hpLabel.string = myHpLabel.toString();
        this.expLabel.string = myExpLabel.toString();
    }

    onClickStart() {

    }

    onClickTabPlayer() {
        gg.eventManager.emit(GameEvent.OnClickPlayerTab);
    }

    onClickTabBag() {
        gg.eventManager.emit(GameEvent.OnClickBagTab);
    }

    onClickTabBattle() {
        gg.eventManager.emit(GameEvent.OnClickBattleTab);
    }

    onTabPlayerClicked() {
        gg.panelRouter.show({
            panel: PanelConfigs.toastPanel,
            data: <ToastPanelShowArgs>{
                text: "onTabPlayerClicked",
            },
        })
    }

    onTabBagClicked() {
        gg.panelRouter.show({
            panel: PanelConfigs.toastPanel,
            data: <ToastPanelShowArgs>{
                text: "onTabBagClicked",
            },
        })
    }

    onTabBattleClicked() {
        gg.panelRouter.show({
            panel: PanelConfigs.toastPanel,
            data: <ToastPanelShowArgs>{
                text: "onTabBattleClicked",
            },
        })
    }
}
