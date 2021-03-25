import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import {Grid, makeStyles, Avatar, Typography, Box, Button} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles(theme => (
    {   background:{
        backgroundColor: '#fddb3a',
        width: '100vw',
        minHeight: '100vh',
    },
        title:{
            color:'#41444b',
            padding:'1rem',
            fontWeight:900,
        },
        card:{
            padding: '2rem 0.5rem',
            borderRadius: '8px',
            maxWidth: 220, 
            margin:'1rem',
            backgroundColor:'white'
        },
        avatar:{
            width: '60px',
            height: '60px', 
            color: '#52575d',
            backgroundColor: '#fddb3a',
            marginBottom:'1rem'
        }, 
        name: {
            align: 'center',
            color:'#41444b',
            marginBottom:'1rem'
           
        }, 
        username:{
            color: '#a6a9b6',
            marginBottom:'0.5rem'
        }, 
        web:{
            color: '#31326f'
        }, 
        link:{
            textDecoration:'none',
        },
        button:{
            color:'#41444b',
            backgroundColor:"#fddb3a",
            fontWeight:600,
            margin:'0.5rem'
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
        <div className={`${classes.background} --user-section`}>
            {/* title */}
        <Typography variant='h3' align='center' className={classes.title}>
            LIST OF USERS
        </Typography>
            {/* wrapper */}
        <Grid container spacing={0} alignContent='center'justify="center" className={classes.wrapper} >
            {data.map(user=> (
                // Card 
                <Box key={user.id}
                boxShadow={2} component={Grid} container direction='column' justifyContent='space-between' alignItems='center'  className={classes.card}>
                    {/* avatar with the initial */}
                    <Avatar className={classes.avatar}>
                        {user.name[0]}
                    </Avatar>

                    {/* name */}
                    <Typography variant='h5' align='center' className={classes.name}>
                        {user.name}
                    </Typography>

                    {/* username */}
                    <Typography variant='caption' className={classes.username}>
                        @{user.username}
                    </Typography>

                    {/* Website link  */}
                    <Typography variant='caption'>
                    <a href={`http://${user.website}`} className={classes.web}>{`http://${user.website}`}</a>
                    </Typography>

                    {/* link and button  */}
                    <Link to={`/user/${user.id}`} className={classes.link}>
                    <Button variant="contained" className={classes.button} endIcon={<NavigateNextIcon/>}>More Detail</Button>
                    </Link>
                </Box>
            ))}
        </Grid>
        </div>
    )
}

export default User;
