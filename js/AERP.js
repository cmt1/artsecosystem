/*import {
    timelineLinks,
    makerID
} from "./MARKERS.js";*/

//const tlinks = require('./MARKERS');

/*ADVANCED SEARCH JS */
jQuery(function ($) {
    var orgList = new List('orgs', {
        valueNames: ['name', {data: ['entity']}, {data: ['area']}, {data: ['disc']}]
    });

    function resetList() {
        orgList.search();
        orgList.filter();
        orgList.update();
        $('.filter, .search').prop('checked', false).val('');
        $(".open-dropdown").html(function () {
            return $(this).attr('data-label');
        });
    };

    function updateList() {
        var values = {
            entity: String($("input[name=form]:checked").val()),
            area: String($("input[name=area]:checked").val()),
            disc: String($("input[name=disc]:checked").val())
        };

        orgList.filter(function (item) {
            var filters = {};
            $.each(values, function(key, value) {
                filters[key] = value == null ? true : item.values()[key].indexOf(value) >= 0;
            });
            return filters.entity && filters.area && filters.disc;
        });
        orgList.update();
    }

    $("input[name=form], input[name=area], input[name=disc]").change(updateList);
    orgList.on('updated', function (list) {
        $('.no-result').toggle(list.matchingItems.length === 0);
        checkPagerPosition();
    });

    $('.btn-danger').click(resetList);
    $(".open-dropdown").click(function () {
        $(this).siblings('.dropdown').toggleClass("opened");
        $(this).toggleClass("active");
    });

    $('.org-nav').append('<div class="btn-next"> > </div><div class="btn-last"> >> </div>');
    $('.org-nav').prepend('<div class="btn-first"> << </div><div class="btn-prev"> < </div>');

    $('.btn-next').click(function () {
        $('.pagination .active').next().click();
        checkPagerPosition();
    });
    $('.btn-prev').click(function () {
        $('.pagination .active').prev().click();
        checkPagerPosition();
    });
    $('.btn-first').click(function () {
        orgList.show(1, 20);
        checkPagerPosition();
    });
    $('.btn-last').click(function () {
        orgList.show(orgList.size(), 20);
        checkPagerPosition();
    });

    $(document).on('click', '.page', checkPagerPosition);
    checkPagerPosition();

    function checkPagerPosition() {
        var isAtStart = $('.org-nav li:first').hasClass('active');
        var isAtEnd = $('.org-nav  li:last').hasClass('active');
        var noPages = $('.org-nav li').length === 0;

        $('.btn-prev, .btn-first').toggleClass('disabled', isAtStart || noPages);
        $('.btn-next, .btn-last').toggleClass('disabled', isAtEnd || noPages);
    }
});

$('.nav a').click(function () {
    $('.navbar-collapse').collapse('hide');
});
