function JsonDataSource(url,dataCallback) {
    var self = this;
    self.url = url;
    self.dataCallback = null;
    self.reloadFromServer = false;
    self.loadComplete = ko.observable(false);

    self.getData = function(reloadFromServer, dataCallback) {
        self.dataCallback = dataCallback;
        self.reloadFromServer = reloadFromServer;

        $.ajax({
            type: "GET",
            url: self.url,
            cache: !reloadFromServer,
            contentType: "application/json",
            dataType: "text",
            error: function (jqXHR, textStatus, errorThrown) {
                self.processErrorResult(jqXHR, textStatus, errorThrown);
            },
            success: function (data) {
                self.processDataResult(data,false)
            }
        });        
    };

    self.processErrorResult = function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status === 0 && jqXHR.responseText.length > 0)
        {
            // the approved method of detecting the cache is a zero return code and data being returned
            self.processDataResult(jqXHR.responseText, true);
            return;
        }
        self.errorResult(jqXHR,textStatus,errorThrown);
    };

    self.errorResult = function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status === 0) {
                alert('Not connect.\n Verify Network.');
            } else if (jqXHR.status == 404) {
                alert('Requested page not found. [404]');
            } else if (jqXHR.status == 500) {
                alert('Internal Server Error [500].');
            } else if (textStatus === 'parsererror') {
                alert('Requested JSON parse failed.');
            } else if (textStatus === 'timeout') {
                alert('Time out error.');
            } else if (textStatus === 'abort') {
                alert('Ajax request aborted.');
            } else {
                alert('Uncaught Error (' + jqXHR.status + ') .\n' + jqXHR.responseText);
            }
    };

    self.processDataResult = function (data,fromCache) {
        var object = eval('(' + data + ')');
        self.dataCallback(object,fromCache,self.reloadFromServer);
        self.loadComplete(true);
    };
}

