import React,{Component} from 'react'
import {Link} from "react-router-dom"
import './Header.css'



class Header extends Component{   
    render(){
        return (
            <div className="Header">
              <Link to="/">
                    <div className="LinkPage">
                        Stopwatch
                    </div>
              </Link> 
              <Link to="/stopwatchpro">
                <div className="LinkPage">
                    Stopwatch Pro
                </div>
              </Link>
              
              <Link to="/sapper">
                <div className="LinkPage">
                        Sapper
                </div>
              </Link>
            </div>
          );
    }
}

export default Header;
