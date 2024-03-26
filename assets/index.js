// Typewriter Constructor
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.isDeleting = false;
    this.tick();
};

// Typewriter Tick Function
TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        // Text has fully typed out, stop deleting
        this.isDeleting = true;
        setTimeout(function() {
            // Wait for a while before erasing
            that.tick();
        }, this.period);
    } else if (this.isDeleting && this.txt === '') {
        // Text has been fully erased, move to the next phrase
        this.isDeleting = false;
        this.loopNum++;
        setTimeout(function() {
            // Start typing the next phrase
            that.tick();
        }, 500);
    } else {
        setTimeout(function() {
            // Continue typing or deleting
            that.tick();
        }, delta);
    }
};

// Window onload Function
window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};

document.getElementById("phoneIcon").addEventListener("click", function() {
    window.location.href = "tel:+355699694318";
});

document.getElementById("whatsappIcon").addEventListener("click", function() {
    var phoneNumber = "+355699694318";
    var whatsappUrl = "https://wa.me/" + phoneNumber;
    window.open(whatsappUrl, "_blank");
});

document.getElementById("telegramIcon").addEventListener("click", function() {
    var username = "juri044";
    var telegramUrl = "tg://resolve?domain=" + username;
    window.open(telegramUrl, "_blank");
});

$(document).ready(function(){
    // Initialize Bootstrap components for mobile
    if ($(window).width() < 768) {
        $('.navbar-toggler').click(function(){
            $('#navbarsExample01').collapse('toggle');
        });
    }
});
