import React, {useContext} from "react"
import Results from "./Results.jsx"
import DetailView from "./DetailView.jsx"
import AppContext from "./AppContext.jsx"
function RightView(){
    var context = useContext(AppContext)
    if(context.rightView=="results"){
        return (
            <Results />
        )
    }else if(context.rightView=="detail"){
        return (
            <DetailView />
        )
    }
}
export default RightView