import React, { useEffect, useRef, useContext } from "react";
import Chart from "chart.js/auto";
import { AuthContext } from "../../contexts/AuthContext";
import { getAllBookReadForUser } from "../../repository/getAllBookReadForUser";

const RadarChart = () => {
  const { user, addReadBookEvent } = useContext(AuthContext);
  const chartRef = useRef(null);
  const radarChartInstance = useRef(null);

  useEffect(() => {
    const fetchDataAndRenderChart = async () => {
      try {
        if (!user?.username || !user?.token) {
          console.warn("Utilisateur non authentifié");
          return;
        }

        // Récupération des données de l'API
        const data = await getAllBookReadForUser(user.username, user.token);

        // Grouper les livres par catégorie
        const groupedData = data.reduce((acc, item) => {
          const category = item.book.category;
          if (!acc[category]) {
            acc[category] = 0;
          }
          acc[category]++;
          return acc;
        }, {});

        const categories = Object.keys(groupedData); // Catégories
        const values = Object.values(groupedData); // Nombre de livres par catégorie

        // Vérifiez si un graphique existe déjà, et détruisez-le
        if (radarChartInstance.current) {
          radarChartInstance.current.destroy();
        }

        // Créez un nouveau graphique radar
        const ctx = chartRef.current.getContext("2d");
        radarChartInstance.current = new Chart(ctx, {
          type: "radar",
          data: {
            labels: categories,
            datasets: [
              {
                label: "Nombre de livres",
                data: values,
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Nombre de livres par catégorie",
              },
            },
            scales: {
              r: {
                suggestedMin: 0,
                suggestedMax: Math.max(...values) + 1,
                ticks: {
                  stepSize: 1,
                },
              },
            },
          },
        });
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    };

    fetchDataAndRenderChart();

    return () => {
      if (radarChartInstance.current) {
        radarChartInstance.current.destroy();
      }
    };
  }, [user, addReadBookEvent]); // Dependency array ensures re-fetching when user changes

  return (
    <div className="max-w-lg mx-auto mt-8 bg-white shadow-lg p-6 rounded-lg">
      <canvas ref={chartRef} />
    </div>
  );
};

export default RadarChart;
