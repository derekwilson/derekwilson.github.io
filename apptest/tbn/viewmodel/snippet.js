function Catagory(id, display) {
    var self = this;
    self.id = id;
    self.display = ko.observable(display);
    self.snippets = ko.observableArray();

    self.numberOfSnippets = ko.computed(function() {
        return self.snippets().length;
    }, this);
}

function Snippet(catagoryId, display) {
    var self = this;
    self.catagoryId = catagoryId;
    self.display = ko.observable(display);
}

