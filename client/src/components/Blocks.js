import React,{Component} from 'react';
import Block from './Block';
import {Link} from 'react-router-dom';
import splitBlock from '../assets/splitBlock.gif';
import spinningRainbowDark from "../assets/spinningRainbowDark.gif";


class Blocks extends Component{
    state = {
        blocks:[]
    };

    componentDidMount(){
        fetch('http://localhost:3000/api/blocks')
            .then(response => response.json())
            .then(json=> this.setState({blocks:json}));
    }

    render(){

        console.log('this.state is ',this.state);

        return (
            <div>
                <img className="logo" src={splitBlock} alt="myCrypto..."/>
                <br/>
                <br/>
                <div>
                    <Link to='/'>
                        Home...
                    </Link>
                </div>
                <h3>
                    Blocks...
                </h3>
                {
                    this.state.blocks.map( block => {
                        return (
                            <Block key={block.hash} block={block} />
                        );
                    })
                }
            </div>
        )
    }
}

export default Blocks;