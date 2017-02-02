function Category(id, display) {
    var self = this;
    self.id = id;
    self.display = ko.observable(display);
    self.snippets = ko.observableArray();

    self.numberOfSnippets = ko.computed(function() {
        return self.snippets().length;
    }, this);
}

function Snippet(categoryId, display) {
    var self = this;
    self.categoryId = categoryId;
    self.display = ko.observable(display);
}

