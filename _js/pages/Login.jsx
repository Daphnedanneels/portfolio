'use strict';

import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {isEmpty} from 'lodash';
import {login} from '../api/auth';
import token from '../auth/token';

// import {basename} from '../globals';
//import token from '../auth/token';

//renderRole is een functie die de rol netjes omzet
//import renderRole from '../util/renderRole';

export default class Detail extends Component{

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props, context){
    super(props, context);

    this.state={
      email: '',
      wachtwoord: '',
      errors: ''
    };
  }

  validate(){

    let {email, wachtwoord} = this.state;
    let errors = {};

    if(!email){
      errors.email = 'Je bent je e-mail vergeten';
    }

    if(!wachtwoord){
      errors.wachtwoord = 'Je bent je wachtwoord vergeten';
    }

    return errors;
  }

  changeHandler(){

    let {email, wachtwoord} = this.refs;
    console.log(wachtwoord.value);

    this.setState({
      email: email.value,
      wachtwoord: wachtwoord.value
    });
  }

  submitHandler(e){
    e.preventDefault();

    let errors =this.validate();

    if (isEmpty(errors)){
      login(this.state)
      .then(t=>token.set(t))
      .then(()=>{
        this.context.router.push('/home');
      })
      .catch(error=>{
        this.setState({errors: error, wachtwoord: ''});
      });
    }else{
      this.setState({errors, wachtwoord: ''});
    }

  }

  render(){

    let {email, wachtwoord, errors={}} = this.state;
    console.log(errors);

    return (
      <main className="login">
        <div className="logincontent">
          <div className="logincontentwrapper">
            <header className="logintitel">
              <h2>Login</h2>
            </header>
            <div className="inlogformulier">
              <form className="inlogformulier" action="#" method="POST" onSubmit={e=>this.submitHandler(e)}>
                <p className="error errortop">{errors.error}</p>
                <label className="login_title_email" for="email">E-mail adres</label>
                <input type="email" name="email"
                       id="email" placeholder="john.doe@gmail.com"
                       ref="email" value={email}
                       onChange={()=> this.changeHandler()}/>
                <p className="error">{errors.email}</p>
                <label className="loginwachtwoord" for="wachtwoord">Wachtwoord</label>
                <input type="password" name="wachtwoord"
                       id="wachtwoord" ref="wachtwoord"
                       placeholder="*******"
                       value={wachtwoord}
                       onChange={()=>this.changeHandler()}/>
                <p className="error">{errors.wachtwoord}</p>
                <input className="button" type="submit" name="submit" value="Verzenden" />
              </form>
            </div>
            <div className="registreeroptie">
               <Link to="register">Of registreer</Link>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
