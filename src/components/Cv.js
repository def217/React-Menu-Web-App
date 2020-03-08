import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import axios from 'axios';

//MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';


const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
    },
    image:{
        minWidth: 200,
    },
    content: {
        padding: 25,
    },
    button: {
        marginTop: 25
    }

}

class Cv extends Component {
    handleSubmit (event, cv) {
        event.preventDefault()
        console.log(cv);
        const cvDataNew = {
            body: cv.body,
            handle: cv.userHandle,
            createdAt: cv.createdAt
        }
        /*
        axios.post(`/cv/${cv.cvId}/update`, cvData)
            .then((res) => {
                console.log(res.data);
                this.props.history.push('/');
            })
            .catch(err => console.log(err));*/

        axios.post(`/cv`, cvDataNew)
        .then((res) => {
            console.log(res.data);
            this.props.history.push('/');
        })
        .catch(err => console.log(err));
        
        axios.delete(`/cv/${cv.cvId}`)
    }

    render() {
            dayjs.extend(relativeTime)
            const { classes, cv : { body, createdAt, userImage, userHandle } } = this.props
            console.log("picture", userImage)
        return (
            <Card className={classes.card}>
                <CardMedia image={"https://firebasestorage.googleapis.com/v0/b/cvapp-d6a6c.appspot.com/o/860985526442.jpg?alt=media"} title="Profile Logo" className={classes.image}/>
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                    <Button type="submit" variant="contained" color="primary" onClick={(e) => {this.handleSubmit(e, this.props.cv)}} className={classes.button}>
                        <div>
                            Done
                        </div>
                    </Button>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Cv)
