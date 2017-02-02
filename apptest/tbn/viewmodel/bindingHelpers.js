// jqmforeach came from 
// http://blog.dee4star.com/integrating-knockoutjs-with-jquery-mobile-1


ko.virtualElements.allowedBindings.jqmforeach = true;
ko.bindingHandlers.jqmforeach = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

        return ko.bindingHandlers['foreach']['init'](element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

        var output = ko.bindingHandlers['foreach']['update'](element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);

        if ($.mobile.activePage) {
            $.mobile.activePage.trigger('pagecreate');
        }

//        $('#selector').trigger('create');

        var listview = null;

        if (element.nodeType == 8) {
            if (element.parentNode.tagName.toLowerCase() == 'ul' && element.parentNode.getAttribute('data-role') == 'listview')
                listview = element.parentNode;
        } else if (element.hasAttribute('data-role') && element.getAttribute('data-role') == 'listview')
            listview = element;

        if (listview) {
            try {
                $(listview).listview('refresh');
            } catch (e) {
                try { $(listview).listview(); } catch (e) { };
            }
        }

        var properties = allBindingsAccessor().jmforeach;
        if (properties) {
            if (properties['onRendered']) {
                var value = valueAccessor();
                properties['onRendered'](element, value.data ? value.data : value);
            }

        }

        return output;
    }
};

