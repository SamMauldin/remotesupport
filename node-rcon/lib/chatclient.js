exports.run=function(){
applescript=require("applescript")
applescript.execString('tell application "Terminal" to do script "cd '+process.env.PWD+'/irc;./irssi -c localhost -p 51002"', function(){})
}
