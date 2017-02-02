function TokensViewModel() {

    var self = this;

    self.environment = new Environment();
    self.codeVersion = self.environment.appVersion;

    self.tokenStorage = new UserTokenStorage();

    // need to get all the snippets as well to be able to generate the tokens
    self.snippetDataSource = new JsonDataSource('data/snippets-json.txt');
    self.snippetsFile = null;

    self.tokenStatus = ko.computed(function() {
        var selectionLength = self.tokenStorage.store.persistentArray().length;

        if (selectionLength < 1) {
            return "there are no tokens defined";
        }

        return selectionLength + " tokens";
    }, this);

    self.gotoMessage = function () {
        self.saveAll();
        //$.mobile.changePage("message.html");    
        location.href = "message.html";
    };

    self.refreshTokens = function () {
        // force JQM to update UI
        //$('#tokens').listview('refresh');
        $('#tokens').trigger('create');
    };

    self.removeToken = function (userToken, event) {
        self.tokenStorage.store.removeItem(userToken);
    };

    self.removeAll = function () {
        self.tokenStorage.store.removeAll();
    };

    self.saveAll = function () {
        self.tokenStorage.store.storeUserData();
        //$("#optionsMenu").popup("close");
    };

    self.addFromArray = function (observableArray) {
        var tokenProcessor = new MessageTokenProcessor(observableArray,new TimeProvider(null));
        var numberOfTokens = tokenProcessor.tokens().length;
        for (var tokenIndex = 0; tokenIndex < numberOfTokens; tokenIndex++) {
            // do not add the generated tokens as they will be filled in by the system
            if (!tokenProcessor.tokens()[tokenIndex].isGenerated()) {
                // do not add tokens that have already been added
                if (self.tokenStorage.findToken(tokenProcessor.tokens()[tokenIndex].name()) == null) {
                    self.tokenStorage.store.addItem(
                        new UserToken(
                            tokenProcessor.tokens()[tokenIndex].name(),
                            tokenProcessor.tokens()[tokenIndex].value()
                        )
                    )
                }
            }
        }
    };

    self.addFromMessage = function () {
        var snippetStorage = new SelectedSnippetStorage();
        self.addFromArray(snippetStorage.store.persistentArray);
        self.refreshTokens();
    };

    self.updateTokensFromAllSnippets = function (snippets, fromCache, reloadFromServer) {
        var allSnippets = ko.observableArray();     // wonder if there is a way to make this not observable
        for (var i = 0; i < snippets.length; i++) {
            var snippet = new Snippet(snippets[i].CatagoryId,snippets[i].Display);
            allSnippets.push(snippet);
        };
        self.addFromArray(allSnippets);
        self.refreshTokens();
    };

    self.addFromAllSnippets = function () {
        // hmmm probably need to block the UI to stop multi threading issues accessing the token container
        if (self.environment.isPhoneGap()) {
            console.log("Getting snippets from file");
            self.snippetsFile = new TextFileIO("tbn","snippets.txt");
            self.snippetsFile.readJSON(self.updateTokensFromAllSnippets);
        }
        else {
            console.log("Getting snippets from ajax");
            self.snippetDataSource.getData(false, self.updateTokensFromAllSnippets);
        }
    };

}