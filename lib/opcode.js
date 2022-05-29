const Log = require('./log');

module.exports = class Opcode {

    static DISPATCH = 0;
    static HEARTBEAT = 1;
    static IDENTIFY = 2;
    static PRESENCE_UPDATE = 3;
    static VOICE_STATE_UPDATE = 4;
    static RESUME = 6;
    static RECONNECT = 7;
    static REQUEST_GUILD_MEMBERS = 8;
    static INVALID_SESSION = 9;
    static HELLO = 10;
    static HEARTBEAT_ACK = 11;

    code = -1;

    _receive(ws, data){
        Log.ingress(data.op, this);
        this.receive(ws, data.d);
    }

    receive(ws, data){
        throw new Error('No Receiver for opcode')
    }

    send(ws, code = 0, data = {}){
        Log.egress(code, this);
        ws.send(JSON.stringify({
            op: code,
            d: data
        }));
    }

}