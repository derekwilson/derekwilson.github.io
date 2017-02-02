describe("MessageTokenProcessor", function () {

    var processor;
    var timeProvider;
    var textArray;
    var replacementValues;

    // This beforeEach is called before each test, and also before any nested beforeEach calls,
    // so is like a base-class GivenThat()
    beforeEach(function () {
        timeProvider = new TimeProvider(new moment("2013-04-17 20:10"));
        textArray = ko.observableArray();
        replacementValues = ko.observableArray();
        replacementValues.push(new UserToken("{user1}","replacement1"));
        replacementValues.push(new UserToken("{date}","datereplacement"));      // generated value - should never be used
        replacementValues.push(new UserToken("{time}","timereplacement"));      // generated value - should never be used
        replacementValues.push(new UserToken("{user3}","replacement3"));
    });

    describe("when using an empty processor", function () {

        beforeEach(function () {
            processor = new MessageTokenProcessor(textArray,timeProvider);
        });

        it("it should not find any tokens", function () {
            expect(processor.tokens().length).toBe(0);
        });

        it("it should not replace any tokens", function () {
            expect(processor.replaceTokensInText()).toBe("");
            expect(processor.replaceTokensInText(replacementValues)).toBe("");
        });
    });

    describe("when using a literal processor", function () {

        var text = "a literal lump of text";

        beforeEach(function () {
            textArray.push(new SelectedSnippet(text));
            processor = new MessageTokenProcessor(textArray,timeProvider);
        });

        it("it should not find any tokens", function () {
            expect(processor.tokens().length).toBe(0);
        });

        it("it should not replace any tokens", function () {
            expect(processor.replaceTokensInText()).toBe(text);
            expect(processor.replaceTokensInText(replacementValues)).toBe(text);
        });
    });

    describe("when using a processor with date and time tokens", function () {

        var text = "a literal lump of text with {DATE} and {TIME} tokens";

        beforeEach(function () {
            textArray.push(new SelectedSnippet(text));
            processor = new MessageTokenProcessor(textArray,timeProvider);
        });

        it("it should find the tokens", function () {
            expect(processor.tokens().length).toBe(2);
        });

        it("it should find the correct tokens", function () {
            expect(processor.tokens()[0].name()).toBe('{date}');
            expect(processor.tokens()[1].name()).toBe('{time}');
        });

        it("it should replace the tokens", function () {
            expect(processor.replaceTokensInText()).toBe("a literal lump of text with 17/Apr/2013 and 8:10 pm tokens");
        });

        it("it should not replace the generated tokens with user supplied value", function () {
            expect(processor.replaceTokensInText(replacementValues)).toBe("a literal lump of text with 17/Apr/2013 and 8:10 pm tokens");
        });
    });

    describe("when using a processor with default user tokens", function () {

        var text = "a literal lump of text with {user1}and{USER2}{user3} tokens";

        beforeEach(function () {
            textArray.push(new SelectedSnippet(text));
            processor = new MessageTokenProcessor(textArray,timeProvider);
        });

        it("it should find the tokens", function () {
            expect(processor.tokens().length).toBe(3);
        });

        it("it should find the correct tokens", function () {
            expect(processor.tokens()[0].name()).toBe('{user1}');
            expect(processor.tokens()[1].name()).toBe('{user2}');
            expect(processor.tokens()[2].name()).toBe('{user3}');
        });

        it("it should replace the tokens with empty values when no replacements are supplied", function () {
            expect(processor.replaceTokensInText()).toBe("a literal lump of text with and tokens");
        });

        it("it should replace the tokens with user supplied values", function () {
            expect(processor.replaceTokensInText(replacementValues)).toBe("a literal lump of text with replacement1andreplacement3 tokens");
        });
    });

});
