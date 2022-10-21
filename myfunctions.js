

$(document).ready(function() {
 
    updatecosts(); 
    address();

});


function updatecosts() {
    $("select").on("input", function() { 
        var subtotal = 0;

        $("select option:selected").each(function(idx) {
    
            var quantity = $(this).val();
            var individualcost = quantity * menuItems[idx].cost;
            $("input[name='cost']:eq(" + idx + ")").attr("value", (individualcost).toFixed(2));
            subtotal = subtotal + individualcost; 
        
        });
    
        tax = subtotal * 0.0625;
        $("input[name='subtotal']").attr("value", (subtotal).toFixed(2));
        $("input[name='tax']").attr("value", (tax).toFixed(2));
        $("input[name='total']").attr("value", (subtotal + tax).toFixed(2));
   
    });

}

function address() {

    $(".uaddress").hide();
    
    $("input[name='p_or_d']").change(function(){
        $(".uaddress").toggle()
    
})
}

function verification() {
    
    var submit_allowed = "yes";

    if(! $("input[name='lname']").val()) {
        alert("Enter your last name");
        submit_allowed = "no";
    }

    if (! $("input[name='phone']").val()) {
        alert("Enter your phone");
        submit_allowed = "no";
    }

    var phone_numbers = $('input[name="phone"]').val();
    var num_digits = String(phone_numbers.replace(/[^0-9]/g, ""));

    if ($("input[name='phone']").val()) {
        if (num_digits.length != 7 && num_digits.length != 10) {
            alert ("Enter valid phone");
            submit_allowed = "no";
        }
    }

    var selection_items = false;

    $("select option:selected").each(function() {
        if ($(this).val() != 0) {
            selection_items = true; 
        }
    });

    if (!selection_items) {
        alert("Choose at least one product");
        submit_allowed = "no";
    }

    var transp = $('input[name="p_or_d"]:checked').val();

    if (transp == "delivery" && ! $("input[name='street']").val()){
        alert("Enter street name");
        submit_allowed = "no";
    }

    if (transp == "delivery" && ! $("input[name='city']").val()){
        alert("Enter city name");
        submit_allowed = "no";
    }

    if (submit_allowed == "yes"){
        alert("Thank you for ordering with us!");
        print_out();
    }

}

function time(){

    var order;
    var time_now = new Date();

    if ($('input[name="p_or_d"]:checked').val() == "pickup"){

        order = new Date(time_now.getTime() + 20*60000);
        h = (order.getHours()<10?'0':'') + order.getHours(),
        m = (order.getMinutes()<10?'0':'') + order.getMinutes();

    } else {

        order = new Date(time_now.getTime() + 40*60000);
        h = (order.getHours()<10?'0':'') + order.getHours(),
        m = (order.getMinutes()<10?'0':'') + order.getMinutes();

    }

    return order;
}

function print_out(){
    var finalpage = window.open();

        print = "<head>"
        print += "<title>Jade Delight</title>"
        print += "</head>"

        print += "<body>"
        print += "<strong> Order summary: </strong> <br>"
        print += "Chicken Chop Suey: " + $("table").find("tr:eq(1)").find("td:eq(0)>select").val() + "   unit(s)   $" + ($("table").find("tr:eq(1)").find("td:eq(0)>select").val() * menuItems[0].cost) + "<br>";
        print += "Sweet and Sour Pork: " + $("table").find("tr:eq(2)").find("td:eq(0)>select").val() + "   unit(s)   $" + ($("table").find("tr:eq(2)").find("td:eq(0)>select").val() * menuItems[1].cost)+ "<br>";
        print += "Shrimp Lo Mein: " + $("table").find("tr:eq(3)").find("td:eq(0)>select").val() + "   unit(s)   $" + ($("table").find("tr:eq(3)").find("td:eq(0)>select").val() * menuItems[2].cost) + "<br>";
        print += "Moo Shi Chicken: " + $("table").find("tr:eq(4)").find("td:eq(0)>select").val() + "   unit(s)   $" + ($("table").find("tr:eq(4)").find("td:eq(0)>select").val() * menuItems[3].cost) + "<br>";
        print += "Fried Rice: " + $("table").find("tr:eq(5)").find("td:eq(0)>select").val() + "   unit(s)   $" + ($("table").find("tr:eq(5)").find("td:eq(0)>select").val() * menuItems[4].cost)+ "<br><br>";

        print += "<strong>Subtotal:</strong> $" + $('input:text[name="subtotal"]').val() + "<br>";
        print += "<strong>Tax:</strong> $" + $('input:text[name="tax"]').val() + "<br>";
        print += "<strong>Total:</strong> $" + $('input:text[name="total"]').val() + "<br><br>";
        print += "<strong> Order time: </strong>" + time();
        print += "</body>"

    finalpage.document.writeln(print);
}

