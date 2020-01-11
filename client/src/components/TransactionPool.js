import React , { Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import Transaction from './Transaction';
import spinner from '../assets/spinningRainbowDark.gif';
import history from '../history';


const POLL_INTERVAL_MS = 10000;

class TransactionPool extends Component{
    state = { transactionPoolMap: {}};

    fetchTransactionPoolMap = () =>{
        fetch(`${document.location.origin}/api/transaction-pool-map`)
            .then(response => response.json())
            .then(json => this.setState({transactionPoolMap: json}));
    };

    fetchMineTransactions = () =>{
        fetch(`${document.location.origin}/api/mine-transactions`)
            .then(response =>{
                if(response.status === 200){
                    alert('success');
                    history.push('/blocks');
                } else{
                    alert('The mine-transactions block request did not complete :(')
                }
            } );

    }

    componentDidMount(){
        this.fetchTransactionPoolMap();
        this.fetchPoolMap =  setInterval(()=> this.fetchTransactionPoolMap(),POLL_INTERVAL_MS);
    }

    componentWillUnmount(){
        clearInterval(this.fetchPoolMap);
    }

    render(){
        return (
            <div className="TransactionPool">
                <img className="logo" src={spinner}></img>
                <div>
                    <Link to='/'>Home</Link>
                </div>
                <h3>TransactionPool</h3>
                {
                    Object.values(this.state.transactionPoolMap).map(transaction =>{

                        return (
                            <div key={transaction.id}>
                                <hr/>
                                <Transaction transaction={transaction}/>

                            </div>
                        );

                    })
                }
                <hr/>
                <Button
                    variant="danger"
                    onClick={this.fetchMineTransactions}
                >
                    Mine the transactions! (Add to the blockchain...)
                </Button>
            </div>
        )
    }
}

export default TransactionPool;