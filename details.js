const API_KEY = "566ec5c0-471e-11ee-be56-0242ac120002";
const urlParams = new URLSearchParams(location.search);


$("#photoProfil").prop("src", "https://robohash.org/"+urlParams.get("id")+".png?set=set4");





$(".retour").click(function (e) {
    e.preventDefault();
    window.location.replace("./index.html");
});


axios.get("https://prfauraproject.up.railway.app/api/users/"+urlParams.get("id")+"?apiKey="+API_KEY).then((response) => {
    let user = response.data;
    $("#user-name").text(user.name);
    $("#user-email").append(user.email);
    $("#user-phone").append(user.phone);


    $("#rue").append(user.address.street);
    $("#Appartement").append(user.address.suite);
    $("#ville").append(user.address.city);
    $("#user-company").append(user.company.name);
    
    $(".favoriteBtn").prop("id",user.id);
});





$(".favoriteBtn").click(function (e) {
    let idUser = $(this).prop("id");
    

    if($(".favoriteBtn").hasClass("favorisRose")){
        $(".favoriteBtn").removeClass("favorisRose");
      }else{
        $(".favoriteBtn").addClass("favorisRose");
      }

    axios.patch("https://prfauraproject.up.railway.app/api/users/toggle-favorite/"+idUser+"?apiKey="+API_KEY).then((response) => {
      //alert("toggle");
    });
  });


