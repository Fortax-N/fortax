var app = {
  numOfChildren: 1,
  numOfSpouseChildren: 1
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
    spouseDropDownText: function(){
      return $('#spouse-form-select option:selected').text().replace("spouse_", "");
    },
    dropDownValue: function() {
      return $('#form-select option:selected').val();
    },
    spouseDropDownValue: function() {
      return $('#spouse-form-select option:selected').val().replace("spouse_", "");
    },
    numOfForms: function(){
      return $('#numberOfForm').val();
    },
    spouseNumOfForms: function(){
      return $('#spouseNumberOfForm').val();
    },
    price: function(){
      return $('#form-select option:selected').data('cost');
    },
    spousePrice: function(){
      return $('#spouse-form-select option:selected').data('cost');
    },
    includedForms: function(){      
      return parseFloat($('#form-select option:selected').data('included'));
    },
    spouseIncludedForms: function(){      
      return parseFloat($('#spouse-form-select option:selected').data('included'));
    },
    addSpouseRow: function(){
      $(".spouse-row").show();
    },
    removeSpouseRow: function(){
      $(".spouse-row").hide();
    },
    addSpouse: function(){
      var checkbox = $(".add_forms_for_spouse");

      checkbox.change(function(event) {
          var checkbox = event.target;
          if ($(checkbox).val() === "true") {
            onlineEstimate.spouseMultiplier = 2;
            onlineEstimate.spouseCost = 49.99;
            onlineEstimate.changeEstimate(true);
            form.addSpouseRow();
            $("#js-spouse-table").show();
            $(".add_forms_for_spouse").prop("disabled", true);
          } else {
            $(".add_forms_for_spouse").prop("disabled", true);
            onlineEstimate.spouseMultiplier = 1;
            onlineEstimate.spouseCost = 0;
            onlineEstimate.totalSpouseCost = 0;
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
          form.increaseAmount(form.numOfForms());
          form.increaseTotalAmount(form.numOfForms());
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

    addToSpouseForm: function(){
      if(form.spouseDropDownValue() !== " " && form.spouseNumOfForms() !== 0)
      { 
        var tr = $('#spouseAddedData tr[data-name="' + form.spouseDropDownValue() + '"]');

        if (tr.length) {
          form.increaseAmount(form.spouseNumOfForms(), null, true);
          form.increaseTotalAmount(form.spouseNumOfForms(), null, true);
        } else {
          onlineEstimate.appendToSpouseTable();
          onlineEstimate.appendToSpouseTotalTable();
          onlineEstimate.addSpouseFormInput();
          onlineEstimate.toggleSpouseHelperText();
          onlineEstimate.calculateSpouseCost();
          onlineEstimate.changeEstimate(true);
          onlineEstimate.changeStatus();
          form.spouseDisableButton();
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
    spouseDisableButton: function(){
      if (form.isStudentForm() === true) {
        $('#spouse-form-add').prop("disabled", true);
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
    removeForm: function(target, spouse=false){
      var name = $(target).closest('tr').data('name');
      var minusPrice = $(target).closest('tr').data('price');
      var numOfForms = $(target).closest('tr').data('number');
      var includedForms = $(target).closest('tr').data('included');

      $(target).closest('tr[data-name="' + name + '"]').remove();    

      if(form.isStudentForm()) {
        form.reenableStudentForm();
      }

      if (includedForms < numOfForms) {
        if (spouse) {
          onlineEstimate.spouseCost -= minusPrice * (numOfForms - includedForms);
          onlineEstimate.changeEstimate(true);  
        } else {
          onlineEstimate.cost -= minusPrice * (numOfForms - includedForms);
          onlineEstimate.changeEstimate();  
        }  
        
      } else if (includedForms == 0) {

        if (spouse) {
          onlineEstimate.spouseCost -= minusPrice;
          onlineEstimate.changeEstimate(true);  
        } else {
          onlineEstimate.cost -= minusPrice;
          onlineEstimate.changeEstimate();    
        }
        
      }
    },
    increaseTotalAmount: function(num, name=null, spouse=false){
      if (name === null && spouse === false) {
        name = form.dropDownValue()
      } else if (name === null && spouse === true) {
        name = form.spouseDropDownValue();
      }

      var target, dataSource;

      if (spouse) {
        target = $('#js-spouse-total-row tr[data-name="' + name + '"]');
        dataSource = $('#spouse-table-data tr[data-name="' + name + '"]');
      } else {
        target = $('#js-total-row tr[data-name="' + name + '"]');
        dataSource = $('#table-data tr[data-name="' + name + '"]');
      }
      
      var tr = $(target);
      
      var price = $(dataSource).data('price');
      var numOfForms = $(dataSource).data('number');
      var formName = $(dataSource).data('name');
      var includedForms = $(dataSource).data('included');
      
      // replace text
      var totalFormsSpan = tr.find(".js-total-num-of-forms");
      
      $(totalFormsSpan).html(numOfForms);

      // if number of forms exceed number of included forms
      var $priceRow = $(tr.find(".js-total-price"))

      if (numOfForms > includedForms) {
        var totalPrice = parseFloat(price) * (numOfForms - includedForms); 
        $priceRow.html("$" + totalPrice);
      } else if (includedForms == 0) {
        var totalPrice = parseFloat(price) * (numOfForms - includedForms);
        $priceRow.html("$" + totalPrice);
      } else {
        $priceRow.html("$" + 0);
      }
    },
    increaseAmount: function(num, name=null, spouse=false){
      if (name === null && spouse === false) {
        name = form.dropDownValue()
      } else if (name === null && spouse === true) {
        name = form.spouseDropDownValue();
      }
      var target;

      if (spouse) {
        target = $('#spouseAddedData tr[data-name="' + name + '"]');
      } else {
        target = $('#addedData tr[data-name="' + name + '"]');  
      }
      
      var tr = $(target);

      // increase number of forms
      var number = tr.data('number') + parseFloat(num);

      // bug is here, the data attribute is not updating            
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
        if (spouse) {
          onlineEstimate.spouseCost += parseFloat(price * num);
        } else {
          onlineEstimate.cost += parseFloat(price * num);
        }
        onlineEstimate.changeEstimate(spouse);
      } else if (includedForms == 0) {
        if (spouse) {
          onlineEstimate.spouseCost += parseFloat(price * num);
        } else {
          onlineEstimate.cost += parseFloat(price * num);
        }
        // onlineEstimate.cost += parseFloat(price);
        onlineEstimate.changeEstimate(spouse);
      }
    },
    decreaseTotalAmount: function(name=null, spouse=false){
      if (name === null && spouse === false) {
        name = form.dropDownValue()
      } else if (name === null && spouse === true) {
        name = form.spouseDropDownValue();
      }

      var target;

      if (spouse) {
        target = $('#js-spouse-total-row tr[data-name="' + name + '"]');
      } else {
        target = $('#js-total-row tr[data-name="' + name + '"]');
      }

      var tr = $(target);
      var numOfForms = tr.data('number');

      if (numOfForms == 0) {
        target.remove();
      } 
      else 
      {
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
    decreaseAmount: function(name=null, spouse=false){
      if (name == null) {
        name = form.dropDownValue()
      }

      var target;

      if (spouse) {
        target = $('#spouseAddedData tr[data-name="' + name + '"]');
      } else {
        target = $('#addedData tr[data-name="' + name + '"]');  
      }

      var tr = $(target);

      // decrease number of forms
      var number = tr.data('number') - 1;
      tr.data('number', number);


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

        // we are adding 1 to numOfForms because we subtracted 1 from data-number above
        if ((numOfForms + 1) > includedForms) {
          if (spouse) {
            onlineEstimate.spouseCost -= tr.data('price');            
          } else {
            onlineEstimate.cost -= tr.data('price');            
          }

          onlineEstimate.changeEstimate(spouse);
          
        }
      }
      
    },
    reenableStudentForm: function(){
      form.enableButton();
      this.hasSelectedStudentForm = false;
    }
  }

  onlineEstimate = {
    cost: 49.99,
    spouseCost: 0,
    eFileFee: 3.99,
    totalCost: this.cost + this.eFileFee,
    totalSpouseCost: 0.00,
    totalFamilyCost: this.cost + (this.eFileFee * this.spouseMultiplier) + this.totalSpouseCost,
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

    toggleSpouseHelperText: function(){
      var tableLength = $('#spouse-table-data tr').length;
      if (tableLength === 0) {
        $('#spouse-table-data').append('<p id="spouseHelperText">No Data Added</p>');
      }
      else {
        $('#spouseHelperText').remove();
      }
    },

    appendToTable: function() {
      var actionButtons;
      if (form.dropDownText() !== "StudentT2202") {
        actionButtons = `<td class="col-xs-3">
              <button type="button" class="btn btn-success btn-xs" id="add">
                <i class="fa fa-plus" aria-hidden="true"></i>
              </button>
              <button type="button" class="btn btn-danger btn-xs" id="minus">
                <i class="fa fa-minus" aria-hidden="true"></i>
              </button>
              <button type="button" class="btn btn-primary btn-xs" id="delete">
                <i class="fa fa-trash-o" aria-hidden="true"></i>
              </button>
             </td>`
      } else {
        actionButtons = `<td class="col-xs-3">
              <button type="button" class="btn btn-danger btn-xs" id="minus">
                <i class="fa fa-minus" aria-hidden="true"></i>
              </button>
              <button type="button" class="btn btn-primary btn-xs" id="delete">
                <i class="fa fa-trash-o" aria-hidden="true"></i>
              </button>
             </td>`
      }
      $('#table-data').append(
        '<tr data-number="' +  form.numOfForms() + '" data-price="' + form.price() + '" data-name="' + form.dropDownText() + '" data-included="' + form.includedForms() + '">' +
          '<td>'+ form.dropDownValue() + '</td>' +
          '<td>'+ form.numOfForms() + '</td>' +
          '<td>'+ '$' + form.price() + '</td>' +
          actionButtons +
        '</tr>'
      );
    },

    appendToSpouseTable: function() {
      var actionButtons;
      if (form.dropDownText() !== "StudentT2202") {
        actionButtons = `<td class="col-xs-3">
              <button type="button" class="btn btn-success btn-xs" id="spouse-add">
                <i class="fa fa-plus" aria-hidden="true"></i>
              </button>
              <button type="button" class="btn btn-danger btn-xs" id="spouse-minus">
                <i class="fa fa-minus" aria-hidden="true"></i>
              </button>
              <button type="button" class="btn btn-primary btn-xs" id="spouse-delete">
                <i class="fa fa-trash-o" aria-hidden="true"></i>
              </button>
             </td>`
      } else {
        actionButtons = `<td class="col-xs-3">
              <button type="button" class="btn btn-danger btn-xs" id="spouse-minus">
                <i class="fa fa-minus" aria-hidden="true"></i>
              </button>
              <button type="button" class="btn btn-primary btn-xs" id="spouse-delete">
                <i class="fa fa-trash-o" aria-hidden="true"></i>
              </button>
             </td>`
      }
      $('#spouse-table-data').append(
        '<tr data-number="' +  form.spouseNumOfForms() + '" data-price="' + form.spousePrice() + '" data-name="' + form.spouseDropDownText() + '" data-included="' + form.spouseIncludedForms() + '">' +
          '<td>'+ form.spouseDropDownValue() + '</td>' +
          '<td>'+ form.spouseNumOfForms() + '</td>' +
          '<td>'+ '$' + form.spousePrice() + '</td>' +
          actionButtons +
        '</tr>'
      );
    },

    appendToTotalTable: function(){
      var price;
      if (form.numOfForms() > form.includedForms()) {
        price = (form.numOfForms() - form.includedForms()) * form.price();
      } else if (form.includedForms() == 0) {
        price = form.price();
      } else {
        price = 0
      }

      $('#js-total-row').append(
        '<tr data-number="' +  form.numOfForms() + '" data-price="' + form.price() + '" data-name="' + form.dropDownText() + '" data-included="' + form.includedForms() + '">' +
          '<td>'+ form.dropDownValue() + ' (<span class="js-total-num-of-forms">' + form.numOfForms() + '</span>) ' + '</td>' +          
          '<td class="js-total-price">'+ '$' + price + '</td>' +          
        '</tr>'
      );
    },

    appendToSpouseTotalTable: function(){
      var price;
      if (form.spouseNumOfForms() > form.spouseIncludedForms()) {
        price = (form.spouseNumOfForms() - form.spouseIncludedForms()) * form.spousePrice();
      } else if (form.spouseIncludedForms() == 0) {
        price = form.spousePrice();
      } else {
        price = 0
      }

      $('#js-spouse-total-row').append(
        '<tr data-number="' +  form.spouseNumOfForms() + '" data-price="' + form.spousePrice() + '" data-name="' + form.spouseDropDownText() + '" data-included="' + form.spouseIncludedForms() + '">' +
          '<td>'+ form.spouseDropDownValue() + ' (<span class="js-total-num-of-forms">' + form.spouseNumOfForms() + '</span>) ' + '</td>' +          
          '<td class="js-total-price">'+ '$' + price + '</td>' +          
        '</tr>'
      );
    },

    changeEstimate: function(spouse=false){
      var hst;

      if (spouse) {
        hst = ((this.spouseCost + this.eFileFee) * 0.13).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
      } else {
        hst = ((this.cost + this.eFileFee) * 0.13).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
      }

      $('#errorMessage').css('display','none');
      $('#costDisplay').text( (this.cost).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0] );

      if (spouse) {        
        this.totalSpouseCost = (this.calculateTotalSpouseCost() / 100).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
      } else {
        this.totalCost = (this.calculateTotalCost() / 100).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]; 
      }
      
      this.totalFamilyCost = (this.calculateFamilyTotalCost() / 100).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];

      if (spouse) {
        $('#spouse-hst').text(hst);
      } else {
        $('#hst').text(hst);
      }
      
      if (spouse) {
        $('#spouseTotalCost').text( this.totalSpouseCost );
      } else {
        $('#totalCost').text( this.totalCost );
      }
       
      $('#totalFamilyCost').text( this.totalFamilyCost );
    },
    calculateTotalCost: function(){
      return (this.cost + this.eFileFee) * 100 * this.hst;
    },
    calculateTotalSpouseCost: function(){
      if (this.spouseCost > 0) {        
        return (this.spouseCost + this.eFileFee) * 100 * this.hst;
      } else {
        return 0;
      }
    },
    calculateFamilyTotalCost: function(){            
      return this.calculateTotalCost() + this.calculateTotalSpouseCost();
    },
    calculateCost: function() {
      if (form.includedForms() < form.numOfForms()) {
        this.cost += ((form.numOfForms() - form.includedForms()) * form.price());  
      } else if (form.includedForms() == 0) {
        this.cost += parseFloat(form.price());
      }
    },

    calculateSpouseCost: function() {
      if (form.spouseIncludedForms() < form.spouseNumOfForms()) {
        console.log(form.spouseIncludedForms() + " " + form.spouseNumOfForms() + " " + form.spousePrice())
        this.spouseCost += ((form.spouseNumOfForms() - form.spouseIncludedForms()) * form.spousePrice());  
      } else if (form.spouseIncludedForms() == 0) {
        console.log(form.spouseIncludedForms() + " " + form.spouseNumOfForms() + " " + form.spousePrice())
        this.spouseCost += parseFloat(form.spousePrice());
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
        .attr('name', form.dropDownValue())
        .attr('value', form.numOfForms())
        .appendTo('form');
    },

    addSpouseFormInput: function(){
      $('<input />').attr('type', 'hidden')
        .attr('id',  $('#spouse-form-select option:selected').val().replace(/ /g,"_"))
        .attr('data-number', form.spouseNumOfForms())
        .attr('name', $('#spouse-form-select option:selected').val())
        .attr('value', form.spouseNumOfForms())
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
    // $("#add_forms_for_spouse").prop("disabled", true);
    form.addToForm();
  });

  $(document).on('click','button#spouse-form-add',function(){
    // $("#add_forms_for_spouse").prop("disabled", true);
    form.addToSpouseForm();
  });

  $(document).on('change', '.js-other-forms', function(e){
    // form.addToForm(); 
    var that = $(e.target);
    var numOfForms = 1;
    var includedForms = that.data("included");
    var formName = that.data("name");    
    
    var price;
    if (numOfForms > includedForms) {
      price = (numOfForms - includedForms) * that.data("price");
    } else {
      price = 0
    }

    if($(this).prop('checked') == true) {
      $('#js-total-row').append(
        '<tr data-number="' +  numOfForms + '" data-price="' + that.data("price") * numOfForms + '" data-name="' + formName + '" data-included="' + includedForms + '">' +
          '<td>'+ formName + ' (<span class="js-total-num-of-forms">' + numOfForms + '</span>) ' + '</td>' +          
          '<td class="js-total-price">'+ '$' + price + '</td>' +          
        '</tr>'
      );

      if (includedForms < numOfForms) {
        onlineEstimate.cost += (numOfForms * that.data("price"));  
      }
    } else {
      $('#js-total-row').find('[data-name="' + formName + '"]').remove();

      if (includedForms < numOfForms) {
        onlineEstimate.cost -= (numOfForms * that.data("price"));  
      }
    } 

    onlineEstimate.changeEstimate();
  });

  $(document).on('change', '.js-spouse-other-forms', function(e){
    // form.addToForm(); 
    var that = $(e.target);
    var numOfForms = 1;
    var includedForms = that.data("included");
    var formName = that.data("name");    
    
    var price;
    if (numOfForms > includedForms) {
      price = (numOfForms - includedForms) * that.data("price");
    } else {
      price = 0
    }

    if($(this).prop('checked') == true) {
      $('#js-spouse-total-row').append(
        '<tr data-number="' +  numOfForms + '" data-price="' + that.data("price") * numOfForms + '" data-name="' + formName + '" data-included="' + includedForms + '">' +
          '<td>'+ formName + ' (<span class="js-total-num-of-forms">' + numOfForms + '</span>) ' + '</td>' +          
          '<td class="js-total-price">'+ '$' + price + '</td>' +          
        '</tr>'
      );

      if (includedForms < numOfForms) {
        onlineEstimate.cost += (numOfForms * that.data("price"));  
      }
    } else {
      $('#js-spouse-total-row').find('[data-name="' + formName + '"]').remove();

      if (includedForms < numOfForms) {
        onlineEstimate.cost -= (numOfForms * that.data("price"));  
      }
    } 

    onlineEstimate.changeEstimate();
  });

  $(document).on('click','button#delete',function(){    
    form.removeForm(this);
  });

  $(document).on('click','button#spouse-delete',function(){    
    form.removeForm(this, true);
  });

  $(document).on('click','button#add',function(e){
    var name = $(e.target).closest('tr').data('name');

    form.increaseAmount(1, name);
    form.increaseTotalAmount(1, name);
  });

  $(document).on('click','button#spouse-add',function(e){
    var name = $(e.target).closest('tr').data('name');

    form.increaseAmount(1, name, true);
    form.increaseTotalAmount(1, name, true);
  });

  $(document).on('click','button#minus',function(e){
    var name = $(e.target).closest('tr').data('name');

    form.decreaseAmount(name);
    form.decreaseTotalAmount(name);
  });

  $(document).on('click','button#spouse-minus',function(e){
    var name = $(e.target).closest('tr').data('name');

    form.decreaseAmount(name, true);
    form.decreaseTotalAmount(name, true);
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
    if($(this).val() === "false"){
      $('.js-bank-info').show('slow');
    } else {
      $('.js-bank-info').hide('slow');
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
      <th class="col-xs-4">Name (Child ${numOfChildren})</th>
      <td class="col-xs-8">
        <div class="row">
          <div class="col-xs-6">
            <input class="form-control" name="child_${numOfChildren}_first_name" placeholder="First Name" type="text">
          </div>
          <div class="col-xs-6">
            <input class="form-control" name="child_${numOfChildren}_last_name" placeholder="Last Name" type="text">
          </div>
      </td>
    </tr>    
    <tr data-child-id="${numOfChildren}">
      <th class="col-xs-4">Date of birth/Gender (Child ${numOfChildren})</th>
      <td class="col-xs-8">
        <div class="row">
          <div class="col-xs-6">
            <input class="form-control" name="child_${numOfChildren}_date_of_birth" placeholder="Date of Birth" type="date">
          </div>
          <div class="col-xs-6">
            <select class="form-control" name="child_${numOfChildren}_gender">
              <option value="male">
                Male
              </option>
              <option value="female">
                Female
              </option>
              <option value="other">
                Other
              </option>
            </select>
          </div>
      </td>
    </tr>
    <tr data-child-id="${numOfChildren}">
      <th class="col-xs-4">Social Insurance (Child ${numOfChildren})</th>
      <td class="col-xs-8">
        <input class="form-control" name="child_${numOfChildren}_social_insurance" placeholder="Social Insurance Number" type="text">
      </td>
    </tr>
    <tr data-child-id="${numOfChildren}">
      <th class="col-xs-4">Day Care Expenses (Child ${numOfChildren})</th>
      <td class="col-xs-8">
        <div class="row">
          <div class="col-xs-7">
            <input class="form-control" name="child_${numOfChildren}_day_care_expenses_provider" placeholder="Day Care Expenses Provider" type="text">
          </div>
          <div class="col-xs-5">
            <input class="form-control" name="child_${numOfChildren}_day_care_expenses_amount" placeholder="Day Care Expenses Amount" type="text">
          </div>
        </div>
      </td>
    </tr>
    <tr data-child-id="${numOfChildren}">
      <th class="col-xs-4">Arts and Sports (Child ${numOfChildren})</th>
      <td class="col-xs-8">
        <div class="row">
          <div class="col-xs-7">
            <input class="form-control" name="child_${numOfChildren}_arts_and_sports_for_child_provider" placeholder="Arts and Sports for Child Provider" type="text">
          </div>
          <div class="col-xs-5">
            <input class="form-control" name="child_${numOfChildren}_arts_and_sports_for_child_amount" placeholder="Arts and Sports for Child Amount" type="text">
          </div>
        </div>
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

