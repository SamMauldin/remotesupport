function launch(pass){
var tty=require("tty.js")
var app=tty.createServer({
  shell: "bash",
  users: {
    RCON: pass
  },
  port:51001
});

app.listen()
}
process.on("message", function(m){
launch(m)
});
