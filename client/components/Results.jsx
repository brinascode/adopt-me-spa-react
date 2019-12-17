import React, {useContext,useEffect,useState} from "react"
import { Paper, Grid, Card, CardActionArea, CardActions, CardMedia, CardContent,Typography, Button} from "@material-ui/core"
import AppContext from "./AppContext.jsx"
import logo from "../images/logo.png"


export default function Results(){
    var context = useContext(AppContext)
    var [isContent, changeIsContent] = useState(false)
        
    useEffect(()=>{
        if(context.animalsFound[0]){
            changeIsContent(true)
            
        }
  
    })
           
    if(isContent){
        return(
            <Grid item container xs={12} sm={12} md={12} lg={12} style={{padding:"3vw"}}>
                <center>
                    <div>
                        <h1 style={{fontFamily:"Nunito"}}>{context.foundMessage}</h1>
                    </div>
                </center>  
                
    
               {context.animalsFound.map((item,index)=>
                 <Grid item xs={12} sm={12} md={6} lg={6} key={index} >
                    <Paper>
                         <img src={item.image} width="100%"alt="pet" />
                         <center>
                         <Typography gutterBottom variant="h5" component="h2">
                         <img src={logo} width="18%" alt="pet" /> <br></br>
                            <b>Name: {item.name}</b>        <br></br>
                            <b> Age: {item.age}</b>         <br></br>
                            <b> Location/Zip Code:</b> {item.zipCode}
                                </Typography>
                               
                            <Button size="small" variant="outlined" onClick={ (e) => {context.detailMode(index)}}>More Details</Button>
                        </center>
                    </Paper>
                </Grid>
    
               )}
    
            
            </Grid>
        )
    }else{
        return (

            <Grid item container xs={12} sm={12} md={12} lg={12} style={{padding:"20px"}}>
                   
                       <div>
                            <Paper>
                                <Typography style={{color:"red"}}>
                                 {context.nothingReturned}
                                </Typography>
                            </Paper>
                             
                           <center>
                            <h1 style={{fontFamily:"Lilita One"}}>Welcome to Adopt Me!</h1>
                            <p style={{fontFamily:"Nunito"}}>On this website you can find cute pets to adopt from local shelters. 
                                Just fill out the form and you'll be all set! </p>
                            <img src="https://adopt-me-spa.s3.amazonaws.com/dogs-group.jpg" alt="group-pic" />
                            </center>
                        </div>
                      
            </Grid>

        )
    }
    
}
