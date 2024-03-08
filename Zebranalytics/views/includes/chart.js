document.addEventListener('DOMContentLoaded', function() {
    // Default data for the chart
    const labels = ['Ene','Feb','Mar','Abr','May','Junio','Julio','Agost','Sept','Oct', 'Nov','Dec'];
    const data = {
      labels: labels,
      datasets: [{
        label: 'Promedios del Ultimo Mes',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        data: [0,1,4,5,5,3,1,1,3,4,5,5],
      }]
    };
  
    // Create the chart
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  });
  