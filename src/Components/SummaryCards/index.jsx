
import React, { useContext } from 'react';
import { Grid2 as Grid, Typography, Card, CardContent} from '@mui/material';
import { EvDataContext } from '../../Context/EVDataContext'

const SummaryCards = () => {

    const {evData, loading} = useContext(EvDataContext);

    if (loading) {
        return <Typography>Loading data...</Typography>;
      }

    const manufactures = evData.reduce((acc,ev)=>{
        acc[ev['Make']] = (acc[ev['Make']] || 0) +1;
        return acc;
    },{});

    const totalEvs = evData.length;
    const avgRange = (evData.reduce((sum, ev)=> sum + Number(ev['Electric Range'] || 0),0)/totalEvs).toFixed(2);

    const popularManufacturer = Object.keys(manufactures).reduce((a,b)=>{
        return manufactures[a] > manufactures[b] ? a:b;
    })
  return (
    <>
    <Grid container spacing={2}>
        <Grid item>
            <Card>
                <CardContent>
                    <Typography variant='h6'>Total EV's</Typography>
                    <Typography variant='h5'>
                        {totalEvs}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
        <Grid item>
            <Card>
                <CardContent>
                    <Typography variant='h6'>Average Range</Typography>
                    <Typography variant='h5'>
                        {avgRange} miles
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
        <Grid item>
            <Card>
                <CardContent>
                    <Typography variant='h6'>Popular Manufacturer</Typography>
                    <Typography variant='h5'>
                        {popularManufacturer[0].charAt(0).toUpperCase() + popularManufacturer.slice(1).toLowerCase()}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>

    </Grid>
    </>
  )
}

export default SummaryCards