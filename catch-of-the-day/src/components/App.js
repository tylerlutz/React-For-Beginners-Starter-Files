import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
    constructor(){
        super();
        //Add the addFish function
        this.addFish = this.addFish.bind(this);
        //Add the loadSamples function
        this.loadSamples = this.loadSamples.bind(this);
        //Add the addToOrder function
        this.addToOrder = this.addToOrder.bind(this);
        //Initial State
        this.state = {
            fishes: {},
            order: {}
        };
    }

    componentWillMount(){
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`
        , {
            context: this,
            state: 'fishes'
        });
    }

    componentWillUnmount(){
        base.removeBinding(this.ref);
    }

    addFish(fish){
        //Update State
        const fishes = {...this.state.fishes};
        //Add in new fish
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;
        //Set State
        this.setState({ fishes});
    }

    loadSamples(){
        this.setState({
            fishes: sampleFishes
        });
    }

    addToOrder(key){
        // Take copy of state
        const order = {...this.state.order};
        //Update or add the new number of fish ordered
        order[key] = order[key] + 1 || 1;
        //Update State
        this.setState({order});
    }

    render() {
        return(
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="list-of-fishes">
                        {
                            Object.keys(this.state.fishes)
                                .map(key => <Fish key={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} index={key}/>)
                        }
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} />
                <Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
            </div>
        )
    }
}

export default App;
