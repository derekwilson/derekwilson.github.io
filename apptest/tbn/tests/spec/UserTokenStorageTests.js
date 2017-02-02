describe("UserTokenStorage", function () {

    var tokens;

    // This beforeEach is called before each test, and also before any nested beforeEach calls,
    // so is like a base-class GivenThat()
    beforeEach(function () {
        tokens = new UserTokenStorage("AAD.UnitTest.tbn.userToken");
        tokens.store.removeAll();
    });

    describe("when using an empty storage container", function () {

        beforeEach(function () {
        });

        it("it should not contain any tokens", function () {
            expect(tokens.store.persistentArray().length).toBe(0);
        });
    });

    describe("when using a storage container with one token", function () {

        var token = new UserToken('Name1','Value1');

        beforeEach(function () {
            tokens.store.addItem(token);
        });

        it("it should contain one token", function () {
            expect(tokens.store.persistentArray().length).toBe(1);
        });

        it("it should contain the correct token", function () {
            expect(tokens.store.persistentArray()[0].name()).toBe('Name1');
            expect(tokens.store.persistentArray()[0].value()).toBe('Value1');
        });

        it("it should be able to find the token", function () {
            expect(tokens.findToken('Name1')).not.toBeNull();
        });

        it("it not should be able to find tokens that have not been added", function () {
            expect(tokens.findToken('NameXXX')).toBeNull();
        });
    });

    describe("when using a storage container with one token inflated from local storage", function () {

        var inflatedTokens;

        beforeEach(function () {
            tokens.store.addItem(new UserToken('Name2','Val2'));

            inflatedTokens = new UserTokenStorage("AAD.UnitTest.tbn.userToken");
        });

        it("it should contain one token", function () {
            expect(inflatedTokens.store.persistentArray().length).toBe(1);
        });

        it("it should contain the correct token", function () {
            expect(inflatedTokens.store.persistentArray()[0].name()).toBe('Name2');
            expect(inflatedTokens.store.persistentArray()[0].value()).toBe('Val2');
        });
    });

    describe("when using a storage container with two tokens", function () {

        var token1 = new UserToken('Name1','Value1');
        var token2 = new UserToken('Name2','Value2');

        beforeEach(function () {
            tokens.store.addItem(token1);
            tokens.store.addItem(token2);
        });

        it("it should contain two tokens", function () {
            expect(tokens.store.persistentArray().length).toBe(2);
        });

        it("it should be able to find the tokens", function () {
            expect(tokens.findToken('Name1')).not.toBeNull();
            expect(tokens.findToken('Name2')).not.toBeNull();
        });

        it("it not should be able to find tokens that have not been added", function () {
            expect(tokens.findToken('NameXXX')).toBeNull();
        });
    });


});
