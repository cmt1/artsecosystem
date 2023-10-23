/*import {
    timelineLinks,
    makerID
} from "./MARKERS.js";*/

//const tlinks = require('./MARKERS');








/*ADVANCED SEARCH JS */
jQuery(function ($) {


    var options = {
        valueNames: [
      'name',
            {
                data: ['entity']
      },
            {
                data: ['area']
      },
            {
                data: ['disc']
      },
    ],
        // page: 20,
        // pagination: true
    };
    var orgList = new List('orgs', options);

    function resetList() {
        orgList.search();
        orgList.filter();
        orgList.update();
        $('.filter').prop('checked', false);
        $('.search').val('');
        $(".open-dropdown").each(function () {
            $(this).html($(this).attr('data-label'));
        });
    };

    function updateList() {

        var values_entity = $("input[name=form]:checked").val();
        var values_area = $("input[name=area]:checked").val();
        var values_disc = $("input[name=disc]:checked").val();

        var entityValue = String(values_entity);
        var areaValue = String(values_area);
        var discValue = String(values_disc);


        orgList.filter(function (item) {

            var entityFilter = false;
            var areaFilter = false;
            var discFilter = false;

            if (values_entity == null) {
                entityFilter = true;

            } else {
                entityFilter = item.values().entity.indexOf(entityValue) >= 0;
                // console.log(item.values().entity,  entityFilter );
            }

            if (values_area == null) {
                areaFilter = true;
            } else {
                areaFilter = item.values().area.indexOf(areaValue) >= 0;
                // console.log(item.values().area, areaValue );
            }

            if (values_disc == null) {
                discFilter = true;
            } else {
                discFilter = item.values().disc.indexOf(discValue) >= 0;
                // console.log(item.values().disc, discValue );
            }

            return entityFilter && areaFilter && discFilter;
        });
        orgList.update();
    }

    $(function () {
        //updateList();
        $("input[name=form]").change(updateList);
        $('input[name=area]').change(updateList);
        $('input[name=disc]').change(updateList);
        orgList.on('updated', function (list) {
            if (list.matchingItems.length > 0) {
                $('.no-result').hide()
            } else {
                $('.no-result').show()
            }
            checkPagerPosition();
        });
    });

    $('.btn-danger').on('click', function () {
        resetList();
        $('label').removeClass('colored');
        $('.open-dropdown').removeClass('active');
    });
    $(".open-dropdown").on("click", function () {
        $(this).siblings('.dropdown').toggleClass("opened");
        $(this).toggleClass("active");
        $(".open-dropdown").not(this).removeClass('active');
        $(".open-dropdown").not(this).siblings('.dropdown').removeClass("opened");
    });

    $(".open-dropdown").siblings('.dropdown').find('input').on("click", function () {
        var label = $("label[for='" + $(this).attr('id') + "']");
        $(this).closest('.dropdown').removeClass("opened");
        $(".open-dropdown.active").html(label.text());
        $(this).toggleClass("active");
        $(this).siblings().addClass('colored');
        $(this).parent().siblings().removeClass('selected');
        $(this).parent().siblings().find('label').removeClass('colored');
        $(".open-dropdown").removeClass("active");
    });

    $('.org-nav').append('<div class="btn-next"> > </div><div class="btn-last"> >> </div>');

    $('.org-nav').prepend('<div class="btn-first"> << </div><div class="btn-prev"> < </div>');

    $('.btn-next').on('click', function () {
        $('.pagination .active').next().trigger('click');
        checkPagerPosition();
    })
    $('.btn-prev').on('click', function () {
        $('.pagination .active').prev().trigger('click');
        console.log('click');
        checkPagerPosition();
    })
    $('.btn-first').on('click', function () {
        orgList.show(1, 20);
        checkPagerPosition();
    })
    $('.btn-last').on('click', function () {
        orgList.show(orgList.size(), 20);
        checkPagerPosition();
    });

    $(document).on('click', '.page', function () {
        checkPagerPosition();
    });

    checkPagerPosition();

    function checkPagerPosition() {

        if ($('.org-nav li:first').hasClass('active')) {
            $('.btn-prev, .btn-first').addClass('disabled');
        } else {
            $('.btn-prev, .btn-first').removeClass('disabled');
        }
        // Check if we're on the last page and disable .next if true
        if ($('.org-nav  li:last').hasClass('active')) {
            $('.btn-next, .btn-last').addClass('disabled');
        } else {
            $('.btn-next, .btn-last').removeClass('disabled');
        }

        if ($('.org-nav li').length === 0) {
            $('.btn-prev, .btn-next, .btn-first, .btn-last').addClass('disabled');
        }

    }
});
/*Code Zone A*/
$('.nav a').click(function () {
    $('.navbar-collapse').collapse('hide');
});
