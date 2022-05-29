const Opcode = require("../lib/opcode");

module.exports = class Hello extends Opcode {

    code = 11;

    /**
     *
     * @param ws
     * @param data { heartbeat_interval: number }
     */
    receive(ws, data){

    }
}