
//function QuestionViewModel(title, body) {
//    var self = this;
//
//    self.Title = title;
//    self.Body = body;
//}

function QuizViewModel() {

    var self = this;

    self.codeVersion = ko.observable(10);

    self.questions = ko.observableArray();

    self.currentQuestionIndex = ko.observable(-1);
    self.currentQuestion = ko.computed(function () {
        if (!self.questions) {
            return null;
        }
        return self.questions()[self.currentQuestionIndex()];
    });

    self.questionAside = ko.observable('Loading...');

    self.currentStoredName = ko.observable('NOT SET');

//    $.getJSON("app/questions-json.txt", function (data) {
//        var questions = JSON.parse(data);   //array of questions
//        for (var i = 0; i < questions.length; i++) {
//            self.questions.push(questions[i]);
//        }
//        self.currentQuestionIndex(0);
//    });

    $.ajax({
        type: "GET",
        url: "appKO/questions-json.txt",
        cache: true,
        contentType: "application/json",
        dataType: "text",
        error: function (jqXHR, textStatus, errorThrown) {
            self.processQuestionDataErrorResult(jqXHR, textStatus, errorThrown);
        },
        success: function (data) {
            self.processQuestionData(data,'loaded from network')
        }
    });

    self.processQuestionDataErrorResult = function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status === 0 && jqXHR.responseText.length > 0)
        {
            // the approved method of detecting the cache is a zero return code and data being returned
            self.processQuestionData(jqXHR.responseText, 'loaded from cache');
            return;
        }
        errorResult(jqXHR,textStatus,errorThrown);
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

    self.processQuestionData = function (data, aside) {
//        var questions = JSON.parse(data);   //array of questions
        var questions = eval('(' + data + ')');
        for (var i = 0; i < questions.length; i++) {
            self.questions.push(questions[i]);
        }
        self.questionAside(questions.length + ' questions in set ' + aside);
        self.currentQuestionIndex(0);
    };

    self.previousQuestion = function () {
        self.moveQuestion(-1);
    };

    self.nextQuestion = function () {
        self.moveQuestion(1);
    };

    self.moveQuestion = function (offset) {
        var newQuestionIndex = self.currentQuestionIndex() + offset;
        if ((newQuestionIndex >= 0) && (newQuestionIndex < self.questions().length)) {
            self.currentQuestionIndex(newQuestionIndex);
        }
    };

    self.sendRequest = function () {
         $.ajax({
            type: "GET",
            url: "appKO/appdata-json.txt",
            cache: true,
            contentType: "application/json",
            dataType: "text",
            error: myApp.processRequestErrorResult,
            success: myApp.processRequestResult
        });        
    };

    self.storeName = function() {
        self.storeUserData($("#userName").val());
        self.currentStoredName(self.retrieveName());
    };

    self.getUserData = function (data) {
        if (!Modernizr.localstorage) {
             return 'Local storage not available';
        }
        return localStorage["AAD.HTMLTestAppM"];
    };

    self.storeUserData = function (data) {
        if (!Modernizr.localstorage) {
             alert('Local storage not available');
             return;
        }
        localStorage["AAD.HTMLTestAppM"] = data;
    };

    self.retrieveName = function () {
        var data =  self.getUserData();
        if (!data) {
            return 'NOT SET';
        }
        return data;
    };

    self.currentStoredName(self.retrieveName());
}

ko.applyBindings(new QuizViewModel());
