require('dotenv').config()

const WebSocket = require('ws');
const FileSystem = require('fs');
const path = require('path');
const Log = require('./lib/log');


console.log(path.join(__dirname, 'opcodes'));
const opcode_modules = FileSystem.readdirSync(path.join(__dirname, 'opcodes'));

const opcodes = {};
for(const opcode_module of opcode_modules){
    let opcode_class = require(path.join(__dirname, 'opcodes', opcode_module))
    let opcode_instance = new opcode_class();
    opcodes[opcode_instance.code] = opcode_instance;
}

const ws = new WebSocket("wss://gateway.discord.gg?v=9&encoding=json");
ws.opcodes = opcodes;

ws.on('open', function(){
    console.log('Websocket connection opened');
});

ws.on('message', function(raw_data){

    const data = JSON.parse(raw_data);

    if(opcodes[data.op]){
        const opcode_instance = opcodes[data.op];
        opcode_instance._receive(ws, data);

    }else{
        console.log(data);
        Log.no_responder(data.op);
    }

});