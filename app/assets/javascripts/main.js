$(document).ready(function(){
  // One page navigation
  $('.nav').singlePageNav({
    offset: $('.navbar').outerHeight()
  });

  // Scroll to top
  $('.smooth-scroll').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
  // Contact
  $('#submit').click(function(){
    $.post("contactus.php", $(".frm").serialize(),  function(response) {
      $('#success').html(response);
    });
    return false;
  });

  //online-estimate
  function isDataAdded() {
    var isFormAdded = $('#table-data tr').length;
    if(isFormAdded == 0)
    {
      $('#table-data').append('<p id="helperText">No Data Added</p>');
    }
    else {
      $('#helperText').remove();
    }
  }

  isDataAdded();
  var sn = 0;
  var cost = 0;
  $('#form-add').on('click',function(){
    var dropDownData = $('#form-select option:selected').val();
    var numOfForms = $('#numberOfForm').val();
    if((dropDownData != "") && (numOfForms != 0))
    {
      sn++;
      $('#table-data').append(
        '<tr>' +
          '<td>'+ sn + '</td>' +
          '<td>'+ dropDownData + '</td>' +
          '<td>'+ numOfForms + '</td>' +
        '</tr>'
      );
      isDataAdded();
      cost += numOfForms * 4;
      $('#costDisplay').text( cost );
      $('#totalCost').text( cost + 2.99 );
    }
  });
});
