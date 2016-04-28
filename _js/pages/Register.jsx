'use strict';

import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {isEmpty} from 'lodash';
import {insert} from '../api/users';
import {login} from '../api/auth';
import token from '../auth/token';

// import {basename} from '../globals';
//import token from '../auth/token';

//renderRole is een functie die de rol netjes omzet
//import renderRole from '../util/renderRole';

export default class Register extends Component{

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props, context){
    super(props, context);

    this.state={
      // file:'',
      voornaam: '',
      achternaam: '',
      email: '',
      wachtwoord: ''
    };
  }
  changeHandler(){

    let {voornaam, achternaam, email, wachtwoord} = this.refs;

    this.setState({
      voornaam: voornaam.value,
      achternaam: achternaam.value,
      email: email.value,
      wachtwoord: wachtwoord.value
    });
  }


  validate(){

    let {voornaam, achternaam, email, wachtwoord} = this.state;

    let errors={};

    if(!voornaam){
      errors.voornaam = 'Je bent je voornaam vergeten.';
    }

    if(!achternaam){
      errors.achternaam = 'Je bent je achternaam vergeten.';
    }

    if(!email){
      errors.email = 'Je bent je e-mailadres vergeten.';
    }

    if(!wachtwoord){
      errors.wachtwoord = 'Je bent je wachtwoord vergeten.';
    }

    return errors;
  }



  submitHandler(e){
    e.preventDefault();

    let errors=this.validate();

    if (isEmpty(errors)){
      insert(this.state)
      .then(()=> login(this.state))
      .then(t=>token.set(t))
      .then(()=>{
        this.context.router.push('/maakmoestuin');
      })
      .catch(phpErrors =>{
        console.log(phpErrors);
        this.setState({errors: phpErrors, wachtwoord: ''});
      });
    }else{
      this.setState({errors, wachtwoord: ''});
    }
  }

  render(){
    let {voornaam, achternaam, email, wachtwoord, errors={}} = this.state;

    console.log(errors.error);

    return (
      <div>
        <section className="breadcrumbwrapper">
          <h2 className="hide">breadcrumb</h2>
          <Link className="previous" to="login">&lt;</Link>
          <ul className="breadcrumblijst">
            <li><p className="breadcrumbitem">Registreer</p></li>
          </ul>
        </section>
        <main className="registreer">
          <header className="moestuinenheader">
            <h2>Maak een account</h2>
          </header>
          <div className="registreerwrapper">
          <form className="registreerform" action="#" method="POST" onSubmit={e => this.submitHandler(e)}>
            <p className="error errortop">{errors.error}</p>
            <div className="avatarFileUpload">
              <p className="plusFileUpload">+</p>
              <p className="tekstFileUpload">Upload een profielfoto</p>
              <input className="avatarFile" type="file" name="avatarFile" id="avatarFile"/>
            </div>
            <section className="persoonlijkeGegevens">
              <h3>Persoonlijke gegevens</h3>
              <div className="voornaaminput">
                <label for="voornaam">Voornaam</label>
                <input type="text" placeholder="John"
                       name="voornaam" id="voornaam"
                       ref="voornaam" value={voornaam}
                       onChange={()=>this.changeHandler()}/>
                <p className="error">{errors.voornaam}</p>
              </div>
              <div className="achternaaminput">
                <label for="achternaam">Achternaam</label>
                <input type="text" placeholder="Doe"
                       name="achternaam" id="achternaam"
                       ref="achternaam" value={achternaam}
                       onChange={()=>this.changeHandler()}/>
                <p className="error">{errors.achternaam}</p>
              </div>
            </section>
            <section className="inlogGegevens">
              <h3>Inlog gegevens</h3>
              <div className="emailinput">
                <label for="email">E-mail adres</label>
                <input type="email" placeholder="john.doe@gmail.com"
                       name="email" id="email"
                       ref="email" value={email}
                       onChange={()=>this.changeHandler()}/>
                <p className="error">{errors.email}</p>
              </div>
              <div className="passwordinput">
                <label for="wachtwoord">Wachtwoord</label>
                <input type="password" placeholder="*******"
                       name="wachtwoord" id="wachtwoord"
                       ref="wachtwoord" value={wachtwoord}
                       onChange={()=>this.changeHandler()}/>
                <p className="error">{errors.wachtwoord}</p>`
              </div>
            </section>
            <input className="button" type="submit" name="submit" defaultValue="Maak een account"/>
          </form>
          </div>
        </main>
      </div>
    );
  }
}
