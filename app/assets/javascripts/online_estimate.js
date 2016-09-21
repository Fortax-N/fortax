var initializeOnlineEstimate = function(){
  var onlineEstimate;

  onlineEstimate = {
    index: 0,
    cost: 0,
    eFileFee: 2.99,
    totalCost: 0,
    initialize: function(){
      var tableLength = $('#table-data tr').length;
      if (tableLength === 0) {
        $('#table-data').append('<p id="helperText">No Data Added</p>');
      }
      else {
        $('#helperText').remove();
      }
    },
    appendToTable: function(index, dropDownData, numOfForms, price) {
      $('#table-data').append(
        '<tr>' +
          '<td>'+ index + '</td>' +
          '<td>'+ dropDownData + '</td>' +
          '<td>'+ numOfForms + '</td>' +
          '<td>'+ '$' + price + '</td>' +
        '</tr>'
      );
    },
    changeEstimate: function(){
      $('#errorMessage').css('display','none');
      $('#costDisplay').text( this.cost );
      //rounding up to two places
      this.totalCost = Math.round((this.cost + this.eFileFee) * 100) / 100;
      $('#totalCost').text( this.totalCost );
    },
    calculateCost: function(numOfForms,price) {
      this.cost += (numOfForms * price);
    },
    displayError: function(){
      $('#errorMessage').css('display','block');
    }

  }

  onlineEstimate.initialize();

  $('#form-select').on('change',function(){
    var dropDownText = $('#form-select option:selected').text();
    $('#numberOfForm').val(1);
    if(dropDownText == "Student T2202")
    {
      $('#numberOfForm').attr("disabled","disabled");
      $('#form-add').on('click',function(){
        $('#form-add').attr("disabled","disabled");
      });
    } else {
      $('#numberOfForm').removeAttr("disabled");
      $('#form-add').removeAttr("disabled");
    }
  });

  $('#form-add').on('click',function(){
    var dropDownData = $('#form-select option:selected').val();
    var numOfForms = $('#numberOfForm').val();
    var price = $('#form-select option:selected').data('cost');
    if(numOfForms != 0)
    {
      onlineEstimate.index++;
      onlineEstimate.appendToTable(onlineEstimate.index, dropDownData, numOfForms, price);
      onlineEstimate.initialize();
      onlineEstimate.calculateCost(numOfForms,price);
      onlineEstimate.changeEstimate();
    } else {
      onlineEstimate.displayError();
    }
  });
}

$(document).on("turbolinks:load", function(){
  initializeOnlineEstimate();
});
