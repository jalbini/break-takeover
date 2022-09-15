////////////////////
// Nunchuck Setup //
////////////////////
var getUrlParams = function() {
    var params = {};
    var query = location.search.substr(1);

    if(query.length > 0) {
        query.split('&').forEach( function(s){
            let k =  s.split('=')[0];
            let v = s.split('=')[1];
            params[k] = v;
        });    
    }

    return params;
};

$(document).ready(function(){
  init();
});


function init() {
  var roomId = getUrlParams()['n'];
  var socket = io();
  var n = nunchuck.init('player', socket);
  n.onJoin(function(data, err){
    // if (err){
    //   alert(err.msg);
    // }  
    location.href = "https://www.chipotle.com";
  });

  n.join('someUser', roomId);  
}
