import React, {useState,useEffect} from 'react'; 
import {useParams, Link} from 'react-router-dom';


function UserDetails() {
    const [user,setUser]= useState([]);

    //use params from the url path :id
    const { id }=useParams(); 

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

    return (
        <div>
            {user && 
               (<div>
                <p>Name: {user.name}</p>
                <p>Username: {user.username}</p>
                <p>E-mail: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>Website: <a href={`http://${user.website}`}>{user.website}</a></p>
                </div>)
            }{
                user.company&& 
                (
                <p>Company: {user.company.name}</p>
                )
            }{
                user.address &&
                (
                <div>
                <p>Address:</p>
                    <ul>
                        <li>Street: {user.address.street}</li>
                        <li>Suite: {user.address.suite}</li>
                        <li>City: {user.address.city}</li>
                        <li>Zipcode: {user.address.zipcode}</li>
                    </ul>
                </div>
                )
            }
            <Link to='/' ><button>BACK</button></Link>
        </div>
    )
}

export default UserDetails
