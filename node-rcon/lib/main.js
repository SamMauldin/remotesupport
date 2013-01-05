lip="localhost"
math=Math

var fork=require("child_process").fork
var exec=require("child_process").exec

var colors=require("colors")

console.log("Hello! Welcome to remote supportagent by Sam!".blue)

console.log("Starting tty server...".blue)
ttyjs=fork("./tty.js", {silent:true})
console.log("Starting chat server...".blue)
chat=fork("./chat.js", {silent:true})
console.log("Starting control panel server...".blue)
var express=require("express")
var http=require("http")
var app=express()
var server=http.createServer(app)
var io=require("socket.io").listen(server)

io.set("log level", 1)

sockethandler=require("./sockethandler")

sockethandler.ready(io)

app.set("title", "Remote Control")
console.log("Setting up servers...".blue)
pass="R"+math.floor(math.random()*10000)
ttyjs.send(pass)
app.use(express.basicAuth("", pass))
app.use(express.static(__dirname+"/files"))

app.get("/kill", function(req, res){
console.log("Shutting down...".red)
ttyjs.kill()
chat.kill()
setTimeout(process.exit, 1000)
res.send("Stopping server!");
});

app.get("/terminal", function(req, res){
res.redirect("http://"+lip+":51001")
});

app.get("/setup.html", function(req, res){
res.send("<html><body><script src=\"/js/cookie.js\"></script><script>setCookie(\"ip\",\""+lip+"\" )</script></body></html>");
});

server.listen(51000)

chatclient=require("./chatclient")

lanip=require("./lanip")
lanip.ip(function(error, ip){
lip=ip
if(error){
console.log("Unable to find local ip! Expect errors!".red)
}else{
console.log("Ready!".green)
console.log("Your local ip is ".green+lip.red)
}
console.log("The control password is ".green+pass.red)
console.log("To kill the control panel manually, press control-c".red)
console.log("Starting chat...".yellow)
chatclient.run()
});

setInterval(function(){
exec("./takescreenshot.sh")
}, 1000);

