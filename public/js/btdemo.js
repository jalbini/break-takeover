var n;
var qrcode;


var init = function() {
  sizeToFit();
  listenForResizeEvents();

  createRoom();
  createQRCode();
};

var fastFadeInUp = function($element, delay) {
  if (delay > 0) {
    setTimeout(fastFadeInUp, delay, $element, 0);
    return;
  }

  $element.addClass('fast-animated fadeInUp').removeClass('hidden');
}

var fadeInUp = function($element, delay) {
  if (delay > 0) {
    setTimeout(fadeInUp, delay, $element, 0);
    return;
  }

  $element.addClass('animated fadeInUp').removeClass('hidden');
}

var createRoom = function() {
  var socket = io();
  n = nunchuck.init('host', socket);
  n.onJoin(onQRLoad);
};

var createQRCode = function(){
    var qrCodeUrl = "http://172.16.120.31:3000/qrcode?n=" + n.id;

    qrcode = new QRCode(document.getElementById("qr-code"), {
        text: qrCodeUrl,
        width: 207,
        height: 207
    });
    console.log("QR Code URl: " + qrCodeUrl);
    console.log("http://localhost:3000/qrcode?n=" + n.id);
};



$(document).ready(function(){
    init();
});
  
var listenForResizeEvents = function() {
    try {
        window.addEventListener('resize', sizeToFit);
    } catch (err) {}
};

var sizeToFit = function() {
    var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 1920);
    var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 1080)

    var scaleFactor = Math.min(viewportWidth / 1280, viewportHeight / 720);
    var scaledWidth = 1280 * scaleFactor;
    var scaledHeight = 720 * scaleFactor;
        
    var top = Math.max(viewportHeight - scaledHeight, 0) / 2;
    var left = Math.max(viewportWidth - scaledWidth, 0) / 2;

    $('.page-wrap').css({
        'transform': `scale(${scaleFactor})`,
        'top': top,
        'left': left
    });
};

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

var clickToPlay = function(){
    $('#click-to-play-overlay').css({
        zIndex: 0
    });

    fadeInUp($('#background'));
    fadeInUp($('#main-content'));

    $('#player')[0].play();

    $('#content-player')[0].play();
    $('#content-player')[0].pause();
};

var onQRLoad = function(data) {
    $('#video-content').css({
        zIndex: 3
    });

    $('#content-player')[0].play();
    $('#player')[0].pause();
    console.log('qr code loaded!')

    fadeInUp($('#content-player'));
};
