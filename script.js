let listaItens = JSON.parse(localStorage.getItem("listaItens")) || [];

function salvarLista() {
  localStorage.setItem("listaItens", JSON.stringify(listaItens));
}

function adicionarItem() {
  const item = document.getElementById("item").value.trim();
  const qtd = parseInt(document.getElementById("quantidade").value);
  const valor = parseFloat(document.getElementById("valor").value);
  const categoria = document.getElementById("categoria").value.trim() || "Sem categoria";

  if (!item || isNaN(qtd) || isNaN(valor)) return;

  listaItens.push({ item, qtd, valor, categoria });
  salvarLista();
  atualizarLista();
  limparCampos();
}

function atualizarLista() {
  const tbody = document.querySelector("#lista tbody");
  tbody.innerHTML = "";

  let total = 0;

  listaItens.forEach((el, i) => {
    const tr = document.createElement("tr");

    const totalItem = el.qtd * el.valor;
    total += totalItem;

    tr.innerHTML = `
      <td>${el.item}</td>
      <td>${el.qtd}</td>
      <td>R$ ${el.valor.toFixed(2)}</td>
      <td>R$ ${totalItem.toFixed(2)}</td>
      <td>${el.categoria}</td>
      <td>
        <button class="delete-btn" onclick="removerItem(${i})">🗑️</button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  document.getElementById("totalGeral").textContent = `Total: R$ ${total.toFixed(2)}`;
}

function removerItem(index) {
  listaItens.splice(index, 1);
  salvarLista();
  atualizarLista();
}

function limparCampos() {
  document.getElementById("item").value = "";
  document.getElementById("quantidade").value = "";
  document.getElementById("valor").value = "";
  document.getElementById("categoria").value = "";
}

window.onload = atualizarLista;

document.getElementById("exportarCSV").addEventListener("click", function() {
  if(listaItens.length === 0) {
    alert("A lista está vazia!");
    return;
  }

  // Cabeçalho CSV
  const cabecalho = ["Item", "Quantidade", "Valor Unitário", "Total", "Categoria"];
  // Linhas da lista no CSV
  const linhas = listaItens.map(el => {
    const totalItem = el.qtd * el.valor;
    // Para evitar problemas com vírgulas, usar aspas e ponto como decimal
    return [
      `"${el.item}"`,
      el.qtd,
      el.valor.toFixed(2).replace('.', ','),
      totalItem.toFixed(2).replace('.', ','),
      `"${el.categoria}"`
    ].join(";");
  });

  const csvContent = [cabecalho.join(";"), ...linhas].join("\n");

  // Criar blob e link para download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "lista_compras.csv";
  a.click();
  URL.revokeObjectURL(url);
});

