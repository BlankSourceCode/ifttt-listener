import { TVController } from "./tvController";

export interface ICommand {
    command: string
}

let tvController: TVController;

export function doCommand(msg: ICommand): void {
    if (!tvController) {
        tvController = new TVController('192.168.0.106');
    }

    switch (msg.command) {
        case "volumeup":
            tvController.sendRepeatCommand("KEY_VOLUP", 5, 400);
            break;
        case "volumedown":
            tvController.sendRepeatCommand("KEY_VOLDOWN", 5, 400);
            break;
        case "poweroff":
            tvController.sendCommand("KEY_POWEROFF");
            break;
    }

}