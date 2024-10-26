import React, { useContext } from 'react'
import { EvDataContext } from '../../Context/EVDataContext'
import { Bar } from "react-chartjs-2";
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


const ElectricRangeBarHistogram = () => {
    
    const {evData,loading} = useContext(EvDataContext);

    const ranges = evData.reduce((acc,ev)=>{
        const range = Math.floor(ev["Electric Range"]/50) * 50
        acc[range] = (acc[range] || 0) +1;
        return acc;
    },{});

    const chartData = {
      labels: Object.keys(ranges).map(r=> `${r}-${+r + 50}`),
      datasets: [{
        label: 'Number of EVs',
        data: Object.values(ranges),
        backgroundColor:'#FFCE56', //['#FFCE56', '#4BC0C0'],
      }]    
    }

    const options = {
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "Electric vechiles Ranges",
            color: "black",
          },
        },
        y: {
          title: {
            display: true,
            text: "Average of vechile ranges",
            color: "black",
          },
        },
      },
    };

    if(loading){
      return <div>Loading...</div>
    }
  return (
    <Box 
    mt={4}
    component={Paper}
     p={2}
     elevation={3}
     style={{ width: '100%', height: '85%'}}
     sx={{borderRadius:"12px"}}
    >
    <Bar data={chartData} options={options} />
    </Box>
  )
}

export default ElectricRangeBarHistogram