import * as SamsungRemote from "samsung-remote";

export class TVController {
    private _remote: SamsungRemote;

    constructor(ip: string) {
        this._remote = new SamsungRemote({ ip: ip });
    }

    public sendCommand(command: string): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log(`Sending command: ${command}`)
            this._remote.send(command, function callback(err: any) {
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve();
                }
            });
        });
    }

    public async sendRepeatCommand(command: string, repeatCount: number, delay: number): Promise<any> {
        for (let i = 0; i < repeatCount; i++) {
            await this.sendCommand(command);
            await this.sleep(delay);
        }
    }

    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
