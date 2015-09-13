var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
	console.log('a user connected');
	var i=0;
	socket.on('img', function (data) {
		console.log('data');
		console.log(data.seq);
		console.log(data.img.toString().length);
		//console.log(data.img);

		base64Data = data.img.replace(/^data:image\/png;base64,/, "");
		//console.log(base64Data);
		var fileName = (new Date()).toString().replace(/ /g,'-')+'.png';
		fs.writeFile('./receivedImages/'+fileName, base64Data, 'base64', function(err) {
	  		console.log('err');
		});

		
		//console.log(i++);
		socket.emit('resetBusy',{busyStatus:false});
	});
	

});

server.listen(3000, function(){
	console.log('listening on *:3000');
});





/*app.post('/upload', function(req, res){
//This debugging meassage displays all the info that comes with the file
	console.log("Received file:\n" + req.data);

	//Set the directory names
	var photoDir = __dirname+"/photos/";
	var thumbnailsDir = __dirname+"/photos/thumbnails/";
	var photoName = req.files.source.name;

	//We use Node's FileSystem to rename the file, which actually moves it from the /tmp/ folder it goes to on Linux
	fs.rename(
		req.files.source.path,
		photoDir+photoName,
		function(err){
			if(err != null){
				res.send({error:"Server Writting No Good"});
			} else {
			//If upload goes ok we go ahead an create the thumbnail
			im.resize(
			  {
			    srcData:fs.readFileSync(photoDir+photoName, 'binary'),
			    width:256
			  }, 
			  function(err, stdout, stderr){
			    if(err != null){
			      res.send({error:"Resizeing No Good"});
			    } else {
			      fs.writeFileSync(thumbnailsDir+"thumb_"+photoName, stdout, 'binary');
			      res.send("Ok");
			    }
			  }
			);
			}
		}
	);
	});
*/
