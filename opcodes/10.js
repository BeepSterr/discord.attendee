const Opcode = require("../lib/opcode");

module.exports = class Hello extends Opcode {

    code = 10;
    #interval = 0;

    /**
     *
     * @param ws
     * @param data { heartbeat_interval: number }
     */
    receive(ws, data){

        this.#interval = setInterval(() => {
            this.send(ws, Opcode.HEARTBEAT, null)
        }, data.heartbeat_interval)

        // Send identify
        this.send(ws, Opcode.IDENTIFY, {
            token: process.env['APP_TOKEN'],
            intents: process.env['APP_INTENTS'],
            properties: {
                '$os': process.platform,
                '$browser': 'Discord Attendee 0.0.1'
            }
        })

    }
}