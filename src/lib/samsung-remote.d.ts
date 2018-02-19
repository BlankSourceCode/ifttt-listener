declare module "samsung-remote" {
    class SamsungRemote {
        constructor(options: { ip: string });
        send(command: string, callback: (err?: string) => void): void;
        isAlive(callback: (err?: string) => void): void;
    }

    module SamsungRemote { }
    export = SamsungRemote;
}
