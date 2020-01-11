import React , { Component } from 'react';
import {Link} from 'react-router-dom';
import noodles from '../assets/noodles.gif';


class App extends Component {
    state = {
        walletInfo: {}
    };

    componentDidMount(){
        fetch(`${document.location.origin}/api/wallet-info`)
            .then(response => response.json())
            .then(json => this.setState({ walletInfo:json}));
    }

    render (){

        const {address,balance} = this.state.walletInfo;

        return (
            <div className="App">
                <img className="logo" src={noodles} alt="myCrypto..."/>
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
                <div>
                    <Link to='/conduct-transaction'>
                        Conduct Transaction...
                    </Link>
                </div>
                <div>
                    <Link to='/transaction-pool'>
                        View Unconfirmed Transactions...
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