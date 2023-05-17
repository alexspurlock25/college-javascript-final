let api_key = "511948129531495";

function FindSuperName(event) {
    event.preventDefault();

    let keywords = $('#search-text').val();

    // check if inout field is empty
    if(IsEmpty()) {
            return false;
    }

    // start ajax call
    $.ajax({
        url: "https://superheroapi.com/api/"+api_key+"/search/"+keywords,
        dataType: "json",
        method: "GET",
        // headers: {
        //     Athorization: "Bearer" + api_key
        // },
        success: function (data) {

            // check if any data returned from api request
            // if (data == undefined){   
            //     alert("Data not found.");
            // }
            // else{   
                
                // console.log(data)
                let result_items = [];

                // pull form api
                data.results.forEach(function(element) {

                    // pull for api, push into array list
                    result_items.push({

                        super_name: element.name, // name of Super-Person
                        alignment: element.biography.alignment,
                        real_name: element.biography['full-name'], // biography of Super-Person
                        hair_color: element.appearance['hair-color'], // appearance of Super-Person
                        eye_color: element.appearance['eye-color'],
                        base: element.work.base,
                        affiliation: element.connections['group-affiliation'], // connections Super-Person has
                        
                    });

                }, this);

                // using the 'datatable' ref with javascript to put pulled items into this table
                let table = $('#result-table').DataTable({

                    data:result_items,
                    destroy: true,
                    "searching": false,
                    paging: false,
                    columns: [

                        {   
                            "className": 'details-control',
                            "data": 'super_name',
                            "orderable": false
                        },
                        {
                            "className": 'details-control',
                            "data": 'alignment',
                            "orderable": false
                        }

                    ]

                });
                $('#result-table').show();

                $('#result-table tbody').on('click', 'td.details-control', function () {
                    let tr = $(this).closest('tr');
                    let row = table.row(tr);

                    if ( row.child.isShown() ) {
                        // This row is already open - close it
                        row.child.hide();
                        tr.removeClass('shown');
                    }
                    else {
                        // Open this row
                        row.child( format(row.data()) ).show();
                        tr.addClass('shown');
                    }
                });

            // } // end if data is empty

        } // end 'success'
    }); // end ajax call
}
function IsEmpty() {
    if ($('#search-text').val() == '') {
      alert("Field is empty");
      return true;
    }
    return false;
}
// format extra details table
function format(data) {
    // `d` is the original data object for the row
    return '<table id="extra-info-table" class="extra-info-table">'+
        '<tr>'+
            '<td>Full name:</td>'+
            '<td>'+data.real_name+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Hair Color:</td>'+
            '<td>'+data.hair_color +'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Eye Color:</td>'+
            '<td>'+data.eye_color +'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Base:</td>'+
            '<td>'+data.base +'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Affiliation:</td>'+
            '<td>'+data.affiliation +'</td>'+
        '</tr>'+
    '</table>';
}

$(document).ready(function () {
    $('#search-form').submit(FindSuperName);
    $('#result-table').hide();
    // location.reload();

});