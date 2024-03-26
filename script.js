document.addEventListener('DOMContentLoaded', function () {
    let labels = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin']; // Labels par défaut pour la période par mois
    let initialData = [65, 59, 80, 81, 56, 55]; // Données factices pour la période par mois
    let currentData = initialData.slice(); // Copie initiale des données
    let totalBadges = initialData.reduce((acc, curr) => acc + curr, 0); // Nombre total de badges sans filtre
  
    const data = {
      labels: labels,
      datasets: [{
        label: 'Nombre de badges vendus',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        data: currentData,
      }]
    };
  
    const config = {
      type: 'bar',
      data: data,
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Mois'
            }
          }
        }
      }
    };
  
    const ctx = document.getElementById('badgeChart').getContext('2d');
    const myChart = new Chart(ctx, config);
  
    const totalBadgesGeneralElement = document.getElementById('totalBadgesGeneral');
    totalBadgesGeneralElement.textContent = totalBadges;
  
    const totalBadgesFilteredElement = document.getElementById('totalBadgesFiltered');
    totalBadgesFilteredElement.textContent = totalBadges;
  
    const filterSelect = document.getElementById('filter');
    filterSelect.addEventListener('change', function () {
      const filterValue = filterSelect.value;
      updateChart(filterValue);
    });
  
    function updateChart(filter) {
      switch (filter) {
        case 'jour':
          labels = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']; // Labels pour la période par jour
          initialData = [10, 20, 30, 40, 50, 60, 70]; // Données factices pour la période par jour
          config.options.scales.x.title.text = 'Jour'; // Mise à jour du titre de l'axe X
          break;
        case 'semaine':
          labels = ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4', 'Semaine 5']; // Labels pour la période par semaine
          initialData = [50, 60, 70, 80, 90]; // Données factices pour la période par semaine
          config.options.scales.x.title.text = 'Semaine'; // Mise à jour du titre de l'axe X
          break;
        case 'mois':
          labels = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin']; // Labels par défaut pour la période par mois
          initialData = [65, 59, 80, 81, 56, 55]; // Données factices pour la période par mois
          config.options.scales.x.title.text = 'Mois'; // Mise à jour du titre de l'axe X
          break;
        case 'tous':
        default:
          labels = ['Tous']; // Labels pour la période "Tous"
          initialData = [totalBadges]; // Nombre total de badges sans filtre
          config.options.scales.x.title.text = 'Total'; // Mise à jour du titre de l'axe X
          break;
      }
  
      currentData = initialData.slice(); // Mise à jour des données courantes
  
      myChart.data.labels = labels; // Mise à jour des labels de l'axe X
      myChart.data.datasets[0].data = currentData;
      myChart.update();
  
      totalBadgesFilteredElement.textContent = currentData.reduce((acc, curr) => acc + curr, 0);
    }
  });
  