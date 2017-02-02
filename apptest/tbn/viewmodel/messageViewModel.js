function MessageViewModel() {

    var self = this;

    self.environment = new Environment();
    self.codeVersion = self.environment.appVersion;

    self.selectedSnippets = new SelectedSnippetStorage();
    self.tokens = new UserTokenStorage();

    self.currentText = ko.computed(function() {
        var processor = new MessageTokenProcessor(self.selectedSnippets.store.persistentArray,new TimeProvider(null));
        return processor.replaceTokensInText(self.tokens.store.persistentArray);
    }, this);

    self.currentTextAsEmailHref = ko.computed(function() {
        var text = self.currentText();

        return 'mailto:recipient@example.com?subject=subjecttext&body=' + encodeURIComponent(text);
    }, this);

    self.currentTextAsSmsHref = ko.computed(function() {
        var text = self.currentText();

        return 'sms:+123456789?body=' + encodeURIComponent(text);
    }, this);

    self.selectionStatus = ko.computed(function() {
        var selectionLength = self.selectedSnippets.store.persistentArray().length;

        if (selectionLength < 1) {
            return "nothing has been selected";
        }

        return selectionLength + " snippets selected";
    }, this);

    self.selectedSnippetsUpdated = function() {
        if ($.mobile.activePage) {
            $.mobile.activePage.trigger('pagecreate');
        }
    }

    self.removeText = function (selectedSnippet, event) {
        //alert('Remove: ' + selectedSnippet.display());
        self.selectedSnippets.store.removeItem(selectedSnippet);
    };

    self.removeAll = function () {
        self.selectedSnippets.store.removeAll();
    };

    self.moveUp = function (selectedSnippet, event) {
        //alert('move: ' + selectedSnippet.display());
        self.selectedSnippets.store.moveUp(selectedSnippet);
        self.selectedSnippetsUpdated();
    };

    self.moveDown = function (selectedSnippet, event) {
        //alert('move: ' + selectedSnippet.display());
        self.selectedSnippets.store.moveDown(selectedSnippet);
        self.selectedSnippetsUpdated();
    };

    // code
    $( '#currenttext' ).live( 'pageshow',function(event, ui){
        // to make sure that the current text is always that specified in the viewmodel and not what is in the post request
        var textArea = $('#clip');
        textArea.val(self.currentText());
    });
}

