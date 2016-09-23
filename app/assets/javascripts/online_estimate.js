var initializeOnlineEstimate = function(){
  var onlineEstimate;
  var form;

  form = {
    hasSelectedStudentForm: false,
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
      return (form.dropDownText() === "Student T2202");
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

      if(form.isStudentForm()) {
        form.reenableStudentForm(target);
      }          
      
      onlineEstimate.cost -= minusPrice;
      onlineEstimate.changeEstimate();
    },
    reenableStudentForm: function(target){
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
});
