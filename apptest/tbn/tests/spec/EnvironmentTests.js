
describe("Environment", function () {

    var environment;

    // This beforeEach is called before each test, and also before any nested beforeEach calls,
    // so is like a base-class GivenThat()
    beforeEach(function () {
        environment = new Environment();
    });

    describe("when constructing an environment object", function () {

        beforeEach(function () {
        });

        it("it should contain a version number string", function () {
            expect(environment.appVersion().length).toBeGreaterThan(0);
        });
    });

});
