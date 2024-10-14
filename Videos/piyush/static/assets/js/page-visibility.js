$(document).ready(function(){
  var style = localStorage.getItem('page-visibility');
  visibility();

    $(document).on('click', '#page-visibility', function () {
        var style = localStorage.getItem('page-visibility');
        if (style == 'show') {
          localStorage.setItem('page-visibility', 'hide');
          // $('#page-visibility').attr('checked', false);
          visibility();
        } else {
          localStorage.setItem('page-visibility', 'show');
          // $('#page-visibility').attr('checked', true);
          visibility();
        }
    });

    function visibility(){
      var style = localStorage.getItem('page-visibility');
      if (style === 'show') {
        $('#page-visibility').attr('checked', true);
        $('[visibility="hide"]').removeClass('d-none');
      } else {
        $('#page-visibility').attr('checked', false);
        $('[visibility="hide"]').addClass('d-none');
      }
    }

});