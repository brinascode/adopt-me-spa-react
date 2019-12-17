import React, {useContext} from "react"
import AppContext from "./AppContext.jsx"
import { Paper, Grid, Card, CardActionArea, CardActions, CardMedia, CardContent,Typography, Button} from "@material-ui/core"
import logo from "../images/logo.png"

function DetailView(){
    var context = useContext(AppContext)
    var item =  context.detailedItem  
    return(
      

        <Grid item xs={12} sm={12} md={12} lg={12} style={{padding:"3vw"}}>

             <Paper>
                              
                         <center>
                         <img src={item.image} width="30%"alt="pet" />
                         <br></br>
                         <Typography gutterBottom variant="h5" component="h2">
            
                            <b> Name: </b>   {item.name} <br></br>
                            <b> Breed:</b>  {item.breed} <br></br>
                            <b> Age:</b>  {item.age}<br></br>
                            <b> Zip code:</b>  {item.zipCode}<br></br>
                            <b> Description:</b>  {item.description}
                             </Typography>
                            <Button size="small" variant="outlined" onClick={ (e) => {alert("Coming soon")}}> <img src={logo} width="18%" alt="pet" /></Button>
                        </center>
                    </Paper>

        </Grid>
    )
}
export default DetailView