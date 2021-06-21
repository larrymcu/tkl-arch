/*
  Para poder poner este script en tu server tienes que poner tambien un archivo en tu server y saber de que tamaño es para poner la informacion en imageAddr y downloadSize.
*/

var imageAddr = "3MB.jpg" + "?n=" + Math.random();
var startTime, endTime;
var downloadSize = 3019526; //2.87Mb
var download = new Image();
var roundedDecimals = 2;
var bytesInAKilobyte = 1024;

function showResults() {
  var duration = (endTime - startTime) / 1000;
  var bitsLoaded = downloadSize * 8;
  var speedBps = ( bitsLoaded / duration ).toFixed(roundedDecimals);
  var displaySpeed = speed(speedBps);
  var results = "<h2>你的网速测试为<h2><h1>" + displaySpeed.value + " " + displaySpeed.units + "</h1>"
    
    $('#results').fadeOut('fast',function(){
      $('#results').html(results);
      $('#results').fadeIn('fast', function(){
        $('#starttest').text('完成');
      });
    });
}

function speed( bitsPerSecond ){
  var KBps = (bitsPerSecond / bytesInAKilobyte).toFixed(roundedDecimals);
  if ( KBps <= 1 ) return { value: bitsPerSecond, units: "bit/s" };
  var MBps = (KBps / bytesInAKilobyte).toFixed(roundedDecimals);
  if ( MBps <= 1 ) return { value: KBps, units: "Kbit/s" };
  else return { value: MBps, units: "Mbit/s" };
}

$('#starttest').on('click', function(){
  $('#starttest').text('测试下载速度...');
  $('#starttest').attr('disabled', 'disabled');
  
  download.onload = function () {
    endTime = (new Date()).getTime();
    showResults();
  }
  startTime = (new Date()).getTime();
  download.src = imageAddr;
})