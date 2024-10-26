import React, { useContext } from "react";
import { EvDataContext } from "../../Context/EVDataContext";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PolarAreaController,
} from "chart.js/auto";
import { Box, Paper, Typography } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  ArcElement,
  PolarAreaController,
  Title,
  Tooltip,
  Legend
);

const ModelYearLineChart = () => {
  const { evData, loading } = useContext(EvDataContext);

  const modelYears = evData.reduce((acc, ev) => {
    acc[ev["Model Year"]] = (acc[ev["Model Year"]] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(modelYears).sort(),
    datasets: [
      {
        label: "Vechile Registration Year",
        data: Object.values(modelYears),
        fill: true,
        backgroundColor: "#4BC0C0", //['#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Electric vechiles Model year's",
          color: "black",
        },
      },
      y: {
        title: {
          display: true,
          text: "Vechile count according to Year",
          color: "black",
        },
      },
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Box 
    component={Paper}
      padding={3}
    elevation={3}
    style={{ width: '100%', height: '63vh'}}
    sx={{
      borderRadius: '12px',
    }}
    >
      <Line data={chartData} options={options} />
    </Box>
  );
};

export default ModelYearLineChart;
