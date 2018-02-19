import * as http from "http";
import * as qs from "querystring";
import { doCommand, ICommand } from "./commands";

const httpServer = http.createServer((a, b) => onHttp(a, b));

async function onHttp(request: http.IncomingMessage, response: http.ServerResponse): Promise<void> {
    const url = request.url.toLowerCase();

    if (url === "/ifttt") {
        if (request.method === "POST") {
            const data = await processIFTTTRequest(request);
            response.writeHead(200, { "Content-Type": "text/text" });
            response.end();

            const command = JSON.parse(data) as ICommand;
            doCommand(command);
        }
    } else if (url === "/ifttt/test") {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write("<!DOCTYPE 'html'>");
        response.write("<html>");
        response.write("<body>");
        response.write("<form method='post' action='/ifttt'>");
        response.write("<input type='text' name='command'>");
        response.write("<input type='submit' value='Submit'>");
        response.write("</form>");
        response.write("</body>");
        response.write("</html>");
        response.end();
    } else {
        response.writeHead(404, { "Content-Type": "text/html" });
        response.write("<!DOCTYPE 'html'>");
        response.write("<html>");
        response.write("<body>");
        response.write("File not found.");
        response.write("</body>");
        response.write("</html>");
        response.end();
    }
}

function processIFTTTRequest(request: http.IncomingMessage): Promise<string> {
    return new Promise((resolve, reject) => {
        let body = "";
        request.on("data", (data: string) => {
            body += data;
            if (body.length > 1e6) {
                reject();
            }
        });
        request.on("end", function () {
            try {
                resolve(body);
            } catch (ex) {
                try {
                    const test = qs.parse(body);
                    resolve(test.toString());
                } catch (ex2) {
                    reject();
                }
            }
        });
    });
}

export function run(port: number): number {
    httpServer.listen(port);
    return httpServer.address().port;
}