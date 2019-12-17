import React, {useState,useEffect,useContext} from "react"
import AppContext from "./AppContext.jsx"

import {AppBar, Toolbar, Button, Container, Grid, GridList, GridListTile, TextField, MenuItem} from "@material-ui/core"
import axios from "axios"

//Images
import logo from "../images/logo.png"
import dog1 from "../images/dog1.jpg"
import dog2 from "../images/dog2.jpg"
import cat1 from "../images/cat1.jpg"
import hamster1 from "../images/hamster1.jpg"
var sliderImages = [dog1, dog2, cat1, hamster1]

class SideBar extends React.Component{
   // static contextType = {AppContext}
    constructor(props,context){
        super(props,context)
        this.state = {
            sliderIndex:0,
            animalBreeds:[],
            results:[],
            animals:[],
            animalType:"",
            animalBreed:"",
            maxAge:0,
            zipCode:0,
            formNotComplete:true,
            message:""
            
        }
        this.slideImage = this.slideImage.bind(this)
        this.handleAnimalChange = this.handleAnimalChange.bind(this)
        this.handleBreedChange = this.handleBreedChange.bind(this)
        this.handleOtherChange = this.handleOtherChange.bind(this)
        this.submitForm = this.submitForm.bind(this)
        this.toggleLock = this.toggleLock.bind(this) 
        this.getAnimalsAndBreeds = this.getAnimalsAndBreeds.bind(this)
    }


    getAnimalsAndBreeds(){
        var component = this
        axios.get("https://adopt-me-server.herokuapp.com/getAnimalsAndBreeds").then((response)=>{
            component.setState({animals:response.data})
        })
    }

    toggleLock(){
        if((this.state.animalType  && this.state.animalBreed) && (this.state.zipCode && this.state.maxAge)){
            this.setState({formNotComplete:false})
            this.context.unlockSubmit()
            
        }else{
            this.setState({formNotComplete:true})
          
        }
    }

   
    handleAnimalChange(e){
        //We set the Animal Type as whatever the user selected
        const component = this
        var animalType = e.target.value
        this.setState({animalType:animalType})

        //We find the animal object that matches what was clickes and set the breeds for the select list
        var animals = this.state.animals
        for(var i=0;i<animals.length;i++){
            if(animals[i].type == animalType){
                component.setState({animalBreeds:animals[i]["breeds"]})
                
            }
        } 

        //Checking whether the form is complete
        this.toggleLock()
       
    }

    handleBreedChange(e){

        const component = this
        var breed = e.target.value
        this.setState({animalBreed:breed})

        //Checking whether the form is complete
        this.toggleLock()
    }

    handleOtherChange(e){
        var id = e.target.id
        var value = e.target.value
        if(id =="zipCode"){
            this.setState({zipCode:value})
        }else if(id == "maxAge"){
            this.setState({maxAge:value})
        }
       
        //Checking whether the form is complete
        this.toggleLock()

    }


    submitForm(){
        var component = this
        var request = {
            zipCode: parseInt(this.state.zipCode),
            animalType : this.state.animalType,
            animalBreed : this.state.animalBreed,
            maxAge: parseInt(this.state.maxAge)
        }

        if(request.zipCode.toString().length < 5 || request.maxAge <= 0 || request.zipCode.toString().length > 5){
            this.setState({message:"Please enter valid search criteria"})
            this.context.saveAnimalsFound([])
        }else{
            this.setState({message:""})    
            axios.post("https://adopt-me-server.herokuapp.com/findAnimals",request).then((request)=>{
                this.context.saveAnimalsFound(request.data)
                
            })
        }

        
         

    }

    slideImage(){
        var sliderIndex = this.state.sliderIndex
        var component = this

         setInterval(()=>{

                if(sliderIndex >= 0 && sliderIndex < sliderImages.length)
                {
                    component.setState({sliderIndex:sliderIndex++})
                   
                    
                }
                else if(sliderIndex === sliderImages.length)
                {
                    component.setState({sliderIndex:0})
                   
                    
                }
                
        },3000)
    }

    componentDidMount(){
        this.slideImage()
        this.getAnimalsAndBreeds()
    }


    
    render(){
       
        return(
            <Grid item  xs={12} sm={12} md={3} lg={3} style={{marginBottom:"26vh",height:"100vh",borderRight:"solid black"}}>
                       
                                 
                                    <center> 
                                        <img src={logo} alt="logo" width="70%"/> 
                                        <p style={{fontFamily:"Nunito"}}>Fill this form to adopt your own bundle of furry joy!</p>
                                      
                                        <img src={sliderImages[this.state.sliderIndex]} alt="slides" width="60%" style={{borderRadius:"5px"}}/>
                                        <br></br>
                                        <form onClick={function(e){e.preventDefault()}}>
                                            <br></br>
                                            
                                                <TextField label="Zip Code"  value={this.state.zipCode} id="zipCode" onChange={this.handleOtherChange}/>
                                                    
                                            <br></br>

                                                <TextField select label="Type " value={this.state.animalType} onChange={this.handleAnimalChange}> 
                                                            {this.state.animals.map((animal,i)=>
                                                                    <MenuItem value={animal.type} key={i}>{animal.type}</MenuItem>

                                                            )}
                                                </TextField>

                                                <br></br>
                                                <TextField select label="Breed " value={this.state.animalBreed} onChange={this.handleBreedChange}> 
                                                            {this.state.animalBreeds.map((breed,i)=>
                                                                    <MenuItem value={breed} key={i}>{breed}</MenuItem>
                                                            )}
                                                </TextField>
                                                

                                                    <br></br>
                                                    <br></br>
                                                    <br></br>

                                                <TextField label="Animal's max age" value={this.state.maxAge}id="maxAge" onChange={this.handleOtherChange}/>


                                                    <br></br><br></br><br></br><br></br>
                                                    <h3 style={{color:"red"}}> {this.state.message}  </h3>       
                                                    <Submit submitForm={this.submitForm}/>

                                                    
                                           
                                        </form>

                                    </center>
                                    
                        </Grid>
                    
        )
    }


}
SideBar.contextType = AppContext


function Submit(props){
    var context = useContext(AppContext)
    
    return(
       
            <Button color="default" variant="contained"  disabled={context.disabledButton} onClick={props.submitForm} > Find my pet!  
            </Button>
     
    )

}

export default SideBar