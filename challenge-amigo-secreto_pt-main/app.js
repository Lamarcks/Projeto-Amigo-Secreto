let amigos = [];
let sorteioFeito = false;

// --- Utilidades de UI ---
function atualizarLista() {
  const lista = document.getElementById("listaAmigos");
  if (!lista) return;
  lista.innerHTML = "";

  amigos.forEach((nome, index) => {
    const li = document.createElement("li");
    li.textContent = nome;

    // Botão de remover
    const btnRemover = document.createElement("button");
    btnRemover.textContent = "❌";
    btnRemover.classList.add("remover-btn");
    btnRemover.onclick = () => removerAmigo(index);

    li.appendChild(btnRemover);
    lista.appendChild(li);
  });
}

function limparResultado() {
  const resultado = document.getElementById("resultado");
  if (resultado) resultado.innerHTML = "";
}

// --- Ações ---
function adicionarAmigo() {
  const input = document.getElementById("amigo");
  if (!input) return;

  const nome = input.value.trim();

  if (sorteioFeito) {
    amigos = [];
    sorteioFeito = false;
    atualizarLista();
    limparResultado();
  }

  if (nome === "") {
    alert("Por favor, insira um nome válido!");
    return;
  }

  if (amigos.includes(nome)) {
    alert("Esse nome já foi adicionado!");
    return;
  }

  amigos.push(nome);
  atualizarLista();

  input.value = "";
  input.focus();
}

function removerAmigo(index) {
  amigos.splice(index, 1);
  atualizarLista();
}

function sortearAmigo() {
  if (amigos.length === 0) {
    alert("Adicione pelo menos um nome antes de sortear!");
    return;
  }

  const indice = Math.floor(Math.random() * amigos.length);
  const sorteado = amigos[indice];

  const resultado = document.getElementById("resultado");
  if (resultado) {
    resultado.innerHTML = `<li>⏳ Sorteando...</li>`;
    setTimeout(() => {
      resultado.innerHTML = `<li>Amigo sorteado: <strong>${sorteado}</strong></li>`;
    }, 1200);
  }

  sorteioFeito = true;
}

// --- Enter no input ---
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("amigo");
  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") adicionarAmigo();
    });
  }
});

// --- Expor funções para o HTML ---
window.adicionarAmigo = adicionarAmigo;
window.sortearAmigo = sortearAmigo;