const apiUrl = "http://localhost:3000/games";

// Cria um novo jogo e adiciona à lista
function createGame() {
  const game = getGameInputValues("title", "year", "price");

  axios
    .post(apiUrl, game)
    .then((response) => {
      if (response.status === 201) {
        alert("Game cadastrado!");
        clearInputs("title", "year", "price");

        const newGameId = response.data.id;
        const gameList = document.getElementById("games");
        const listItem = createGameListItem(newGameId, game);
        gameList.appendChild(listItem);
      }
    })
    .catch((err) => console.log("Erro ao cadastrar o game:", err));
}

// Exclui o jogo e recarrega a lista
function deleteGame(listItem) {
  const id = listItem.dataset.id;
  axios
    .delete(`${apiUrl}/${id}`)
    .then(() => {
      alert("Game deletado!");
      loadGames();
    })
    .catch((err) => console.log(err));
}

// Carrega os valores do jogo no formulário de edição
function loadForm(listItem) {
  setGameInputValues({
    id: listItem.dataset.id,
    title: listItem.dataset.title,
    year: listItem.dataset.year,
    price: listItem.dataset.price,
  });
}

// Atualiza o jogo e recarrega a lista
function updateGame() {
  const game = getGameInputValues("titleEdit", "yearEdit", "priceEdit");
  const id = document.getElementById("idEdit").value;

  axios
    .put(`${apiUrl}/${id}`, game)
    .then((response) => {
      if (response.status === 200) {
        alert("Game atualizado!");
        loadGames();
      }
    })
    .catch((err) => console.log(err));
}

// Carrega todos os jogos na lista
function loadGames() {
  axios
    .get(apiUrl)
    .then((response) => {
      const games = response.data;
      const gameList = document.getElementById("games");
      gameList.innerHTML = "";

      Object.entries(games).forEach(([id, game]) => {
        const listItem = createGameListItem(id, game);
        gameList.appendChild(listItem);
      });
    })
    .catch((error) => console.error("Erro ao carregar os games:", error));
}

// Cria um item da lista de jogos com os botões de edição e exclusão
function createGameListItem(id, game) {
  const listItem = document.createElement("li");
  listItem.dataset.id = id;
  listItem.dataset.title = game.title;
  listItem.dataset.year = game.year;
  listItem.dataset.price = game.price;

  listItem.innerHTML = `<strong>${game.title}</strong> (${game.year}) - $${game.price}`;

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";
  buttonContainer.appendChild(
    createButton("Deletar", "delete-btn", () => deleteGame(listItem))
  );
  buttonContainer.appendChild(
    createButton("Editar", "edit-btn", () => loadForm(listItem))
  );
  listItem.appendChild(buttonContainer);

  return listItem;
}

// Auxiliares: Função para criar botões
function createButton(text, className, onClick) {
  const button = document.createElement("button");
  button.textContent = text;
  button.className = className;
  button.addEventListener("click", onClick);
  return button;
}

// Auxiliares: Obter valores de entrada do jogo
function getGameInputValues(titleId, yearId, priceId) {
  return {
    title: document.getElementById(titleId).value,
    year: parseInt(document.getElementById(yearId).value),
    price: parseFloat(document.getElementById(priceId).value),
  };
}

// Auxiliares: Configurar valores de entrada do jogo para edição
function setGameInputValues({ id, title, year, price }) {
  document.getElementById("idEdit").value = id;
  document.getElementById("titleEdit").value = title;
  document.getElementById("yearEdit").value = year;
  document.getElementById("priceEdit").value = price;
}

// Auxiliares: Limpar campos de entrada
function clearInputs(...inputIds) {
  inputIds.forEach((id) => (document.getElementById(id).value = ""));
}

loadGames();
