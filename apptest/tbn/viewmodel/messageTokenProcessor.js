function Token(name, value, isGenerated) {
    var self = this;
    self.name = ko.observable(name);
    self.value = ko.observable(value);
    self.isGenerated = ko.observable(isGenerated);
}

function MessageTokenProcessor(observableArrayOfSnippets,timeProvider) {
    var self = this;
    self.timeProvider = timeProvider;

    var selectionLength = observableArrayOfSnippets().length;
    var text = '';
    for (var snippetIndex = 0; snippetIndex < selectionLength; snippetIndex++) {
        text = text + observableArrayOfSnippets()[snippetIndex].display();
        if (snippetIndex < selectionLength-1){
            text = text + ' ';
        }
    }

    self.text = text;

    self.tokens = ko.observableArray();      // observable
    self.tokenRegx = /{([^}]*)}/gi;

    self.findTokensInText = function() {
        var now = timeProvider.time;

        var matches = self.text.match(self.tokenRegx);
        if (matches != null) {
            for (var matchIndex = 0; matchIndex < matches.length; matchIndex++) {
                // lower case them immediatly as its going to make comparison easier later
                var name = matches[matchIndex].toLowerCase();
                var value = "";
                var isGenerated = false;

                switch(name){
                    case "{date}":
                        value = now.format('DD/MMM/YYYY');
                        isGenerated = true;
                        break;
                    case "{time}":
                        value = now.format('h:mm a');
                        isGenerated = true;
                        break;
                }
                self.tokens.push(new Token(name,value,isGenerated));
            }
        }
    };

    self.replaceTokensInText = function(replacementValues) {

        if (self.tokens().length < 1) {
            // no replacement is needed - there are no tokens
            return self.text;
        }

        var processedText = self.text.replace(self.tokenRegx, function(match,tag,char){
            for (var tokenIndex = 0; tokenIndex < self.tokens().length; tokenIndex++) {
                if (match.toLowerCase() == self.tokens()[tokenIndex].name()) {
                    // the value for generated tokens is in our token collection
                    if (self.tokens()[tokenIndex].isGenerated()) {
                        return self.tokens()[tokenIndex].value();
                    }
                    // remove the token as there are no supplied replacements
                    if (replacementValues == null || replacementValues().length < 1) {
                        return '';
                    }
                    // lets see if the token can be found in the replacement values
                    var replacementValue = ko.utils.arrayFirst(replacementValues(),function(item) {return item.name() == match.toLowerCase()});
                    if (replacementValue != null) {
                        return replacementValue.value();
                    }
                    // remove any token we cannot find a replacement for
                    return '';
                }
            }
            return match;
        });
        
        return processedText;
    }

    self.findTokensInText();
}
