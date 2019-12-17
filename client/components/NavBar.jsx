import React from "react"
//Material-Ui components
import {AppBar, Toolbar, Button, Container, Grid, GridList, GridListTile, TextField, MenuItem} from "@material-ui/core"
import AppContext from "./AppContext.jsx"

class NavBar extends React.Component{
    constructor(props,context){
        super(props,context)
    }

    render(){
        return(
            <Grid  item xs={12} sm={12} md={12} lg={12} style={{backgroundColor:"purple"}}>
                            {/* This is the col that contains the AppBar */}
                           
                                <AppBar position="static" style={{backgroundColor:"#f7cb4b",color:"white"}}>
                                    <Toolbar style={{color:"#c83f3a"}}> 
                                         <Button color="default" variant="outlined" onClick={this.context.returnToResults}>Return to Search Results</Button>
                                    </Toolbar>
                            
                                </AppBar>

                                
                               
             </Grid>

                 
        )
    }
}
NavBar.contextType = AppContext
export default NavBar