import { PanelComponent, PanelHideOption, PanelShowOption } from "../../../scripts/framework/lib/router/PanelComponent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePrefab extends PanelComponent {
    
    show(option: PanelShowOption): void {
        throw new Error("Method not implemented.");
    }
    hide(option: PanelHideOption): void {
        throw new Error("Method not implemented.");
    }


}
