const API_KEY = "566ec5c0-471e-11ee-be56-0242ac120002";
const $searchBar = $(".searchBar");
const $blocUsers = $("#bloc-users");

axios.get("https://prfauraproject.up.railway.app/api/users?apiKey="+API_KEY).then((response) => {
  const users = response.data;
  for (let user of users) {
    $blocUsers.append(CreateUser(user));

    if(user.isFavorite){
      $("#bloc-users #"+user.id+" .favoris i").addClass("fa-solid");
    }else{
      $("#bloc-users #"+user.id+" .favoris i").addClass("fa-regular");
    }

    $searchBar.append("<button id='"+user.id+"' class='filtre'>" + user.address.city + "</button>");
  }

  $(".favoris").click(function (e) {
    e.preventDefault();
    let idUser = $(this).parent().prop("id");
    if($("#bloc-users #"+idUser+" .favoris i").hasClass("fa-regular")){
      $("#bloc-users #"+idUser+" .favoris i").removeClass("fa-regular");
      $("#bloc-users #"+idUser+" .favoris i").addClass("fa-solid");
    }else{
      $("#bloc-users #"+idUser+" .favoris i").addClass("fa-regular");
      $("#bloc-users #"+idUser+" .favoris i").removeClass("fa-solid");
    }

    axios.patch("https://prfauraproject.up.railway.app/api/users/toggle-favorite/"+idUser+"?apiKey="+API_KEY).then((response) => {
      //alert("toggle");
    });
  });

  $(".filtre").click(function (e) {
    e.preventDefault();
    const usersFiltered = users.filter((user) => user.address.city == users.find((user) => user.id == this.id).address.city);

    $(".filtre").css("background-color", "white");
    $(".filtre").css("color", "black");
    $("#"+this.id).css("background-color", "#DC117E");
    $("#"+this.id).css("color", "white");

    $blocUsers.empty();
    for (let user of usersFiltered) {
      $blocUsers.append(CreateUser(user));
    }
  });

  $("#search").change(function (e) {
    e.preventDefault();
    const usersFiltered = users.filter((user) => user.name == $("#search").val());
    $blocUsers.empty();
    for (let user of usersFiltered) {
      $blocUsers.append(CreateUser(user));
    }
  });

});

function CreateUser(user) {
  return `
      <a id=${user.id} class="card" href="details.html?id=${user.id}">
        <img src="https://robohash.org/${user.id}.png?set=set4">
        <div>
        <p class='name'>${user.name}</p>
        <p>Email: ${user.email}</p>
        <p class='phone'>Phone: ${user.phone}</p>
        </div>
        <button class="favoris"><i class="fa-heart"></i></button>
      </a>
  `;
}



