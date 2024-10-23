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

        // Limpa os campos de entrada após a criação
        titleInput.value = "";
        yearInput.value = "";
        priceInput.value = "";

        // Adiciona o novo jogo à lista
        const newGameId = response.data.id; // Certifique-se de que o backend retorna o ID
        const gameList = document.getElementById("games");
        const listItem = createGameListItem(newGameId, game);
        gameList.appendChild(listItem);
      }
    })
    .catch((err) => {
      console.log("Erro ao cadastrar o game:", err);
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
      const games = response.data;
      const gameList = document.getElementById("games");
      gameList.innerHTML = "";

      Object.entries(games).forEach(([id, game]) => {
        const listItem = createGameListItem(id, game);
        gameList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar os games:", error);
    });
}

function createGameListItem(id, game) {
  const listItem = document.createElement("li");
  listItem.dataset.id = id;
  listItem.dataset.title = game.title;
  listItem.dataset.year = game.year;
  listItem.dataset.price = game.price;

  listItem.innerHTML = `<strong>${game.title}</strong> (${game.year}) - $${game.price}`;

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Deletar";
  deleteButton.className = "delete-btn";
  deleteButton.addEventListener("click", () => deleteGame(listItem));

  const editButton = document.createElement("button");
  editButton.textContent = "Editar";
  editButton.className = "edit-btn";
  editButton.addEventListener("click", () => loadForm(listItem));

  buttonContainer.appendChild(deleteButton);
  buttonContainer.appendChild(editButton);
  listItem.appendChild(buttonContainer);

  return listItem;
}

function createButton(text, className, onClick) {
  const button = document.createElement("button");
  button.textContent = text;
  button.className = className;
  button.addEventListener("click", onClick);
  return button;
}

loadGames();
