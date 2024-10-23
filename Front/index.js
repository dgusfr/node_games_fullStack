function createGame() {
  var titleInput = document.getElementById("title");
  var yearInput = document.getElementById("year");
  var priceInput = document.getElementById("price");

  var game = {
    title: titleInput.value,
    year: parseInt(yearInput.value),
    price: parseFloat(priceInput.value),
  };

  axios
    .post("http://localhost:3000/games", game)
    .then((response) => {
      if (response.status === 201) {
        alert("Game cadastrado!");
        loadGames();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteGame(listItem) {
  var id = listItem.getAttribute("data-id");
  axios
    .delete("http://localhost:3000/game/" + id)
    .then((response) => {
      alert("Game deletado!");
      loadGames();
    })
    .catch((err) => {
      console.log(err);
    });
}

function loadForm(listItem) {
  var id = listItem.getAttribute("data-id");
  var title = listItem.getAttribute("data-title");
  var year = listItem.getAttribute("data-year");
  var price = listItem.getAttribute("data-price");
  document.getElementById("idEdit").value = id;
  document.getElementById("titleEdit").value = title;
  document.getElementById("yearEdit").value = year;
  document.getElementById("priceEdit").value = price;
}

function updateGame() {
  var idInput = document.getElementById("idEdit");
  var titleInput = document.getElementById("titleEdit");
  var yearInput = document.getElementById("yearEdit");
  var priceInput = document.getElementById("priceEdit");

  var game = {
    title: titleInput.value,
    year: parseInt(yearInput.value),
    price: parseFloat(priceInput.value),
  };

  var id = idInput.value;

  axios
    .put("http://localhost:3000/game/" + id, game)
    .then((response) => {
      if (response.status === 200) {
        alert("Game atualizado!");
        loadGames();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function loadGames() {
  axios
    .get("http://localhost:3000/games")
    .then((response) => {
      var games = response.data;
      var list = document.getElementById("games");
      list.innerHTML = "";

      for (const key in games) {
        if (games.hasOwnProperty(key)) {
          var game = games[key];
          var item = document.createElement("li");

          item.setAttribute("data-id", key);
          item.setAttribute("data-title", game.title);
          item.setAttribute("data-year", game.year);
          item.setAttribute("data-price", game.price);

          item.innerHTML = `<strong>${game.title}</strong> (${game.year}) - $${game.price}`;

          var deleteBtn = document.createElement("button");
          deleteBtn.innerHTML = "Deletar";
          deleteBtn.className = "delete-btn";
          deleteBtn.addEventListener("click", function () {
            deleteGame(item);
          });

          var editBtn = document.createElement("button");
          editBtn.innerHTML = "Editar";
          editBtn.className = "edit-btn";
          editBtn.addEventListener("click", function () {
            loadForm(item);
          });

          item.appendChild(deleteBtn);
          item.appendChild(editBtn);
          list.appendChild(item);
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

loadGames();
