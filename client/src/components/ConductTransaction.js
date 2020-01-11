import React, {Component} from 'react';
import {FormGroup, FormControl, Button} from 'react-bootstrap';
import history from '../history';

import {Link} from 'react-router-dom';
import hoops from "../assets/hoops.gif";

class ConductTransaction extends Component{
    state = { recipient : "", amount : 0 };

    updateRecipient = event => {
        this.setState({recipient:event.target.value});
    };

    updateAmount = event => {
        this.setState({amount:Number(event.target.value)});
    };

    conductTransaction = () => {
        const { recipient , amount } = this.state;

        fetch(`${document.location.origin}/api/transact`,{
            method:'POST',
            headers:{ 'Content-Type':'application/json'},
            body: JSON.stringify({recipient,amount})
        }).then(response => response.json())
            .then(json => {
                alert(json.message || json.type);
                history.push('/transaction-pool');
            });
    };

    render(){
        return (
            <div className='ConductTransaction'>
                <img className="logo" src={hoops} alt="..."/>
                <br/>
                <br/>
                <Link to='/'>Home</Link>
                <h3>Conduct a Transaction</h3>
                <br />

                <FormGroup>
                    <FormControl
                        input='text'
                        placeholder='recipient'
                        value={this.state.recipient}
                        onChange={this.updateRecipient}
                    />
                </FormGroup>
                <FormGroup>
                    <FormControl
                        input='number'
                        placeholder='amount'
                        value={this.state.amount}
                        onChange={this.updateAmount}
                    />
                </FormGroup>

                <Button variant="danger" onClick={this.conductTransaction}>Submit</Button>

            </div>
        );
    }
};

export default ConductTransaction;