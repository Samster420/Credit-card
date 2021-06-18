import React, {useState} from 'react';
import Card from './Card.js';
import './App.css';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import InputMask from 'react-input-mask';
import 'jquery-mask-plugin/dist/jquery.mask.min';
import ReactCardFlip from 'react-card-flip';
import BackCard from './BackCard.js';
import {Button,Form, Alert, Row, Col} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

//Main app component
class App extends React.Component {

  constructor(){
    super();
    this.state = {
      number1:'',
      username:'',
      cvc:'',
      focus:'',
      expiry:'MM',
      expiry2:'YY',
      cardImage:'',
      isFlipped:false
    }
  }

//To get card type
getCardType = (cardnumber) => {
  var cardNum = cardnumber.split(" ").join("");

  var payCardType = "";
  var regexMap = [
    {regEx: /^4[0-9]{5}/ig,cardType: "VISA"},
    {regEx: /^5[1-5][0-9]{4}/ig,cardType: "MASTERCARD"},
    {regEx: /^3[47][0-9]{3}/ig,cardType: "AMEX"},
    {regEx: /^(5[06-8]\d{4}|6\d{5})/ig,cardType: "MAESTRO"}
  ];

  for (var j = 0; j < regexMap.length; j++) {
    if (cardNum.match(regexMap[j].regEx)) {
      payCardType = regexMap[j].cardType;
      break;
    }
  }

  if (cardNum.indexOf("50") === 0 || cardNum.indexOf("60") === 0 || cardNum.indexOf("65") === 0) {
    var g = "508500-508999|606985-607984|608001-608500|652150-653149";
    var i = g.split("|");
    for (var d = 0; d < i.length; d++) {
      var c = parseInt(i[d].split("-")[0], 10);
      var f = parseInt(i[d].split("-")[1], 10);
      if ((cardNum.substr(0, 6) >= c && cardNum.substr(0, 6) <= f) && cardNum.length >= 6) {
       payCardType = "RUPAY";
        break;
      }
    }
  }

  return payCardType;


}

//Function to set card type image
setCardImage = (cardname) => {

   if(cardname === "VISA"){
       this.setState({
         cardImage:'https://image.flaticon.com/icons/png/512/179/179457.png'
       })
   }
   else if(cardname === "AMEX"){
       this.setState({
         cardImage:'https://image.flaticon.com/icons/png/512/179/179431.png'
       })
   }
   else if(cardname === "MASTERCARD"){
       this.setState({
         cardImage:'https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_vrt_pos_92px_2x.png'
       })
   }
   else if(cardname === "MAESTRO"){
      this.setState({
        cardImage:'https://image.flaticon.com/icons/png/512/217/217445.png'
      })
   }
   else if (cardname === "RUPAY"){
     this.setState({
       cardImage:'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/102014/rupay_0.png?itok=7GLpxAyo'
     })
   }
} 

//To put spaces every 4 digits in card number
formatCardNumber = value => {
  const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g
  const onlyNumbers = value.replace(/[^\d]/g, '')

  return onlyNumbers.replace(regex, (regex, $1, $2, $3, $4) =>
    [$1, $2, $3, $4].filter(group => !!group).join(' ')
  )
}


//To set card number and set image of type of card being used
  setNumber = (numberer) => {
     var cardname = this.getCardType(numberer);
      
     this.setCardImage(cardname);

     var numbering = this.formatCardNumber(numberer);

     this.setState({
       number1:numbering
     })
  }

  //To set customer name
  setName = (usersname) => {
       var usernamer = usersname.toUpperCase();
       this.setState({
          username: usernamer
       })
  }

  
  
  componentDidMount(){
    var $input_elem = $(ReactDOM.findDOMNode(this.refs.number1));

    $input_elem.mask("0000 0000 0000 0000");

    
  }

  //To set cvv
  setCvc = (cvcer) => {
    this.setState({
      cvc:cvcer
    })
  }

//To set state for expiry year
  changeYear = (year) => {
    this.setState({
      expiry2:year
    })
  }
 
//To set state for expiry month
  onChangeMonth = (expiring) => {
      this.setState({
        expiry:expiring
      })
  }

  
//On submitting form various conditions to be handled
  handleSubmit = (e) => {
    const d = new Date();
     if(this.state.number1 === ''){
       window.alert('Enter card number!');
     }
     else if(this.state.cardImage === ''){
       window.alert("Please enter valid card number");
     }
     else if(this.state.username === ''){
       window.alert("Please enter customer name!")
     }
     else if(this.state.cvc === ''){
       window.alert("Please enter the security code")
     }
     else{
       window.alert("Form submitted successfully");
     }
  }

//To know which element is currently being used
  setFocus = (individual) => {
    if(individual === "cvc"){
      this.setState({
        isFlipped:!this.state.isFlipped
      })
    }
    else if(individual === "number1"){
      this.setState({
        isFlipped:false
      })
    }
    else if(individual === "username"){
      this.setState({
        isFlipped:false
      })
    }
    else if(individual === "expiry"){
      this.setState({
        isFlipped:false
      })
    }
    else if(individual === "expiry2"){
      this.setState({
        isFlipped:false
      })
    }
    this.setState({
      focus: individual
    })
  }
  render(){

    const {number1,username,cvc,focus,expiry,expiry2,cardImage,month} = this.state;
    return (
      <div>
        <div className="container">
        <div className="box justify-content-center align-items-center">
        <div className="formDiv">
        <div className="creditCard">
        <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
        
        <Card 
         number1={number1}
         username={username}
         month={month}
         expiry={expiry}
         expiry2={expiry2}
         cvc={cvc}
         focus={focus}
         cardImage = {cardImage}

        
        />

        <BackCard 
          cvc={cvc}
          cardImage={cardImage}
        />
         
        </ReactCardFlip>
       
        </div>
  
        <Form onSubmit={e => this.handleSubmit(e)}>
          <Form.Group>
            <Form.Label>Card Name</Form.Label>
            <Form.Control
             type="text"
             id="username"
             name="username"
             placeholder="User Name"
             value={username}
             maxLength="25"
             onChange = {e => this.setName(e.target.value)}
             onFocus = {e => this.setFocus (e.target.name)}
             />
          </Form.Group>
          <Form.Group>
            <Form.Label>Card Number</Form.Label>
            <Form.Control
             type="text"
             id="number1"
             name="number1"
             placeholder="Card Number"
             value={number1}
             maxLength="19"
             onChange={e => this.setNumber(e.target.value)}
             onFocus={e => this.setFocus(e.target.name)}
             />
          </Form.Group>
          
          <Row>
            <Col>
             <Form.Group>
               <Form.Label>Expiration Month</Form.Label>
               <Form.Control as="select" name="expiry" custom onChange={e=> this.onChangeMonth(e.target.value)} onFocus={e => this.setFocus(e.target.name)}>
                 <option value="01">01</option>
                 <option value="02">02</option>
                 <option value="03">03</option>
                 <option value="04">04</option>
                 <option value="05">05</option>
                 <option value="06">06</option>
                 <option value="07">07</option>
                 <option value="08">08</option>
                 <option value="09">09</option>
                 <option value="10">10</option>
                 <option value="11">11</option>
                 <option value="12">12</option>
               </Form.Control>
             </Form.Group>
            </Col>
               
            <Col>
            <Form.Group>
                 <Form.Label>Expiration Year</Form.Label>
                 <Form.Control as="select" name="expiry2" custom onChange={e=> this.changeYear(e.target.value)} onFocus={e=>this.setFocus(e.target.name)}>
                   <option value="21">2021</option>
                   <option value="22">2022</option>
                   <option value="23">2023</option>
                   <option value="24">2024</option>
                   <option value="25">2025</option>
                   <option value="26">2026</option>
                   <option value="27">2027</option>
                   <option value="28">2028</option>
                   <option value="29">2029</option>
                   <option value="30">2030</option>
                   
                 </Form.Control>
               </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>CVV</Form.Label>
                <Form.Control
                  type="tel"
                  id="cvc"
                  name="cvc"
                  maxLength="3"
                  placeholder="Security Code"
                  value={cvc}
                  onChange = {e => this.setCvc(e.target.value)}
                  onFocus = {e => this.setFocus(e.target.name)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button
           size={"block"}
           data-testid="validateButton"
           id="validateButton"
           type="submit">
             Submit
           </Button>
         </Form>
       </div>
       </div>
       </div>
      </div>
    );
  }
  

  
}

export default App;
