importScripts('socket.io-1.2.0.js');

var socket = io.connect('http://localhost:3000',{reconnection: false,forceNew: true});
var i = 0;
var busy;

self.addEventListener('message', function(e) {
  var data = e.data;
  /*console.log(data);*/
  if(e.data.cmd === 'uploading'){
  	  busy = true;
  	  console.log(i);
  	
	  socket.emit('img', {seq:i, img: data.img});
	  i++;

  }
/*  if(e.data.cmd === 'testBusy'){
  	self.postMessage({cmd: 'resetBusy', busyStatus: busy});

  }*/
  

  /*load(url,data);*/





}, false);


socket.on('resetBusy',function(data){
	busy = data.busyStatus;
	self.postMessage({cmd: 'resetBusy', busyStatus: busy});

});




/*
function load(url, reqData) {
	var xhr;
	 
	if(typeof XMLHttpRequest !== 'undefined') 
		xhr = new XMLHttpRequest();
	else {
		var versions = ["MSXML2.XmlHttp.5.0",
		"MSXML2.XmlHttp.4.0",
		"MSXML2.XmlHttp.3.0",
		"MSXML2.XmlHttp.2.0",
		"Microsoft.XmlHttp"]
	 
		for(var i = 0, len = versions.length; i < len; i++) {
			try {
				xhr = new ActiveXObject(versions[i]);
			break;
			}
				catch(e){}
			} // end for
		}
		xhr.onreadystatechange = ensureReadiness;
		function ensureReadiness() {
			if(xhr.readyState < 4) {
				return;
			}
			if(xhr.status !== 200) {
				return;
		}
	 
	// all is well
	if(xhr.readyState === 4) {
			return;
		}
	}
	xhr.open('POST', url, true);
	xhr.send(reqData);
} */


/*
function sendRequest(url,reqData) {
	var xmlhttp;
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	xmlhttp.onreadystatechange=function()
	  {
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
	    	console.log("received");
	    }
	  }
	xmlhttp.open("POST", url, true);
	xmlhttp.send(reqData);
}

*/

