import React, {useState,useEffect} from 'react'; 
import {useParams, useHistory} from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import {makeStyles, Box, Grid, Typography, List, ListItem, ListItemText, Button} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles(theme => (
    {   
        colorPrimary: {
            backgroundColor: '#41444b',
          },
          barColorPrimary: {
            backgroundColor: "#fddb3a",
          },
        box:{
            maxWidth:'400px',
            borderRadius:'8px',
            background:"#fddb3a",
            margin: '4vh auto', 
            padding: '1rem 2rem'
        },
        list:{
            margin: '1rem auto'
        },
        listItem:{
            paddingBottom:0, 
            paddingTop:0,
            align:'center'
        },
        primaryColor:{
            color:'#41444b'
        },
        secondColor:{
            color:'#3a6351'
        },
        link:{
            textDecoration:'none',
        }, 
        button:{
            color:"#fddb3a",
            backgroundColor:'#41444b',
            fontWeight:600,
            margin:'0.5rem auto',
            '&:hover': {
                color: '#41444b'
            }
        }
        
    }
))

function UserDetails() {
    //to avoid the problem with the initial true value using []
    //and the nested objects, a should use '' or false 
    const [user,setUser]= useState('');
    const classes = useStyles();

    //use params from the url path :id
    const { id }= useParams(); 
    const history = useHistory(); 

    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
   
    useEffect(()=>{
        
        const getIndividualData = async () => {
            try{
                const data = await(await fetch(url)).json(); 
                setUser(data);
            }catch(error){
                console.error(error.message);
            }
        }
        
        getIndividualData();
       
    },[url])

    //history will avoid rendering the parent page when I go from children to parent 
     const handleClick = () =>{
        history.push('/'); 
     }

    return (
        <div className='user-section'>
            {user? (
                //This is my yellow box
                    <Box  component={Grid} container boxShadow={2} justifyContent="center" alignItems="center" className={classes.box}>
                        {/* this grid area constains the list with the user data: */}
                        <Grid item lg={6} sm={12}>
                            <List className={classes.list}>
                                <ListItem alignItems="flex-start"  className={classes.listItem}>
                                   <ListItemText primary="Name" secondary={<Typography variant='body2'className={classes.secondColor} >{user.name}</Typography>} />
                                </ListItem>
                                <ListItem alignItems="flex-start" className={classes.secondColor.listItem}>
                                   <ListItemText primary="Username" secondary={<Typography variant='body2'className={classes.secondColor}>{user.username}</Typography>} />
                                </ListItem>
                                <ListItem alignItems="flex-start" className={classes.listItem}>
                                   <ListItemText primary="Email" secondary={<Typography variant='body2'className={classes.secondColor}>{user.email}</Typography>} />
                                </ListItem>
                                <ListItem alignItems="flex-start" className={classes.listItem}>
                                   <ListItemText primary="Phone" secondary={<Typography variant='body2'className={classes.secondColor}>{user.phone}</Typography>} />
                                </ListItem>
                                <ListItem alignItems="flex-start" className={classes.listItem}>
                                   <ListItemText primary="Company" secondary={<Typography variant='body2'className={classes.secondColor}>{user.company.name}</Typography>} />
                                </ListItem>
                                <ListItem alignItems="flex-start" className={classes.listItem}>
                                   <ListItemText primary="Website" secondary={<Typography variant='body2'className={classes.secondColor}><a className={classes.secondColor.fontColor} href={`http://${user.website}`}>http://{user.website}</a></Typography>} />
                                </ListItem>
                                <ListItem alignItems="flex-start" className={classes.listItem}>
                                <ListItemText primary="Address" 
                                    secondary={<Typography variant='body2'className={classes.secondColor}>
                                               Street: {user.address.street}<br/>
                                               Suite: {user.address.suite}<br/>
                                               City: {user.address.city}<br/>
                                               Zipcode: {user.address.zipcode}<br/>
                                               </Typography>
                                    } 
                                    />  
                                </ListItem>
                            </List>
                        </Grid>
                        {/* this grid area constains the button: */}
                        <Grid item lg={6} sm={12}>
                            {/* <History to='/'className={classes.link} > */}
                                <Button variant="contained" className={classes.button} startIcon={<ArrowBackIosIcon/>} onClick={handleClick}>BACK TO LIST</Button>
                            {/* </History> */}
                        </Grid>
                    </Box>
                ): 
                    <Box m='3rem auto'>
                    <LinearProgress classes={{colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary}}/>
                    </Box>}
        </div>
    )
}

export default UserDetails
