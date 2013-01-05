var io
cid=1;
var clients={}
var colors=require("colors")

function setup(id){
console.log("Waiting for websocket client #".blue+id)
socket=clients[id]
socket.s.on("start", function(dat){
console.log("Websocket client #".blue+id+" connected for service ".blue+dat.service.red)
var service=require("./socket/"+dat.service)
if(service){
socket.s.emit("msg", {d:"Starting service!"})
service.start(clients[id])
}else{
socket.s.emit("msg", {d:"Service unavailable!"})
}
});
socket.s.on("disconnect", function(){
clients[id].active=false
console.log("Client #".blue+id+" disconnected".blue)
});
}

exports.ready=function(sio){
console.log("Websocket service starting".blue)
io=sio
io.sockets.on("connection", function(socket){
cid=cid+1;
clients[cid]={s:socket, id:cid, active:true}
setup(cid)
});
console.log("Done!".green)
}
