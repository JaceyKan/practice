(
    function(b,o,i,l,e,r){
    b.GoogleAnalyticsObject=l;
    b[l]||(b[l]=function(){
        (b[l].q=b[l].q||[]).push(arguments)
    });
    b[l].l=+new Date;
    e=o.createElement(i);
    r=o.getElementsByTagName(i)[0];
    e.src='//www.google-analytics.com/analytics.js';
    r.parentNode.insertBefore(e,r)
}
(window,document,'script','ga')
);

ga('create','UA-24532603-1');
ga('send','pageview');

var isCompleted = {};
function sampleCompleted(sampleName){
    if (ga && !isCompleted.hasOwnProperty(sampleName)) {
        ga('send', 'event', 'WebCentralSample', sampleName, 'completed');
        isCompleted[sampleName] = true;
    }
}

function init() {
    window.matchMedia("(min-width: 600px)").addListener(hitMQ);
}

function hitMQ(evt) {
    sampleCompleted("GettingStarted-FixingFirstBreakoint");
}

init();