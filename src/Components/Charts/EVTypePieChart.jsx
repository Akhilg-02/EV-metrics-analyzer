import React, { useContext, useState, useMemo } from 'react'
import { EvDataContext } from '../../Context/EVDataContext'
import { Pie, Doughnut } from "react-chartjs-2";
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
import { FormControl, InputLabel, Select, MenuItem, Box, Paper } from "@mui/material";


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

const selectClass = {
  width:"28%",
  marginLeft: "70%"
}


const EVTypePieChart = () => {
    
    const {evData,loading} = useContext(EvDataContext);

    const [selectedYear, setSelectedYear] = useState("");

    

    function getUniqueValues(arr) {
      const uniqueArray = [];
      for (let i = 0; i < arr.length; i++) {
        if (!uniqueArray.includes(arr[i])) {
          uniqueArray.push(arr[i]);
        }
      }
      return uniqueArray;
    }

    const years = getUniqueValues(evData.map((ev) => ev["Model Year"]).sort((a,b)=>b-a));

    const filteredData = useMemo(() => {
      return evData.filter((ev) => {
        return (
          (selectedYear ? ev["Model Year"] === selectedYear : true)
        );
      });
    }, [evData, selectedYear]);


    const evTypes = filteredData.reduce((acc,ev)=>{
        acc[ev['Electric Vehicle Type']] = (acc[ev['Electric Vehicle Type']] || 0) +1;
        return acc;
    },{});

    const chartData = {
      labels: Object.keys(evTypes),
      datasets: [{
        data: Object.values(evTypes),
        backgroundColor: ['#FFCE56', '#4BC0C0'],
      }]    
    }

    if(loading){
      return <div>Loading...</div>
    }
  return (
    <>
    <Box component={Paper} 
    p={2}
    elevation={3} 
    sx={{borderRadius: '12px',}}
    >
    <FormControl
          fullWidth
          variant="outlined"
          style={selectClass}
        >
          <InputLabel id="year-select-label">Filter by Year</InputLabel>
          <Select
            labelId="year-select-label"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            label="Filter by Year"
          >
            <MenuItem value="">All Years</MenuItem>
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Doughnut data={chartData}/>
    </Box>
    
    </>
  )
}

export default EVTypePieChart
