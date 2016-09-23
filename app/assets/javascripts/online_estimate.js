var initializeOnlineEstimate = function(){
  var onlineEstimate;
  var form;

  form = {
    hasSelectedStudentForm: false,
    dropDownText: function(){
      return $('#form-select option:selected').text();
    },
    numOfForms: function(){
      return $('#numberOfForm').val();
    },
    price: function(){
      return $('#form-select option:selected').data('cost');
    },
    addToForm: function(){      
      if(form.dropDownText() !== "" && form.numOfForms() !== 0)
      {
        onlineEstimate.index++;        
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
        $('#form-add').off("click");
        $('.addFormButton').prop("disabled", true);
      }
    },
    enableButton: function(){
      $("#form-add").removeAttr("disabled");
    }
  }

  onlineEstimate = {
    index: 0,
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
        '<tr>' +
          '<td>'+ this.index + '</td>' +
          '<td>'+ form.dropDownText() + '</td>' +
          '<td>'+ form.numOfForms() + '</td>' +
          '<td>'+ '$' + form.price() + '</td>' +
        '</tr>'
      );
    },
    changeEstimate: function(){
      $('#errorMessage').css('display','none');
      $('#costDisplay').text( this.cost );
      this.totalCost = Math.round(this.calculateTotalCost) / 100;
      $('#totalCost').text( this.totalCost );
    },
    calculateTotalCost: function(){
      return (this.cost + this.eFileFee) * 100
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

    if(form.hasSelectedStudentForm && form.isStudentForm())
    {
      form.disableButton();     
    } else {
      form.enableButton();
      $('#form-add').on('click', form.addToForm);
    }
  });
}

$(document).on("turbolinks:load", function(){
  initializeOnlineEstimate();
});
