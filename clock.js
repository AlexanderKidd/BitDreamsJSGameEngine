var minutes = 0;
var seconds = 0;
var decaseconds = 0;
var triacontapentasec = 0; // Technically Greek, 1/35th of a second. Roughly what the highest fraction of a second value was observed.
var time = "";
var start = Date.now();
var current = 0;
var delta = 0;

function iterateClock() {
    delta = Date.now() - this.start;
    seconds = Math.round(delta / 1000);
    minutes = Math.round(seconds / 60);
    triacontapentasec = Math.round(delta % 35);
}

function getClockTime() {
    var stringBuilder = "";
    stringBuilder += getMinutes() + ':';

    if(getSecondsDisplay() < 10) stringBuilder += '0';

    stringBuilder += getSecondsDisplay() + '.' + getTriacontapentasec();

    time = stringBuilder;

    return time;
}

function getTriacontapentasec() {
    return triacontapentasec;
}

function getMinutes() {
	return minutes;
}

function getSecondsDisplay() { 
    return seconds % 60; 
}