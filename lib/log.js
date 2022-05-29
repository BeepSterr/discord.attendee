const c = require('chalk');

module.exports = class Log {

    static opcodes = {
        0:  'DISPATCH',
        1:  'HEARTBEAT',
        2:  'IDENTIFY',
        3:  'PRESENCE_UPDATE',
        4:  'VOICE_STATE_UPDATE',
        5:  null,
        6:  'RESUME',
        7:  'RECONNECT',
        8:  'REQUEST_GUILD_MEMBERS',
        9:  'INVALID_SESSION',
        10: 'HELLO',
        11: 'HEARTBEAT_ACK'
    }

    static COLOR_ERROR = c.redBright;
    static COLOR_INFO = c.blueBright;
    static COLOR_WARN = c.yellowBright;

    static COLOR_REMOTE = c.red;
    static COLOR_LOCAL = c.blue;
    static COLOR_ARROW = c.magentaBright;

    static ingress(opcode, class_instance){
        console.log(
            Log.COLOR_REMOTE(`Remote ${Log.opcodes[opcode]}`),
            Log.COLOR_ARROW(`==>`),
            Log.COLOR_LOCAL(`Local ${class_instance.constructor.name}`),
        )
    }

    static ingress_dispatch(opcode, class_instance, type){
        console.log(
            Log.COLOR_REMOTE(`Remote ${Log.opcodes[opcode]} (${type})`),
            Log.COLOR_ARROW(`==>`),
            Log.COLOR_LOCAL(`Local ${class_instance.constructor.name}`),
        )
    }

    static egress(opcode, class_instance){
        console.log(
            Log.COLOR_LOCAL(`Local ${class_instance.constructor.name}`),
            Log.COLOR_ARROW(`==>`),
            Log.COLOR_REMOTE(`Remote ${Log.opcodes[opcode]}`),
        )
    }

    static no_responder(opcode){
        console.log(
            Log.COLOR_ERROR(`No responder found for opcode ${Log.opcodes[opcode]}`),
        )
    }

}