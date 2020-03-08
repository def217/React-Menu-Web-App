import React, { Component } from 'react'
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import CircularProgress from  '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';


import Cv from '../components/Cv'
import CompletedCv from '../components/CompletedCv'

const styles = {
    progress: {
        position: 'absolute'
    },
    ordersText: {
        marginTop: 20,
        padding: 25
    }
}

export class home extends Component {
    state = {
        cvs: null
    }
    componentDidMount() {
        axios.get('/cvs')
        .then(res => {
            console.log(res.data)
            this.setState({
                cvs: res.data,
            })
        })
        .catch(err => console.log(err));

        axios.get('/doneOrders')
        .then(res => {
            console.log(res.data)
            this.setState({
                completedCvs: res.data,
            })
        })
        .catch(err => console.log(err));
    }
    /*
    deleteCompletedOrders (event, completedCvs) {
        event.preventDefault()
        axios.delete(`/doneOrders/${completedCvs.cvId}`)
    }*/
    render() {
        //const { classes } = this.props;
        let recentCvsMarkup = this.state.cvs ? (
            this.state.cvs.map((cv) => <Cv key={cv.cvId} cv={cv}/>)
        ) : (
            <Grid container spacing={4}>
                <Grid item sm/>
                    <Grid item sm>
                        <CircularProgress size={50} styles={styles.progress}/>
                    </Grid>
                <Grid item sm/>
            </Grid>
        );
        let completedCvsMarkup = this.state.completedCvs ? (
            this.state.completedCvs.map((cv) => <CompletedCv key={cv.cvId} cv={cv}/>)
        ) : (
            <div>No completed orders yet..</div>
        );
        return (
            
            <Grid container spacing={4}>
                <Grid item sm={6} xs={10} styles={styles.ordersText}>
                    <Typography variant="h4" align='center' > Aktyvūs užsakymai </Typography>
                </Grid>
                <Grid item sm={6} xs={10} styles={styles.ordersText}>
                    <Typography variant="h4" align='center' >
                        Baigti užsakymai
                    </Typography>    
                </Grid>
                <Grid item sm={6} xs={10}>
                    {recentCvsMarkup}
                </Grid>
                <Grid item sm={6} xs={10}>
                    {completedCvsMarkup}
                </Grid>
            </Grid>
        )
    }
}

export default home

/*
<Typography variant="h4" align='center' >
                        Baigti užsakymai
                        <Button type="submit" variant="contained" color="primary" onClick={(e) => {this.deleteCompletedOrders(e, this.state.completedCvs)}}> Ištrinti visus </Button>
                    </Typography>
*/