$(document).ready(function () {
    myApp.testAppWireup();
});

var myApp = {
    questions: null,
    currentQuestion: 0,
    testAppWireup: function () {
        $("#footer").html("rev 45");

        $("#saveName").click(function (event) {
            myApp.storeUserData($("#userName").val());
            $("#localdata_aside").html("Local Data: " + myApp.getUserData());
        });

        $("#makeRequest").click(function (event) {
            $.ajax({
                type: "GET",
                url: "app/appdata-json.txt",
                cache: true,
                contentType: "application/json",
                dataType: "text",
                error: myApp.processRequestErrorResult,
                success: myApp.processRequestResult
            });
        });
        $("#prevQuestion").click(function (event) {
            if (myApp.questions == null){
                alert("No questions loaded");
                return;
            }
            myApp.currentQuestion -= 1;
            if (myApp.currentQuestion < 0) {
                myApp.currentQuestion = 0;
            }
            myApp.displayQuestion(myApp.questions[myApp.currentQuestion]);
        });

        $("#nextQuestion").click(function (event) {
            if (myApp.questions == null){
                alert("No questions loaded");
                return;
            }
            myApp.currentQuestion += 1;
            if (myApp.currentQuestion > (myApp.questions.length-1)) {
                myApp.currentQuestion = (myApp.questions.length-1);
            }
            myApp.displayQuestion(myApp.questions[myApp.currentQuestion]);
        });
        //myApp.refreshQuestions();
        $("#localdata_aside").html("Local Data: " + myApp.getUserData());
        myApp.selectAll("#clip");
    },
    selectAll: function(textId) {

        $(textId).focus(function() { 
            // need this for iOS
            this.setSelectionRange(0, 9999);
        });

        $(textId).mouseup(function(e){
            e.preventDefault();
        });


        //$(textId).focus(function (event) {
        //    this.selectionStart=0;
        //    this.selectionEnd=this.value.length;
        //});
        // $(textId).bind('vmouseup', function () {
        //     this.selectionStart=0;
        //     this.selectionEnd=this.value.length;
        // });
    },
    refreshQuestions: function () {
        $.ajax({
            type: "GET",
            url: "app/questions-json.txt",
            cache: true,
            contentType: "application/json",
            dataType: "text",
            error: myApp.processQuestionsErrorResult,
            success: myApp.processQuestionsResult
        });
    },
    processQuestionsErrorResult: function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status === 0 && jqXHR.responseText.length > 0)
        {
            alert('Getting response from cache');
            myApp.processQuestionsResult(jqXHR.responseText);
            return;
        }
        errorResult(jqXHR,textStatus,errorThrown);
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
    processQuestionsResult: function (jsonString) {
        try
        {
            myApp.questions = JSON.parse(jsonString);
        }
        catch (error)
        {
            alert("Error processing data " + error.message);
        }
        $("#question_aside").html(myApp.questions.length + " questions in set");
        myApp.displayQuestion(myApp.questions[myApp.currentQuestion]);
    },
    displayQuestion: function (questionData) {
        $("#question_title").html(questionData.Title);
        $("#question_body").html(questionData.Body);
    },
    processRequestResult: function (jsonString) {
        try
        {
            var returnedData = JSON.parse(jsonString);
            $("#outputSection section").remove();
            myApp.displayResult("User Name",returnedData.UserName);
            myApp.displayResult("Request Updated",returnedData.RequestedDate);
            myApp.displayResult("Server Time",returnedData.ServerDate);            //myApp.questions = eval('(' + jsonString + ')');
        }
        catch (error)
        {
            alert("Error processing request " + error.message);
        }

    },
    displayResult: function (label, value) {
        var start = "<section class='result'><label>";
        var mid = ": </label><span>";
        var end = "</span></section>";
        $("#outputSection")
            .append(start + label + mid + value + end);
    },
    storeUserData: function (data) {
        if (!Modernizr.localstorage) {
             alert('Local storage not available');
             return;
        }
        localStorage["AAD.HTMLTestApp"] = data;
    },
    getUserData: function (data) {
        if (!Modernizr.localstorage) {
             return 'Local storage not available';
        }
        return localStorage["AAD.HTMLTestApp"];
    }
}