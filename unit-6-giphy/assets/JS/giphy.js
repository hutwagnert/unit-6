var api = "https://api.giphy.com/v1/gifs/search?"
var apikey = "&api_key=dc6zaTOxFJmzC"
var query = "&q="
var queryURL = "";
var bool = false;
var num=0;
var gar =9;

var favorited = [];
var uniquefavorited =[];
var favoritedmoving =[];
var uniquefavoritedmoving = [];
var foodlist = [
    "pizaa",
    "hotdog",
    "hamburger",
    "sushi",
    "fries",
    "salad",
    "diet",
    "dessert",
    "breakfast",
    "dinner",
    "lunch",
    "taco bell",
    "icecream",
    "bananna",
    "fruit",
    "pork",
    "beef",
    "cheese"
];
var uniqueFoodlist = [
    "pizaa",
    "hotdog",
    "hamburger",
    "sushi",
    "fries",
    "salad",
    "diet",
    "dessert",
    "breakfast",
    "dinner",
    "lunch",
    "taco bell",
    "icecream",
    "bananna",
    "fruit",
    "pork",
    "beef",
    "cheese"
];
function buttons() {   
    $('#container-btn').empty()
//make buttons
    for (i = 0; i < uniqueFoodlist.length; i++) {
        var button3 = $('<button>' + uniqueFoodlist[i] + '</button>')
            .attr('id', uniqueFoodlist[i]).css({"margin":"8px", "background-color":"#008CBA"})
            //.attr('onClick','viaclick()')
            .addClass('btn');
            
            $('#container-btn').append(button3);
        ;}    
}
$(document).on("click", ".btn", function () {
    //clear all comlums
    reset();
    var id = $(this).attr('id');
   // $('#container-btn').append("button");
    
    query = "&q=" + id;
    queryURL = api + apikey + query;   
    bool = true;
    $.ajax({
        url: queryURL,
        dataType: 'json',
        async: false,
        success: function (data) {
            items = data
        }     
    });
    buttons();
    setup(items);   
});
function setup(x) {
        for (var l = 0; l < gar; l++){     
            var img = $('<img >'); //Equivalent: $(document.createElement('img'))
            var ratings =x.data[l].rating;
           var stilimg= img.attr('src', x.data[l].images.fixed_height_still.url).addClass('allimages').height(250).width(250);
            if(l==0 || l%3 ==0)
            {
                var appendEl = $("<div class='row rowformain'></div>").appendTo("#container");//new row every 3 col
            }         
            var coltoappendEl = $("<div class='col-xs-3'></div>").addClass([l]+'colum').attr('id',[l]+'colum'); 
            $(coltoappendEl).appendTo(appendEl);
           
            var ratsdiv =$("<div class = 'text-center'></div>").addClass([l]+'rats text-center').css("marginTop","25px");
            var imgdiv = $("<div class = 'allimags'></div>").addClass([l]+'imgs').attr('id',[l]+'colum').css("margin","25px");
            var buttdiv =  $("<div class = 'newbutts'></div>").addClass([l]+'butts').attr('id','forbutt');
           var forfavoriting = $('<button class = "buttforfav">"Favorite"</button>').attr('id',[l]+'favorites').css({"marginLeft":"25px","marginTop":"8px", "background-color":"#4CAF50"});
            $(ratsdiv).appendTo(["."+[l]+"colum"]);
            $(imgdiv).appendTo(["."+[l]+"colum"]);
            $(buttdiv).appendTo(["."+[l]+"colum"]);
            $("."+[l]+"rats").append(ratings);
            $("."+[l]+"imgs").append(stilimg);
           $("."+[l]+"butts").append(forfavoriting);

           
        
           }
        }


        $(document).on("click", ".allimags", function () {
            var whchid = $(this).attr('id');
            var charatergrab =whchid.charAt(0);
            
    var newimg = $('<img >');
            $("."+[charatergrab]+"imgs").empty();
            $("."+[charatergrab]+"imgs").append(newimg.attr('src', items.data[charatergrab].images.fixed_height.url).addClass('allimages').height(250).width(250));            
        });
//add to array when green favorite is clicked
        $(document).on("click", ".buttforfav", function () {
            var wickedid = $(this).attr('id');
            var grab1char   = wickedid.charAt(0);
            
            favorited.push(items.data[grab1char].images.fixed_height_still.url);
            favoritedmoving.push(items.data[grab1char].images.fixed_height.url);
            console.log(favorited);
            console.log(favoritedmoving);
            
            $.each(favorited, function(i, err){
                if($.inArray(err, uniquefavorited) === -1) uniquefavorited.push(err); 
            });
            $.each(favoritedmoving, function(i, epp){
                if($.inArray(epp, uniquefavoritedmoving) === -1) uniquefavoritedmoving.push(epp); 
            });
            console.log(uniquefavoritedmoving);
            
//click list off favorite button                
        });
        $(document).on("click", "#thisisfavorite", function () {
            reset();
            if (uniquefavorited.length === 0){
                alert("You havent favorited anything yet!");
            } else{
                console.log(uniquefavorited.length);
            for (var m = 0; m < uniquefavorited.length; m++){     
                var imgfav = $('<img >'); //Equivalent: $(document.createElement('img'))
                
               var stilimgfav=imgfav.attr('src', uniquefavorited[m]).addClass('favorimg').height(250).width(250);
               
                if(m==0 || m%3 ==0){
                    var appendL = $("<div class='row rowformain'></div>").appendTo("#container");//new row every 3 col
                }         
                var coltoappendL = $("<div class='col-xs-3'></div>").addClass([m]+'colum').attr('id',[m]+'colum'); 
                $(coltoappendL).appendTo(appendL);
                //var faratsdiv =$("<div class = 'text-center'></div>").addClass([m]+'favrat text-center').css("marginTop","25px");
                var faimgdiv = $("<div class = 'favorimgs'></div>").addClass([m]+'favimgs').attr('id',[m]+'favs').css("margin","25px");
               
              // var forfavoriting = $('<button class = "buttforfav">"Favorite"</button>').attr('id',[l]+'favorites').css({"marginLeft":"25px","marginTop":"8px", "background-color":"#4CAF50"});
               // $(faratsdiv).appendTo(["."+[l]+"colum"]);
                $(faimgdiv).appendTo(["."+[m]+"colum"]);
             
                //$("."+[l]+"favrats").append(ratingsfav);
                $("."+[m]+"favimgs").append(stilimgfav); 
            }}
        });
//turn on gif for fav
        $(document).on("click", ".favorimgs", function () {
            var favorimgid = $(this).attr('id');
            var grabcharfrom   = favorimgid.charAt(0);
            var favnewimg =$('<img >');
            $("."+[grabcharfrom]+"favimgs").empty();
            console.log(uniquefavoritedmoving);
            $("."+[grabcharfrom]+"favimgs").append(favnewimg.attr('src', uniquefavoritedmoving[grabcharfrom]).addClass('favorimg').height(250).width(250));          
        });
        // $(document).on("click", "#thisisaddmore", function () {
        //         gar = gar + 9;
        //         buttons(); 
        // });
function reset() {
    if (bool) {
        $(".rowformain").empty();
        $(".rats").empty();
        $(".allimags").empty();
        bool = false;        
    }
}
$("#wordinsert").on("click", function(event) {
    // event.preventDefault() prevents submit button from trying to send a form.
    event.preventDefault();
    var newWord = $("#word-input").val().trim();
    foodlist.push(newWord);  
//remove duplicate prevents user from making more than one button of each
$.each(foodlist, function(i, el){
    if($.inArray(el, uniqueFoodlist) === -1) uniqueFoodlist.push(el); 
});

    buttons();
});


