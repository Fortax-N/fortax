var initializeOnlineEstimate = function(){
  var onlineEstimate;
  var form;

  form = {
    hasSelectedStudentForm: false,
    studentFormPrice: function(){
      return $('#StudentT2202').data('cost');
    },
    dropDownText: function(){
      return $('#form-select option:selected').text();
    },
    dropDownValue: function() {
      return $('#form-select option:selected').val();
    },
    numOfForms: function(){
      return $('#numberOfForm').val();
    },
    price: function(){
      return $('#form-select option:selected').data('cost');
    },
    addToForm: function(){
      if(form.dropDownValue() !== " " && form.numOfForms() !== 0)
      {
        onlineEstimate.appendToTable();
        onlineEstimate.toggleHelperText();
        onlineEstimate.calculateCost();
        onlineEstimate.changeEstimate();
        onlineEstimate.changeStatus();
        form.disableButton();
      } else {
        onlineEstimate.displayError();
      }
    },
    isStudentForm: function(){
      return (form.dropDownText() === "StudentT2202");
    },
    disableButton: function(){
      if (form.isStudentForm() === true) {
        $('#form-add').prop("disabled", true);
      }
    },
    enableButton: function(){
      $("#form-add").removeAttr("disabled");
    },
    disableNoOfForm: function() {
      if (form.isStudentForm() === true) {
        $('#numberOfForm').prop("disabled", true);
      }
    },
    enableNoOfForm: function() {
      if (form.isStudentForm() === false) {
        $('#numberOfForm').removeAttr("disabled");
      }
    },
    removeForm: function(target){
      var minusPrice = $(target).closest('tr').data('price');

      $(target).closest('tr').remove();

      if(minusPrice === form.studentFormPrice()) {
        form.reenableStudentForm();
      }

      onlineEstimate.cost -= minusPrice;
      onlineEstimate.changeEstimate();
    },
    reenableStudentForm: function(){
      form.enableButton();
      this.hasSelectedStudentForm = false;
    }
  }

  onlineEstimate = {
    cost: 0,
    eFileFee: 2.99,
    totalCost: 0,
    toggleHelperText: function(){
      var tableLength = $('#table-data tr').length;
      if (tableLength === 0) {
        $('#table-data').append('<p id="helperText">No Data Added</p>');
      }
      else {
        $('#helperText').remove();
      }
    },
    appendToTable: function() {
      $('#table-data').append(
        '<tr data-price="' + form.price() * form.numOfForms() + '">' +
          '<td>'+ form.dropDownValue() + '</td>' +
          '<td>'+ form.numOfForms() + '</td>' +
          '<td>'+ '$' + form.price() + '</td>' +
          '<td><button type="button" class="btn btn-primary btn-xs" id="delete">' +
            '<i class="fa fa-trash-o" aria-hidden="true"></i>' +
          '</button></td>' +
        '</tr>'
      );
    },
    changeEstimate: function(){
      $('#errorMessage').css('display','none');
      $('#costDisplay').text( this.cost );
      this.totalCost = Math.round(this.calculateTotalCost()) / 100;
      $('#totalCost').text( this.totalCost );
    },
    calculateTotalCost: function(){
      return (this.cost + this.eFileFee) * 100;
    },
    calculateCost: function() {
      this.cost += (form.numOfForms() * form.price());
    },
    displayError: function(){
      $('#errorMessage').css('display','block');
    },
    resetNumOfForms: function(){
      $('#numberOfForm').val(1);
    },
    changeStatus: function(){
      if (form.isStudentForm() === true) {
        form.hasSelectedStudentForm = true;
      }
    }
  }

  onlineEstimate.toggleHelperText();

  $('#form-select').on('change',function(){
    onlineEstimate.resetNumOfForms();
    form.disableNoOfForm();
    if(form.hasSelectedStudentForm && form.isStudentForm())
    {
      form.disableButton();
      form.disableNoOfForm();
    } else {
      form.enableButton();
      form.enableNoOfForm();
    }
  });

  $(document).on('click','button#form-add',function(){
    form.addToForm();
  });

  $(document).on('click','button#delete',function(){
    form.removeForm(this);
  });
}

$(document).on("turbolinks:load", function(){
  initializeOnlineEstimate();
  $('#infos_change_in_status_during_year_true').click(function(){
    if($(this).val() === "true"){
      $('#options-for-change-in-status').show('slow');
    }
  });
  
  $('#infos_change_in_status_during_year_false').click(function(){
    if($(this).val() === "false"){
      $('#options-for-change-in-status').hide('slow');
    }
  });

  $('#infos_register_for_direct_deposit_true').click(function(){
     if($(this).val() === "true"){
      $('#options-for-bank-info').hide('slow');
    } 
  });
  
  $('#infos_register_for_direct_deposit_false').click(function(){
     if($(this).val() === "false"){
      $('#options-for-bank-info').show('slow');
    } 
  });

  $('#infos_residence_owner').click(function(){
     if($(this).val() === "Owner"){
      $('#property-tax').show('slow');
      $('#rent-paid').hide('fast');
    }
  });


  $('#infos_residence_tenant').click(function(){
     if($(this).val() === "Tenant"){
      $('#property-tax').hide('fast');
      $('#rent-paid').show('slow');
    }
  });

  $("#add_spouse_info").click(function(){
    $('.spouse_information').toggle('fast');
  });

  $("#add_child_info").click(function(){
    $('.children_information').toggle('fast');
  });


    //jQuery time
  var current_fs, next_fs, previous_fs; //fieldsets
  var left, opacity, scale; //fieldset properties which we will animate
  var animating; //flag to prevent quick multi-click glitches

  $(".next").click(function(){
    if(animating) return false;
    animating = true;
    
    current_fs = $(this).parent();

    next_fs = $(this).parent().next();
    
    //activate next step on progressbar using the index of next_fs
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
    
     
    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
      step: function(now, mx) {
        //as the opacity of current_fs reduces to 0 - stored in "now"
        //1. scale current_fs down to 80%
        scale = 1 - (1 - now) * 0.2;
        //2. bring next_fs from the right(50%)
        left = (now * 50)+"%";
        //3. increase opacity of next_fs to 1 as it moves in
        opacity = 1 - now;
        current_fs.css({'transform': 'scale('+scale+')'});
        next_fs.css({'left': left, 'opacity': opacity});
      }, 
      duration: 800, 
      complete: function(){
        current_fs.hide();
        animating = false;
        //show the next fieldset
        next_fs.show();
      }, 
      //this comes from the custom easing plugin
      easing: 'easeInOutBack'
    });

    
  });

  $(".previous").click(function(){
    if(animating) return false;
    animating = true;
    
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();
    
    //de-activate current step on progressbar
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
    
    //show the previous fieldset
    previous_fs.show(); 
    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
      step: function(now, mx) {
        //as the opacity of current_fs reduces to 0 - stored in "now"
        //1. scale previous_fs from 80% to 100%
        scale = 0.8 + (1 - now) * 0.2;
        //2. take current_fs to the right(50%) - from 0%
        left = ((1-now) * 50)+"%";
        //3. increase opacity of previous_fs to 1 as it moves in
        opacity = 1 - now;
        current_fs.css({'left': left});
        previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
      }, 
      duration: 800, 
      complete: function(){
        current_fs.hide();
        animating = false;
      }, 
      //this comes from the custom easing plugin
      easing: 'easeInOutBack'
    });
  });

  $(".submit").click(function(){
    return false;
  })


});

