import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import {Grid, makeStyles, Avatar} from '@material-ui/core';

const useStyles = makeStyles(theme => (
    {
        root:{
            border:`1.2px solid #e0e0e0`,
            padding: theme.spacing(2),
            borderRadius: '8px',
            maxWidth: 250, 
        },
        avatar:{
            width: theme.spacing(7),
            height: theme.spacing(7), 
            color: '#e7d9ea',
            backgroundColor: '#16c79a',
        }, 
        name:{
            fontWeight: theme.typography.fontWeightBold
        }
    }
))

function User() {
    const [data,setData]=useState([]); 
    //get the  data from the api:
    const getData = async() => {
        try{
            const data = await(await fetch('https://jsonplaceholder.typicode.com/users')).json(); 
            setData(data)
        }catch(error){
            console.error(error.message); 
        }
    }

    useEffect(()=>{
        getData(); 
    },[])

    const classes = useStyles(); 

    return (
        <Grid container justify='center' spacing={4}>
            {data.map(user=> (
                <Grid container direction='column' alignItems='center' className={classes.root}>
                    <Avatar className={classes.avatar}>{user.name[0]}</Avatar>
                    <h1>{user.name}</h1>
                    <p>@{user.username}</p>
                    <a href={`http://${user.website}`}>{`http://${user.website}`}</a>
                    <Link to={`/user/${user.id}`}><button>More Details</button></Link>
                </Grid>
            ))}
        </Grid>
    )
}

export default User;
