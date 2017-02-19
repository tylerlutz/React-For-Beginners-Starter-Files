import React from 'react';
import { getFunName } from '../helpers' 

class StorePicker extends React.Component {

    goToStore(event) {
        //Stops form from submitting
        event.preventDefault();
        // First Grab Text From Box
        const storeId = this.storeInput.value;
        //Second wr are going to transition from / to /store/:storeId
        this.context.router.transitionTo(`/store/${storeId}`);

    }
    render(){
        return (
            <form  className="store-selector" onSubmit={(e) => this.goToStore(e)}>
                <h2>Please Enter A Store</h2>
                <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input => { this.storeInput = input})}/>
                <button type="submit">Visit Store </button>
            </form>
        )
    }
}

//Surface Router from Parent using Context Types
StorePicker.contextTypes = {
    router: React.PropTypes.object
}

export default StorePicker;