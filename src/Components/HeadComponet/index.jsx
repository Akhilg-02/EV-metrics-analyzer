import React from 'react'
import { Grid2 as Grid, Typography, Box } from '@mui/material';
import EVTypePieChart from '../Charts/EVTypePieChart';
import EVManufacturerBarChart from '../Charts/EVManufacturerBarChart';
import ModelYearLineChart from '../Charts/ModelYearLineChart';
import ElectricRangeBarHistogram from '../Charts/ElectricRangeBarHistogram';
import SummaryCards from '../SummaryCards';
import EVDataTable from '../EVDataTable';
import CensusTractLineChart from '../Charts/CensusTractLineChart';
import HeroHead from '../HeroHead';

const HeadComponent = () => {
    //rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}
  return (
    <>
    <Box sx={{padding:4}}>
        <Typography variant='h4' gutterBottom>
          Electric vechile dashboard
        </Typography>
        <SummaryCards/>
        <Grid container rowSpacing={3} columnSpacing={{sm:3 ,md: 4}} mt={2}>
            <Grid size={{ xs: 12, sm:4 ,md: 7,}}>
                <EVManufacturerBarChart/>
            </Grid>
            <Grid size={{ xs: 12, sm:6, md: 5,}}>
                <EVTypePieChart/>
            </Grid>
            <Grid size={{ xs: 12, sm:6, md: 4, }}>
                <HeroHead/>
            </Grid>
            <Grid size={{ xs: 12, sm:6, md: 8, }}>
                <ModelYearLineChart/>
            </Grid>
            <Grid size={{ xs: 12, sm:6, md: 8, }}>
                <ElectricRangeBarHistogram/>
            </Grid>
            <Grid size={{ xs: 12, sm:6, md: 4, }}>
                <EVDataTable/>
            </Grid>
        </Grid>

    </Box>
    </>
  )
}

export default HeadComponent