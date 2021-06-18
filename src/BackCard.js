import React from 'react';
import './BackCard.css';

//Back Card Component
class BackCard extends React.Component{
    render(){
        const {cvc,cardImage} = this.props;
        return(
           <div id="backmaincontainer">
                <div id="blackline">
                </div>
                <div id="cvver">CVV</div>
                <div id="whitecontainer" align="right">
                    {cvc}
                </div>
                <div id="imageofbackcontainer">
                    <img id="imageid" src={cardImage}></img>
                </div>
           </div>
        );
    }
}

export default BackCard;