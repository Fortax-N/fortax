var initializeOnlineEstimate = function(){
  var onlineEstimate;

  onlineEstimate = {
    index: 0,
    cost: 0,
    price: 4,
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
    appendToTable: function(index, dropDownData, numOfForms) {
      $('#table-data').append(
        '<tr>' +
          '<td>'+ index + '</td>' +
          '<td>'+ dropDownData + '</td>' +
          '<td>'+ numOfForms + '</td>' +
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
    calculateCost: function(numOfForms) {
      this.cost += numOfForms * this.price;
    },
    displayError: function(){
      $('#errorMessage').css('display','block');
    }

  }

  onlineEstimate.initialize();

  $('#form-add').on('click',function(){
    var dropDownData = $('#form-select option:selected').val();
    var numOfForms = $('#numberOfForm').val();
    if((dropDownData != "") && (numOfForms != 0))
    {
      onlineEstimate.index++;
      onlineEstimate.appendToTable(onlineEstimate.index, dropDownData, numOfForms);
      onlineEstimate.initialize();
      onlineEstimate.calculateCost(numOfForms);
      onlineEstimate.changeEstimate();
    } else {
      onlineEstimate.displayError();
    }
  });
}

$(document).on("turbolinks:load", function(){
  initializeOnlineEstimate();
});

$(document).ready(function(){
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
});


// $(document).ready(function(){
//     $('#infos_change_in_status_during_year_true').change(function(){
//       $('#options-for-change-in-status').show('slow');
//   });

//   $('#infos_register_for_direct_deposit_false').click(function(){
//      if($(this).val() === "false"){
//       $('#options-for-bank-info').show('slow');
//     } 
//   });

// });
