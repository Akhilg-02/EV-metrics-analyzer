import React, { useContext, useMemo, useState } from "react";
import { EvDataContext } from "../../Context/EVDataContext";
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
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";

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
  width: "25%",
  marginRight: "2%",
};

const EVManufacturerBarChart = () => {
  const { evData, loading } = useContext(EvDataContext);

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedMake, setSelectedMake] = useState("");

  function getUniqueValues(arr) {
    const uniqueArray = [];
    for (let i = 0; i < arr.length; i++) {
      if (!uniqueArray.includes(arr[i])) {
        uniqueArray.push(arr[i]);
      }
    }
    return uniqueArray;
  }

  // Get unique years, makes, and models
  const years = getUniqueValues(
    evData.map((ev) => ev["Model Year"]).sort((a, b) => b - a)
  );
  const makes = getUniqueValues(evData.map((ev) => ev["Make"]));
  const models = getUniqueValues(evData.map((ev) => ev["Model"]));

  const filteredData = useMemo(() => {
    return evData.filter((ev) => {
      return (
        (selectedYear ? ev["Model Year"] === selectedYear : true) &&
        (selectedMake ? ev["Make"] === selectedMake : true) &&
        (selectedModel ? ev["Model"] === selectedModel : true)
      );
    });
  }, [evData, selectedYear, selectedMake, selectedModel]);

  const manufacturers = selectedMake
    ? filteredData.reduce((acc, ev) => {
        acc[ev["Model"]] = (acc[ev["Model"]] || 0) + 1;
        return acc;
      }, {})
    : filteredData.reduce((acc, ev) => {
        acc[ev["Make"]] = (acc[ev["Make"]] || 0) + 1;
        return acc;
      }, {});

  const chartData = {
    labels: Object.keys(manufacturers),
    datasets: [
      {
        label: selectedMake ? "EVs by Model" : "EVs by Manufacturer",
        data: Object.values(manufacturers),
        backgroundColor: "#4BC0C0",
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
          text: selectedMake
            ? "Types of Manufacturing Model's"
            : "Types of Manufacturer",
          color: "black",
        },
      },
      y: {
        title: {
          display: true,
          text: "Count of Manufacturing Brands",
          color: "black",
        },
      },
    },
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", marginLeft: "25%" }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <>
      <Box
        component={Paper}
        p={2}
        elevation={3}
        style={{ height: "91vh" }}
        sx={{ borderRadius: "12px" }}
      >
        <Typography
          variant="h5"
          gutterBottom
          mb={3}
          style={{ fontWeight: "bold" }}
        >
          Manufacturing details
        </Typography>

        <FormControl fullWidth variant="outlined" style={selectClass}>
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

        <FormControl fullWidth variant="outlined" style={selectClass}>
          <InputLabel id="make-select-label">Filter by Make</InputLabel>
          <Select
            labelId="make-select-label"
            value={selectedMake}
            onChange={(e) => {
              setSelectedMake(e.target.value);
              setSelectedModel(""); // Reset model selection when manufacturer changes
            }}
            label="Filter by Make"
          >
            <MenuItem value="">All Makes</MenuItem>
            {makes.map((make) => (
              <MenuItem key={make} value={make}>
                {make}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedMake && ( // Show model filter only if a make is selected
          <FormControl variant="outlined" style={selectClass}>
            <InputLabel id="model-select-label">Filter by Model</InputLabel>
            <Select
              labelId="model-select-label"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              label="Filter by Model"
            >
              <MenuItem value="">All Models</MenuItem>
              {models
                .filter(
                  (model) =>
                    filteredData.some(
                      (ev) =>
                        ev["Model"] === model && ev["Make"] === selectedMake
                    ) // Show models related to the selected make
                )
                .map((model) => (
                  <MenuItem key={model} value={model}>
                    {model}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )}

        <Box style={{ width: "100%", height: "83%" }}>
          <Bar data={chartData} options={options} />
        </Box>
      </Box>
    </>
  );
};

export default EVManufacturerBarChart;
