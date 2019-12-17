import React from "react"


//Material-Ui components
import {AppBar, Toolbar, Button, Container, Grid, GridList, GridListTile, TextField, MenuItem} from "@material-ui/core"
import SideBar from "./Sidebar.jsx"
import NavBar from "./NavBar.jsx"
import RightView from "./RightView.jsx"
import AppContext from "./AppContext.jsx"


export default class App extends React.Component{

    constructor(props){
        super(props)

        //We put this first so that it can bind before we attach it to the state!
            // Or else it will bind itself to the state's 'this' instead of the component's this
        this.unlockSubmit = this.unlockSubmit.bind(this)
        this.saveAnimalsFound = this.saveAnimalsFound.bind(this)
        this.detailMode = this.detailMode.bind(this)
        this.returnToResults = this.returnToResults.bind(this)
        this.state = {
            unlockSubmit:this.unlockSubmit,
            disabledButton: true,
            saveAnimalsFound:this.saveAnimalsFound,
            animalsFound:[""],
            foundMessage:"",
            detailMode:this.detailMode,
            detailedItem:"",
            rightView:"results", //or "detail"
            returnToResults:this.returnToResults,
            nothingReturned:""
        }
    }

    unlockSubmit(){
        this.setState({disabledButton:false})
    }

    saveAnimalsFound(data){
       
        if(data[0]){
            this.setState({nothingReturned:""})
            this.setState({animalsFound:data,foundMessage:" This is what we found from your search:"})
        }else{
            this.setState({nothingReturned:"Sorry, no potential pet found!"})
            this.setState({animalsFound:data,foundMessage:""})
        }
    }

    detailMode(index){
        this.setState({detailedItem:this.state.animalsFound[index],rightView:"detail"})
    }
    
    returnToResults(){
        this.setState({rightView:"results"})
    }

    render(){
        return(
           <AppContext.Provider value={this.state}>
                <Grid container >
                        <SideBar />
                        <Grid item xs={12} sm={12} md={9} lg={9} >
                            <Grid container >
                                <NavBar />
                                 <RightView />
                            </Grid>
                        </Grid>
                </Grid>
                <footer style={{backgroundColor:"black",color:"white",padding:"12vh"}}>
                    by Sabrina Koumoin
                </footer>

            </AppContext.Provider>
            
        )
       
    }
}