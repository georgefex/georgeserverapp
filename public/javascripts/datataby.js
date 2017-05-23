$(document).ready(function() {
        $('#final_table').DataTable( {
            "scrollY":        "500px",
            "scrollCollapse": true,
            "paging":         false,
            "ajax": "/objects.txt",
            "columns": [
                { "data": "name" },
                { "data": "position" },
                { "data": "office" },
                { "data": "extn" },
                { "data": "start_date" },
                { "data": "salary" }
            ]
        } );
} );