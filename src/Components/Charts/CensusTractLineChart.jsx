//CensusTractLineChart

import React, { useContext, useMemo } from 'react'
import { EvDataContext } from '../../Context/EVDataContext'
import { Line, Bar } from "react-chartjs-2";
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


const CensusTractLineChart = () => {
    
    const {evData,loading} = useContext(EvDataContext);

    const groupedData = useMemo(() => {
        let result = {};
    
        evData.forEach((row) => {
          const year = row['Year'];
          const model = row['Model'];
    
          if (!result[year]) result[year] = {};
          if (!result[year][model]) result[year][model] = 0;
    
          result[year][model] += 1;
        });
    
        return result;
      }, [evData]);
    
      // Step 2: Extract years and models for x-axis and datasets
      const years = Object.keys(groupedData).sort();
      const models = Object.keys(groupedData[years[0]] || {});
    
      const datasets = models.map((model, index) => ({
        label: model,
        data: years.map((year) => groupedData[year][model] || 0),
        backgroundColor: `rgba(${(index * 40) % 255}, ${(120 + index * 30) % 255}, 192, 0.6)`,
      }));
    
      const chartData = {
        labels: years,
        datasets,
      };
    
      const options = {
        scales: {
          x: { stacked: true, title: { display: true, text: 'Year' } },
          y: { stacked: true, title: { display: true, text: 'EV Count by Model' } },
        },
      };
    

    

    if(loading){
      return <div>Loading...</div>
    }
  return (
    <>
    <Line data={chartData} options={options}/>
    </>
  )
}

export default CensusTractLineChart
