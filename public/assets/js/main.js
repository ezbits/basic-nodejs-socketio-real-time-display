window.onload = function() {
    var socket = io.connect('http://localhost:7000'); /* setup socketio */

    socket.on('message', function(data) { /* process new socketio message */
        if (data.message) {
            var submsg = JSON.parse(data.message); /* decodes message to color and message */
            processRequest(data.channel, submsg.message, submsg.color); 
        } else {
            console.log("There was a problem:", JSON.stringify(data));
        }
    });

};

function processRequest(channel, msg, color) {
//    console.log(JSON.stringify(msg));
//    console.log(JSON.stringify(color));
//    console.log(JSON.stringify(channel));
    if (channel == 'c1') {
        $("#c1").css("background-color", color);
        $('#c1').empty();
        $('#c1').html(msg);
    } else if (channel == 'c2') {
        $("#c2").css("background-color", color);
        $('#c2').empty();
        $('#c2').html(msg);
    } else if (channel == 'c3') {
        $("#c3").css("background-color", color);
        $('#c3').empty();
        $('#c3').html(msg);
    } else if (channel == 'c4') {
        $("#c4").css("background-color", color);
        $('#c4').empty();
        $('#c4').html(msg);
    }
    return false;
}
