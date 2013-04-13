lip="localhost"
math=Math

var fork=require("child_process").fork
var exec=require("child_process").exec

console.log("Hello! Welcome to remote supportagent by Sam!")

console.log("Starting tty server...")
ttyjs=fork("./tty.js", {silent:true})
console.log("Starting chat server...")
chat=fork("./chat.js", {silent:true})
console.log("Starting control panel server...")
var express=require("express")
var app=express()

app.set("title", "Remote Control")
console.log("Setting up servers...")
pass="R"+math.floor(math.random()*10000)
ttyjs.send(pass)
app.use(express.basicAuth("", pass))
app.use(express.static(__dirname+"/files"))

app.get("/kill", function(req, res){
console.log("Shutting down...")
ttyjs.kill()
setTimeout(process.exit, 1000)
res.send("Stopping server!");
});

app.get("/takescreen", function(req, res){
screenshot()
res.redirect("http://"+lip+":51000/screen.html")
})

app.get("/terminal", function(req, res){
res.redirect("http://"+lip+":51001")
});

app.listen(51000)

lanip=require("./lanip")
lanip.ip(function(error, ip){
lip=ip
if(error){
console.log("Unable to find local ip! Expect errors!")
}else{
console.log("Ready!")
console.log("Your local ip is "+lip)
}
console.log("The control password is "+pass)
console.log("To kill the control panel manually, just quit the app")
});

function screenshot(){
exec("./takescreenshot.sh")
}

