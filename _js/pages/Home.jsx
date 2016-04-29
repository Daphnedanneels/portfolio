'use strict';

import React, {Component} from 'react';
// import {basename} from '../globals';
import {getMoestuinByUser} from '../api/moestuinen';
import {Link} from 'react-router';
import token from '../auth/token';
import {MoestuinItem} from '../components/';

//renderRole is een functie die de rol netjes omzet
//import renderRole from '../util/renderRole';

export default class Home extends Component{

  constructor(props, context){
    super(props, context);
    this.state = {
      moestuinen: '',
      moestuinenFetched: false,
      errors: ''
    };
  }

  componentDidMount(){

    let {user} = token.content();

    getMoestuinByUser(user.id)
    .then(moestuinen =>{
      this.setState({moestuinen, moestuinenFetched: true});
    })
    .catch(phpErrors =>{
      this.setState({errors: phpErrors, wachtwoord: ''});
      console.log(this.state.errors);
    });

  }

  renderTuinen(){
    let {moestuinen, moestuinenFetched} = this.state;

    if(moestuinenFetched){
      return moestuinen.map(moestuin => <MoestuinItem key={moestuin.moestuinen_id} {...moestuin} />);
    }
  }

  render(){


    return (
      <div>
        <main className="overzicht">
          <section className="moestuinen">
            <header className="moestuinenheader">
              <h2>Overzicht van je moestuinen.</h2>
            </header>
            <ul className="moestuinoplijsting">
               {this.renderTuinen()}
              <li className="addmoestuin">
                <Link to="/maakmoestuin">
                  <p className="addicon">+</p>
                  <p className="moestuintitel">Voeg een moestuin toe.</p>
                </Link>
              </li>
            </ul>
          </section>
        </main>
      </div>
    );
  }
}
