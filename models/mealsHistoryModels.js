// public/js/mealsHistory.js
document.addEventListener("DOMContentLoaded", function () {
  const mealsData = window.mealsData;

  // חילוץ תאריכים ורמות סוכר
  const labels = mealsData.map((meal) =>
    new Date(meal.meal_date).toLocaleDateString()
  );
  const glucoseData = mealsData.map((meal) => meal.glucose_after_meal);

  const ctx = document.getElementById("mealsChart").getContext("2d");
  const mealsChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "רמת סוכר בדם",
          data: glucoseData,
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});
