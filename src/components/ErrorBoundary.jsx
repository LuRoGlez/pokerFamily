import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            haveError: false
        }
    }
 
    static getDerivedStateFromError(){
        return {haveError: true};
    }


    render(){
        if(this.state.haveError){
            return window.location.href = "/"
        }

        return this.props.children;
    }

}

export default ErrorBoundary;