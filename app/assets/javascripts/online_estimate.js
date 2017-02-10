var app = {
  numOfChildren: 2,
  numOfSpouseChildren: 2
}


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
    includedForms: function(){
      return $('#form-select option:selected').data('included');
    },
    addSpouseRow: function(){
      $("#spouse-row").show();
    },
    removeSpouseRow: function(){
      $("#spouse-row").hide();
    },
    addSpouse: function(){
      var checkbox = $("#add_forms_for_spouse");

      checkbox.change(function(event) {
          var checkbox = event.target;
          if (checkbox.checked) {
            onlineEstimate.spouseMultiplier = 2;
            onlineEstimate.changeEstimate();
            form.addSpouseRow();
          } else {
            onlineEstimate.spouseMultiplier = 1;
            onlineEstimate.changeEstimate();
            form.removeSpouseRow();
          }
      });
    },   
    addToForm: function(){
      if(form.dropDownValue() !== " " && form.numOfForms() !== 0)
      { 
        var tr = $('tr[data-name="' + form.dropDownValue() + '"]');

        if (tr.length) {
          form.increaseAmount();
          form.increaseTotalAmount();
        } else {
          onlineEstimate.appendToTable();
          onlineEstimate.appendToTotalTable();
          onlineEstimate.addFormInput();
          onlineEstimate.toggleHelperText();
          onlineEstimate.calculateCost();
          onlineEstimate.changeEstimate();
          onlineEstimate.changeStatus();
          form.disableButton();
        }        
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
      var numOfForms = $(target).closest('tr').data('number');
      var includedForms = $(target).closest('tr').data('included');

      $(target).closest('tr').remove();

      if(minusPrice === form.studentFormPrice()) {
        form.reenableStudentForm();
      }

      if (includedForms < numOfForms) {
        onlineEstimate.cost -= minusPrice * numOfForms;
        onlineEstimate.changeEstimate();  
      }
    },
    increaseTotalAmount: function(){
      var target = $('#js-total-row tr[data-name="' + form.dropDownValue() + '"]');
      var tr = $(target)    
      
      var price = tr.data('price');
      var numOfForms = tr.data('number');
      var formName = tr.data('name');
      var includedForms = tr.data('included');

      // replace text
      var totalFormsSpan = tr.find(".js-total-num-of-forms");
      $(totalFormsSpan).html(numOfForms);

      // if number of forms exceed number of included forms
      var $priceRow = $(tr.find(".js-total-price"))

      if (numOfForms > includedForms) {
        var totalPrice = price * (numOfForms - includedForms);
        $priceRow.html("$" + totalPrice);
      } else {
        $priceRow.html("$" + 0);
      }
    },
    increaseAmount: function(){
      var target = $('tr[data-name="' + form.dropDownValue() + '"]');
      var tr = $(target);

      // increase number of forms
      var number = tr.data('number') + 1;
      tr.data('number', number);      
      
      var price = tr.data('price');
      var numOfForms = tr.data('number');
      var formName = tr.data('name');
      var includedForms = tr.data('included');

      // replace text
      var td = tr.find("td")[1]
      $(td).html(numOfForms);

      // update form value
      var input = $("#" + formName.replace(/ /g,"_"));
      input.attr('value', numOfForms + " " + formName + " forms");

      // if number of forms exceed number of included forms
      if (numOfForms > includedForms) {
        onlineEstimate.cost += tr.data('price');
        onlineEstimate.changeEstimate();
      }
    },
    decreaseTotalAmount: function(){
      var target = $('#js-total-row tr[data-name="' + form.dropDownValue() + '"]');
      var tr = $(target);
      var numOfForms = tr.data('number');

      if (numOfForms == 0) {
        target.remove();
      } else {
        var price = tr.data('price');
        var formName = tr.data('name');
        var includedForms = tr.data('included');

        // replace text
        var totalFormsSpan = tr.find(".js-total-num-of-forms");
        $(totalFormsSpan).html(numOfForms);
        // if number of forms exceed number of included forms
        var $priceRow = $(tr.find(".js-total-price"))

        if (numOfForms > includedForms) {
          var totalPrice = price * (numOfForms - includedForms);
          $priceRow.html("$" + totalPrice);
        } else {
          $priceRow.html("$" + 0);
        }
      }
    },
    decreaseAmount: function(target){
      var target = $('tr[data-name="' + form.dropDownValue() + '"]');
      var tr = $(target);

      // increase number of forms
      var number = tr.data('number') - 1;

      if (number == 0) {
        this.removeForm(target);

        var input = $("#" + tr.data('name').replace(/ /g,"_"));
        input.remove();
      } else {
        tr.data('number', number);      

        var price = tr.data('price');
        var numOfForms = tr.data('number');
        var formName = tr.data('name');
        var includedForms = tr.data('included');

        // replace text
        var td = tr.find("td")[1]
        $(td).html(numOfForms);

        // update form value
        var input = $("#" + formName.replace(/ /g,"_"));
        input.attr('value', numOfForms + " " + formName + " forms");

        console.log(numOfForms);
        console.log(includedForms);        
        onlineEstimate.cost -= tr.data('price');
        onlineEstimate.changeEstimate(); 
      }
      
    },
    reenableStudentForm: function(){
      form.enableButton();
      this.hasSelectedStudentForm = false;
    }
  }

  onlineEstimate = {
    cost: 49.99,
    eFileFee: 3.99,
    totalCost: this.cost + this.eFileFee,
    totalFamilyCost: (this.cost + this.eFileFee) * this.spouseMultiplier,
    hst: 1.13,
    spouseMultiplier: 1,
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
        '<tr data-number="' +  form.numOfForms() + '" data-price="' + form.price() * form.numOfForms() + '" data-name="' + form.dropDownText() + '" data-included="' + form.includedForms() + '">' +
          '<td>'+ form.dropDownValue() + '</td>' +
          '<td>'+ form.numOfForms() + '</td>' +
          '<td>'+ '$' + form.price() + '</td>' +
          `<td class="col-xs-3">
            <button type="button" class="btn btn-success btn-xs" id="add">
              <i class="fa fa-plus" aria-hidden="true"></i>
            </button>
            <button type="button" class="btn btn-danger btn-xs" id="minus">
              <i class="fa fa-minus" aria-hidden="true"></i>
            </button>
            <button type="button" class="btn btn-primary btn-xs" id="delete">
              <i class="fa fa-trash-o" aria-hidden="true"></i>
            </button>
           </td>` +
        '</tr>'
      );
    },
    appendToTotalTable: function(){
      var price;
      if (form.numOfForms() > form.includedForms()) {
        price = (form.numOfForms() - form.includedForms()) * form.price();
      } else {
        price = 0
      }

      $('#js-total-row').append(
        '<tr data-number="' +  form.numOfForms() + '" data-price="' + form.price() * form.numOfForms() + '" data-name="' + form.dropDownText() + '" data-included="' + form.includedForms() + '">' +
          '<td>'+ form.dropDownValue() + ' (<span class="js-total-num-of-forms">' + form.numOfForms() + '</span>) ' + '</td>' +          
          '<td class="js-total-price">'+ '$' + price + '</td>' +          
        '</tr>'
      );
    },
    changeEstimate: function(){
      $('#errorMessage').css('display','none');
      $('#costDisplay').text( (this.cost).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0] );
      this.totalCost = (this.calculateTotalCost() / 100).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
      this.totalFamilyCost = (this.calculateFamilyTotalCost() / 100).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
      $('.totalCost').text( this.totalCost );
      $('#totalFamilyCost').text( this.totalFamilyCost );
    },
    calculateTotalCost: function(){
      return (this.cost + this.eFileFee) * 100 * this.hst;
    },
    calculateFamilyTotalCost: function(){
      return ((this.cost + this.eFileFee) * 100 * this.hst * this.spouseMultiplier).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
    },
    calculateCost: function() {
      if (form.includedForms() < form.numOfForms()) {
        this.cost += (form.numOfForms() * form.price());  
      }
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
    },
    addFormInput: function(){
      $('<input />').attr('type', 'hidden')
        .attr('id',  form.dropDownValue().replace(/ /g,"_"))
        .attr('data-number', form.numOfForms())
        .attr('name', 'form_quantity')
        .attr('value', form.numOfForms() + " " + form.dropDownValue() + " forms")
        .appendTo('form');
    }
  }

  onlineEstimate.toggleHelperText();
  form.addSpouse();

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

  $(document).on('click','button#add',function(){
    form.increaseAmount();
    form.increaseTotalAmount();
  });

  $(document).on('click','button#minus',function(){
    form.decreaseAmount();
    form.decreaseTotalAmount();
  });

}

$(document).on("ready", function(){
  initializeOnlineEstimate();
  $('input[type=radio][name="change_in_status_during_year"]').on("change", function(){
    if($(this).val() === "true"){
      $('#options-for-change-in-status').show('slow');
    } else {
      $('#options-for-change-in-status').hide('slow');
    }
  });
  $('input[type=radio][name="register_for_direct_deposit"]').on("change", function(){
     if($(this).val() === "true"){
      $('#options-for-bank-info').hide('slow');
    } 
  });
  
  $('input[type=radio][name="register_for_direct_deposit"]').on("change", function(){
    if($(this).val() === "false"){
      $('#options-for-bank-info').show('slow');
    } 
  });

  $('input[type=radio][name="residence"]').on("change", function(){
     if($(this).val() === "Owner"){
      $('#property-tax').show('slow');
      $('#rent-paid').hide('fast');
    } else {
      $('#property-tax').hide('fast');
      $('#rent-paid').show('slow');
    }
  });

  $('input[type=radio][name="spouse-residence"]').on("change", function(){
     if($(this).val() === "Owner"){
      $('#spouse-property-tax').show('slow');
      $('#spouse-rent-paid').hide('fast');
    } else {
      $('#spouse-property-tax').hide('fast');
      $('#spouse-rent-paid').show('slow');
    }
  });

  function addChildren(){
    app.numOfChildren += 1;
    var numOfChildren = app.numOfChildren;
    var html = `
    <tr data-child-id="${numOfChildren}">
      <th class="col-xs-4">First Name (Child ${numOfChildren})</th>
      <td class="col-xs-8">
        <input class="form-control" name="child_${numOfChildren}_first_name" placeholder="First Name" type="text">
      </td>
    </tr>
    <tr data-child-id="${numOfChildren}">
      <th class="col-xs-4">Last Name (Child ${numOfChildren})</th>
      <td class="col-xs-8">
        <input class="form-control" name="child_${numOfChildren}_last_name" placeholder="Last Name" type="text">
      </td>
    </tr>
    <tr data-child-id="${numOfChildren}">
      <th class="col-xs-4">Date of birth (Child ${numOfChildren})</th>
      <td class="col-xs-8">
        <input class="form-control" name="child_${numOfChildren}_date_of_birth.col-xs-4" placeholder="Date of Birth" type="date">
      </td>
    </tr>
    <tr data-child-id="${numOfChildren}">
      <th class="col-xs-4">Social Insurance (Child ${numOfChildren})</th>
      <td class="col-xs-8">
        <input class="form-control" name="child_${numOfChildren}_social_insurance" placeholder="Social Insurance Number" type="text">
      </td>
    </tr>
    <tr data-child-id="${numOfChildren}">
      <th class="col-xs-4"></th>
      <td class="col-xs-8">
        <button type="button" class="js-remove-child-trigger action-button" data-child-id="${numOfChildren}">
          Remove Child
        </button>
      </td>
    </tr>
    `

    $("#js-children_information").append(html);        
  }

  function removeChild(e){
    var childId = $(e.target).data("child-id");

    $("tr[data-child-id='" + childId + "']").remove();
    app.numOfChildren -= 1;
  }

  $("#js-add-child-trigger").click(function(){
    addChildren();    

    $(".js-remove-child-trigger").unbind();
    $(".js-remove-child-trigger").click(function(e){
      removeChild(e);
    });

  });

  $(".js-remove-child-trigger").click(function(e){
    removeChild(e);
  });

  
  function addSpouseChildren(){
    app.numOfSpouseChildren += 1;
    var numOfChildren = app.numOfSpouseChildren;
    var html = `
    <tr data-spouse-child-id="${numOfChildren}">
      <th class="col-xs-4">First Name (Child ${numOfChildren})</th>
      <td class="col-xs-8">
        <input class="form-control" name="spouse_child_${numOfChildren}_first_name" placeholder="First Name" type="text">
      </td>
    </tr>
    <tr data-spouse-child-id="${numOfChildren}">
      <th class="col-xs-4">Last Name (Child ${numOfChildren})</th>
      <td class="col-xs-8">
        <input class="form-control" name="spouse_child_${numOfChildren}_last_name" placeholder="Last Name" type="text">
      </td>
    </tr>
    <tr data-spouse-child-id="${numOfChildren}">
      <th class="col-xs-4">Date of birth (Child ${numOfChildren})</th>
      <td class="col-xs-8">
        <input class="form-control" name="spouse_child_${numOfChildren}_date_of_birth.col-xs-4" placeholder="Date of Birth" type="date">
      </td>
    </tr>
    <tr data-spouse-child-id="${numOfChildren}">
      <th class="col-xs-4">Social Insurance (Child ${numOfChildren})</th>
      <td class="col-xs-8">
        <input class="form-control" name="spouse_child_${numOfChildren}_social_insurance" placeholder="Social Insurance Number" type="text">
      </td>
    </tr>
    <tr data-spouse-child-id="${numOfChildren}">
      <th class="col-xs-4"></th>
      <td class="col-xs-8">
        <button type="button" class="js-remove-spouse-child-trigger action-button" data-spouse-child-id="${numOfChildren}">
          Remove Child
        </button>
      </td>
    </tr>
    `

    $("#js-spouse-children_information").append(html);        
  }

  function removeSpouseChild(e){
    var childId = $(e.target).data("spouse-child-id");

    $("tr[data-spouse-child-id='" + childId + "']").remove();
    app.numOfSpouseChildren -= 1;
  }

  $("#js-add-spouse-child-trigger").click(function(){
    addSpouseChildren();    

    $(".js-remove-spouse-child-trigger").unbind();
    $(".js-remove-spouse-child-trigger").click(function(e){
      removeSpouseChild(e);
    });

  });

  $(".js-remove-spouse-child-trigger").click(function(e){
    removeSpouseChild(e);
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

    // if spouse is not included
    if ($("fieldset").index(next_fs) == 3 && !$("#add_forms_for_spouse").checked) {
      next_fs = $(this).parent().next().next();
      $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
    }
     
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

  $(".prev").click(function(){
    if(animating) return false;
    animating = true;
    
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();
    
    //de-activate current step on progressbar
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

    if ($("fieldset").index(previous_fs) == 3 && !$("#add_forms_for_spouse").checked) {
      previous_fs = $(this).parent().prev().prev();
      $("#progressbar li").eq($("fieldset").index(previous_fs)).addClass("active");
    }
    
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


});

