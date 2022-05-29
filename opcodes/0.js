const Opcode = require("../lib/opcode");
const Log = require("../lib/log");

const fetch = require('node-fetch');

module.exports = class Dispatch extends Opcode {

    code = 0;

    _receive(ws, data) {
        Log.ingress_dispatch(data.op, this, data.t);
        this.receive(ws, data.d, data.t);
    }

    /**
     *
     * @param ws
     * @param data { heartbeat_interval: number }
     * @param event
     */
    receive(ws, data, event) {
        fetch(`${process.env['API_ENDPOINT']}`, {
            method: 'POST',
            headers: {
                'Authorization': process.env['API_AUTH'],
                'x-discord-event': event
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                // Do something with response
            })
            .catch(function (err) {
                console.log("Unable to fetch -", err);
            });

    }
}