$(document).ready(function () {
    myApp.testAppWireup();
});

var myApp = {
    questions: null,
    currentQuestion: 0,
    testAppWireup: function () {
        $("#makeRequest").click(function (event) {
            $.ajax({
                type: "GET",
                url: "appKO/appdata-json.txt",
                cache: true,
                contentType: "application/json",
                dataType: "text",
                error: myApp.processRequestErrorResult,
                success: myApp.processRequestResult
            });
        });
    },
    processRequestErrorResult: function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status === 0 && jqXHR.responseText.length > 0)
        {
            alert('Getting response from cache');
            myApp.processRequestResult(jqXHR.responseText);
            return;
        }
        errorResult(jqXHR,textStatus,errorThrown);
    },
    errorResult: function (jqXHR, textStatus, errorThrown) {
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
    },
    processRequestResult: function (jsonString) {
        var returnedData = eval('(' + jsonString + ')');
        $("#outputSection section").remove();
        myApp.displayResult("User Name",returnedData.UserName);
        myApp.displayResult("Request Updated",returnedData.RequestedDate);
        myApp.displayResult("Server Time",returnedData.ServerDate);
    },
    displayResult: function (label, value) {
        var start = "<section class='result'><label>";
        var mid = ": </label><span>";
        var end = "</span></section>";
        $("#outputSection")
            .append(start + label + mid + value + end);
    }
}