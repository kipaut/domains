;$(function() {

    // добавили d корзину со страницы товара
    var cartButton = document.getElementById('button-cart');
    var breadcrums = [];

    if(document.getElementsByClassName('breadcrumbs-col').length) {
        breadcrums = document.getElementsByClassName('breadcrumbs-col')[0].getElementsByTagName('a');
    }
    var bought = {};

    if (cartButton) {
        cartButton.onclick = function () {
            bought = {
                id: $(document.getElementById('button-cart'))[0].classList[0],
                cost: document.getElementById('formated_special') ?
                    $(document.getElementById('formated_special'))[0].innerText :
                    $(document.getElementById('formated_price'))[0].innerText,
                name: breadcrums.length ? $(breadcrums[breadcrums.length - 1])[0].innerText : '',
                category: breadcrums.length ? $(breadcrums[breadcrums.length - 2])[0].innerText : ''
            };

            console.log(bought);
        };
    }

    // добавили в корзину с карусели/категории
    var carouseBuyButtons = document.querySelectorAll('.product-info-container>.cart>.button');

    if (!carouseBuyButtons.length) {
        carouseBuyButtons = document.querySelectorAll('.cart>.button');
    }

    if (carouseBuyButtons) {
        for (var i = 0; i < carouseBuyButtons.length; i++) {
            carouseBuyButtons[i].onclick = function (e) {
                var target = e.target || e.srcElement,
                    ProductInfoContainer = $(target)[0].parents('.product-info-container');

                if (!ProductInfoContainer.length) {
                    return;
                }

                bought = {
                    id: $(target)[0].classList[1] || 0,
                    cost: ProductInfoContainer[0].getElementsByClassName('price-new').length ?
                        ProductInfoContainer[0].getElementsByClassName('price-new')[0].innerText :
                        ProductInfoContainer[0].getElementsByClassName('price')[0].innerText,
                    name: ProductInfoContainer[0].getElementsByClassName('name')[0].getElementsByTagName('a')[0].innerText,
                    category: breadcrums.length ? $(breadcrums[breadcrums.length - 1])[0].innerText : ''
                };

                console.log(bought);
            };
        }
    }

    // аналог jQuery .parents()
    Element.prototype.parents = function(selector) {
        var elements = [];
        var elem = this;
        var ishaveselector = selector !== undefined;

        while ((elem = elem.parentElement) !== null) {
            if (elem.nodeType !== Node.ELEMENT_NODE) {
                continue;
            }

            if (!ishaveselector || elem.matches(selector)) {
                elements.push(elem);
            }
        }

        return elements;
    };
});

