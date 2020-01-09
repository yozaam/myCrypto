import React , { Component } from 'react';
import {Link} from 'react-router-dom';
import spinningRainbowDark from '../assets/spinningRainbowDark.gif';


class App extends Component {
    state = {
        walletInfo: {}
    };

    componentDidMount(){
        fetch('http://localhost:3000/api/wallet-info')
            .then(response => response.json())
            .then(json => this.setState({ walletInfo:json}));
    }

    render (){

        const {address,balance} = this.state.walletInfo;

        return (
            <div className="App">
                <img className="logo" src={spinningRainbowDark} alt="myCrypto..."/>
                <br/>
                <br/>
                <div>
                   <h3> <em>Welcome to your chains...</em></h3>
                </div>
                <br/>
                <div>
                    <Link to='/blocks'>
                    Blocks...
                    </Link>
                </div>
                <br/>

                <div className="WalletInfo">
                    <div><strong>Address:</strong> {address}</div>
                    <div><strong>Balance:</strong> {balance}</div>
                </div>

            </div>

        );
    }
}

export default App;