const lista = JSON.parse(localStorage.getItem("listaItens")) || [];

const categorias = {};

lista.forEach(item => {
  const cat = item.categoria || "Sem categoria";
  const total = item.qtd * item.valor;
  categorias[cat] = (categorias[cat] || 0) + total;
});

const labels = Object.keys(categorias);
const valores = Object.values(categorias);

// Cria gráfico com Chart.js
const ctx = document.getElementById('graficoGastos').getContext('2d');
new Chart(ctx, {
  type: 'pie',
  data: {
    labels: labels,
    datasets: [{
      label: 'Gastos por categoria',
      data: valores,
      backgroundColor: [
        '#60a5fa', '#34d399', '#f87171', '#fbbf24', '#a78bfa', '#fb7185', '#10b981'
      ],
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
    }
  }
  
});

