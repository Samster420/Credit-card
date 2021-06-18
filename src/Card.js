import React from 'react';
import './Card.css';

//Front card component
class Card extends React.Component{
    render(){
        const {number1,username,cvc,focus,expiry,expiry2,cardImage} = this.props;
        return(
           <div id="maincontainer">
               <div id="verifier">
                   <img id="verifierimage" src="https://image.flaticon.com/icons/png/512/3876/3876951.png" />
               </div>
               <div id="cardissuer">
                     <img id="cardid" src={cardImage} />
               </div>
               <div id="cardnumber">
                     {number1}
               </div>
               <div id="customername">
                   <div id="customernamer">CARD HOLDER</div>
                   <div id="cardholder">{username}</div>
               </div>

               <div id="expiryer">
                   <div id="expirytitle">EXPIRES</div>
                   {expiry}/{expiry2}
               </div>
           </div>
           
           
        );
        
    }
}

export default Card;