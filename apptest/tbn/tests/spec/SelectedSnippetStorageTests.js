describe("SelectedSnippetStorage", function () {

    var snippets;

    // This beforeEach is called before each test, and also before any nested beforeEach calls,
    // so is like a base-class GivenThat()
    beforeEach(function () {
        snippets = new SelectedSnippetStorage("AAD.UnitTest.tbn.selectedSnippet");
        snippets.store.removeAll();
    });

    describe("when using an empty storage container", function () {

        beforeEach(function () {
        });

        it("it should not contain any snippets", function () {
            expect(snippets.store.persistentArray().length).toBe(0);
        });
    });

    describe("when using a storage container with one snippet", function () {

        var snippet = new SelectedSnippet('S1');

        beforeEach(function () {
            snippets.store.addItem(snippet);
        });

        it("it should contain one snippet", function () {
            expect(snippets.store.persistentArray().length).toBe(1);
        });

        it("it should contain the correct snippet", function () {
            expect(snippets.store.persistentArray()[0].display()).toBe('S1');
        });

        describe("When the snippet is removed", function () {

            beforeEach(function () {
                snippets.store.removeItem(snippet);
            });

            it("it should not contain any snippets", function () {
                expect(snippets.store.persistentArray().length).toBe(0);
            });
        });

        describe("When all the snippets are removed", function () {

            beforeEach(function () {
                snippets.store.removeAll();
            });

            it("it should not contain any snippets", function () {
                expect(snippets.store.persistentArray().length).toBe(0);
            });
        });
    });

    describe("when using a storage container with one snippet inflated from local storage", function () {

        var inflatedStorageContainer;

        beforeEach(function () {
            snippets.store.addItem(new SelectedSnippet('S1'));

            var inflatedStorage = new SelectedSnippetStorage();
            inflatedStorage.storageKey = "AAD.UnitTest.tbn.selectedSnippet";
            inflatedStorageContainer = inflatedStorage.getStorageContainer();
        });

        it("it should contain one snippet", function () {
            expect(inflatedStorageContainer.persistentArray().length).toBe(1);
        });

        it("it should contain the correct snippet", function () {
            expect(inflatedStorageContainer.persistentArray()[0].display()).toBe('S1');
        });
    });

    describe("when using a storage container with multiple snippets", function () {

        var snippet1 = new SelectedSnippet('S1');
        var snippet2 = new SelectedSnippet('S2');
        var snippet3 = new SelectedSnippet('S3');
        var snippet4 = new SelectedSnippet('S4');

        beforeEach(function () {
            snippets.store.addItem(snippet1);
            snippets.store.addItem(snippet2);
            snippets.store.addItem(snippet3);
            snippets.store.addItem(snippet4);
        });

        it("it should contain all the snippets", function () {
            expect(snippets.store.persistentArray().length).toBe(4);
        });

        it("it should contain the correct snippets", function () {
            expect(snippets.store.persistentArray()[0].display()).toBe('S1');
            expect(snippets.store.persistentArray()[1].display()).toBe('S2');
            expect(snippets.store.persistentArray()[2].display()).toBe('S3');
            expect(snippets.store.persistentArray()[3].display()).toBe('S4');
        });

        describe("When one snippet is removed", function () {

            beforeEach(function () {
                snippets.store.removeItem(snippet2);
            });

            it("it should contain the remaining snippets", function () {
                expect(snippets.store.persistentArray().length).toBe(3);
            });

            it("it should contain the correct snippets", function () {
                expect(snippets.store.persistentArray()[0].display()).toBe('S1');
                expect(snippets.store.persistentArray()[1].display()).toBe('S3');
                expect(snippets.store.persistentArray()[2].display()).toBe('S4');
            });

        });

        describe("When the first snippet is removed", function () {

            beforeEach(function () {
                snippets.store.removeItem(snippet1);
            });

            it("it should contain the remaining snippets", function () {
                expect(snippets.store.persistentArray().length).toBe(3);
            });

            it("it should contain the correct snippets", function () {
                expect(snippets.store.persistentArray()[0].display()).toBe('S2');
                expect(snippets.store.persistentArray()[1].display()).toBe('S3');
                expect(snippets.store.persistentArray()[2].display()).toBe('S4');
            });

        });

        describe("When the last snippet is removed", function () {

            beforeEach(function () {
                snippets.store.removeItem(snippet4);
            });

            it("it should contain the remaining snippets", function () {
                expect(snippets.store.persistentArray().length).toBe(3);
            });

            it("it should contain the correct snippets", function () {
                expect(snippets.store.persistentArray()[0].display()).toBe('S1');
                expect(snippets.store.persistentArray()[1].display()).toBe('S2');
                expect(snippets.store.persistentArray()[2].display()).toBe('S3');
            });

        });

        describe("When all the snippets are removed", function () {

            beforeEach(function () {
                snippets.store.removeAll();
            });

            it("it should not contain any snippets", function () {
                expect(snippets.store.persistentArray().length).toBe(0);
            });
        });

        describe("When a snippet is moved up", function () {

            beforeEach(function () {
                snippets.store.moveUp(snippet2);
            });

            it("it should contain the correct snippets in the correct order", function () {
                expect(snippets.store.persistentArray()[0].display()).toBe('S2');
                expect(snippets.store.persistentArray()[1].display()).toBe('S1');
                expect(snippets.store.persistentArray()[2].display()).toBe('S3');
                expect(snippets.store.persistentArray()[3].display()).toBe('S4');
            });
        });

        describe("When the first snippet is moved up", function () {

            beforeEach(function () {
                snippets.store.moveUp(snippet1);
            });

            it("it should contain the correct snippets in the correct order", function () {
                expect(snippets.store.persistentArray()[0].display()).toBe('S1');
                expect(snippets.store.persistentArray()[1].display()).toBe('S2');
                expect(snippets.store.persistentArray()[2].display()).toBe('S3');
                expect(snippets.store.persistentArray()[3].display()).toBe('S4');
            });
        });

        describe("When the last snippet is moved up", function () {

            beforeEach(function () {
                snippets.store.moveUp(snippet4);
            });

            it("it should contain the correct snippets in the correct order", function () {
                expect(snippets.store.persistentArray()[0].display()).toBe('S1');
                expect(snippets.store.persistentArray()[1].display()).toBe('S2');
                expect(snippets.store.persistentArray()[2].display()).toBe('S4');
                expect(snippets.store.persistentArray()[3].display()).toBe('S3');
            });
        });

        describe("When a snippet is moved down", function () {

            beforeEach(function () {
                snippets.store.moveDown(snippet2);
            });

            it("it should contain the correct snippets in the correct order", function () {
                expect(snippets.store.persistentArray()[0].display()).toBe('S1');
                expect(snippets.store.persistentArray()[1].display()).toBe('S3');
                expect(snippets.store.persistentArray()[2].display()).toBe('S2');
                expect(snippets.store.persistentArray()[3].display()).toBe('S4');
            });
        });

        describe("When the first snippet is moved down", function () {

            beforeEach(function () {
                snippets.store.moveDown(snippet1);
            });

            it("it should contain the correct snippets in the correct order", function () {
                expect(snippets.store.persistentArray()[0].display()).toBe('S2');
                expect(snippets.store.persistentArray()[1].display()).toBe('S1');
                expect(snippets.store.persistentArray()[2].display()).toBe('S3');
                expect(snippets.store.persistentArray()[3].display()).toBe('S4');
            });
        });

        describe("When the last snippet is moved down", function () {

            beforeEach(function () {
                snippets.store.moveDown(snippet4);
            });

            it("it should contain the correct snippets in the correct order", function () {
                expect(snippets.store.persistentArray()[0].display()).toBe('S1');
                expect(snippets.store.persistentArray()[1].display()).toBe('S2');
                expect(snippets.store.persistentArray()[2].display()).toBe('S3');
                expect(snippets.store.persistentArray()[3].display()).toBe('S4');
            });
        });
    });

});
