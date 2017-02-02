function Environment() {
    var self = this;

    self.isPhoneGap = ko.computed(function() {
        return window.cordova != null;
    }, this);

    self.isPhoneBrowser = function() {
        return navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);
    };

    self.isNetworkUrl = function() {
        return !(document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1);
    }

    self.shouldUsePhoneGap = function() {
        // only use phonegap / cordova if its a file URL in a mobile browser
        return !self.isNetworkUrl() && self.isPhoneBrowser();
    }

    self.appVersion = ko.computed(function() {
        return '341' + (self.isPhoneGap() ? '(p)' : '(b)');
    }, this);
}   

function TimeProvider(currentTime) {
    var self = this;
    if (currentTime != null)
    {
        self.time = currentTime;
        return; 
    }
    self.time = moment(); 
}

