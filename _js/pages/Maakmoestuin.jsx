'use strict';

import React, {Component, PropTypes} from 'react';
import {basename} from '../globals';
import {Link} from 'react-router';
import {selectAllMinFilter} from '../api/users';
import token from '../auth/token';
import {UserItem, NoUserItem, MedeEigenaars, AardeRegister} from '../components/';
import {isEmpty, filter} from 'lodash';

import {insertMoestuin} from '../api/moestuinen.js';
import {insertMoestuinUser} from '../api/moestuinenUsers.js';
import {insertPercelen} from '../api/percelen.js';
//renderRole is een functie die de rol netjes omzet
//import renderRole from '../util/renderRole';

export default class Maakmoestuin extends Component{

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props, context){
    super(props, context);

    this.state={
      naam: '',
      rijen: 5,
      kolommen: 5,
      eigenaar: parseInt(token.content().user.id),
      user: token.content(),
      eigenaars: [],
      users: '',
      usersFetched: false,
      search: '',
      errors: '',
      moestuinId: '',
      grid: ''
    };

    this.getUsers();
  }

  showUsers(){
    let inputUser = document.querySelector('#eigenaaremail');
    let dropdownFormUsers = document.querySelector('.dropdownformUsers');

    inputUser.addEventListener('input', ()=>{
      dropdownFormUsers.style.display='block';
      let {search} = this.refs;
      this.setState({
        search: search.value
      });
      this.getUsers();
    });

    dropdownFormUsers.addEventListener('click', ()=>{
      dropdownFormUsers.style.display='none';
      this.setState({search: ''})
    });

    document.querySelector('body').addEventListener('click', ()=>{
      dropdownFormUsers.style.display='none';

    });
  }

  validate(){

    let {naam, rijen, kolommen} = this.state;

    let errors = {};

    if(!naam){
      errors.naam = 'Je bent je naam vergeten.';
    }

    if(!rijen){
      errors.rijen = 'Je bent je rijen vergeten.';
    }

    if(!kolommen){
      errors.kolommen = 'Je bent je kolommen vergeten.';
    }

    return errors;
  }

  getUsers(){
    let {search} = this.state;
    let searchParams = {};
    searchParams.search = search;

    selectAllMinFilter(searchParams)
    .then(response=>{
      let users = filter(response, o => o.id !== this.state.user.user.id);



      //logica toevoegen voor inserted users


      this.setState({users, usersFetched: true});
    });
  }

  renderUsers(){
    let {users, usersFetched} = this.state;
    let usersMap = users;
    if(usersFetched){
      if (!isEmpty(usersMap)){
        return usersMap.map(user => <UserItem pushEigenaar={(userId) => this.pushEigenaar(userId)} key={user.id} {...user} />);
      }else{
        return <NoUserItem/>;
      }
    }
  }

  onchangeHandler(){
    let {naam, rijen, kolommen} = this.refs;

    this.setState({
      naam: naam.value,
      rijen: parseInt(rijen.value),
      kolommen: parseInt(kolommen.value)
    });
    this.renderMoestuin();
  }

  onSubmitHandler(e){
    e.preventDefault();
    //console.log('submit form');

    let errors = this.validate();

    if (isEmpty(errors)){
      insertMoestuin(this.state)
      .then((inserted)=>{
        this.setState({moestuinId: inserted.id});
      })
      .then(()=>{
        this.insertPercelenAction();
      })
      .then(()=>{
        if(!isEmpty(this.state.eigenaars)){
          this.insertMoestuinUsers();
        }else{

          this.context.router.push(`/moestuin/${this.state.moestuinId}`);
        }
      })
      .catch(phpErrors =>{
        this.setState({errors: phpErrors});
      });
    }else{
      this.setState({errors});
    }
  }

  insertMoestuinUsers(){
    let {moestuinId} = this.state;
    let {eigenaars} = this.state;
    let eigenaarsArray = [];
    eigenaars.map(eigenaar => eigenaarsArray.push(eigenaar.id));


    let data = {
      'users': eigenaarsArray,
      'moestuin_id': parseInt(moestuinId)
    };

    insertMoestuinUser(data)
    .then(()=>this.context.router.push('/home'))
    .catch(phpErrors =>{
      this.setState({ errors: phpErrors});
    });
  }

  insertPercelenAction(){
    let {rijen, kolommen, moestuinId} = this.state;
    let data = {
      rijen: rijen,
      kolommen: kolommen,
      moestuin_id: parseInt(moestuinId)
    };
    insertPercelen(data);
  }


  pushEigenaar(user){
    let {eigenaars} = this.state;
    console.log(user);
    eigenaars.push(user);
    this.setState({eigenaars});
  }

  renderMoestuin(){

    let grid = [];
    let {rijen, kolommen} = this.state;

    let aarde;

    let teller = 0;
    for (let i = 0; i < rijen; i++){
      for (let j = 0; j < kolommen; j++){
        teller++;
        aarde= <AardeRegister key={teller}/>;
        grid.push(aarde);
      }
    }

    return grid;
  }

  removeMedeEigenaar(userId){
    let eigenaars = filter(this.state.eigenaars, o => o.id !== userId);
    this.setState({eigenaars});
  }

  renderMedeEigenaars(){
    let {eigenaars} = this.state;
    return eigenaars.map(eigenaar => <MedeEigenaars removeMedeEigenaar={(userId) => this.removeMedeEigenaar(userId)} key={eigenaar.id} {...eigenaar} />);
  }

  render(){
    let {naam, rijen, kolommen, search, user, errors} = this.state;
    let admin = user.user;

    let size = Math.round(184*kolommen);
    let style = {
      width: `${size}px`
    };

    return (
      <div>
        <section className="breadcrumbwrapper">
          <h2 className="hide">breadcrumb</h2>
          <Link className="previous" to="/home">&lt;</Link>
          <ul className="breadcrumblijst">
            <li><Link className="breadcrumbitem" to="/home">Mijn moestuinen</Link></li>
            <li>&lt;</li>
            <li><p className="breadcrumbitem" >Maak een moestuin</p></li>
          </ul>
        </section>
        <main className="maakmoestuin">
          <section className="maakmoestuincontent">
            <div className="maakmoestuinwrapper">
              <header className="moestuinenheader">
                <h2>Maak je eigen moestuin</h2>
              </header>
               <form className="maakmoestuinform" action="#" onSubmit={(e)=>this.onSubmitHandler(e)}method="POST">
                <section className="moestuingegevens">
                  <div className="moestuingegevenswrapper">
                    <div className="moestuingegevenslinks">
                      <h3>Moestuin Gegevens</h3>
                      <div className="moestuinnaamwrapper">
                        <label for="moestuinnaam">Naam van de moestuin</label>
                        <input type="text" name="moestuinnaam"
                               id="moestuinnaam" placeholder="Moestuinnaam"
                               ref="naam" value={naam}
                               onChange={()=>this.onchangeHandler()}/>
                        <p className="error errortop">{errors.naam}</p>
                      </div>
                      <p className="error errortop">{errors.rijen}</p>
                      <p className="error errortop">{errors.kolommen}</p>
                      <div className="moestuindimensies">
                        <div>
                         <label for="moestuinrijen">Rijen: <span className="bold">{rijen}</span></label>
                         <input type="range" name="moestuinrijen"
                                id="moestuinrijen" min="1" max="5"
                                ref="rijen" value={rijen}
                                onChange={()=>this.onchangeHandler()}/>
                        </div>
                        <div>
                          <label for="moestuinkolommen">Kolommen: <span className="bold">{kolommen}</span></label>
                          <input type="range" name="moestuinkolommen" id="moestuinkolommen"
                                 min="1" max="5" value={kolommen}
                                 ref="kolommen" onChange={()=>this.onchangeHandler()}/>
                        </div>
                      </div>
                    </div>
                    <div className="moestuingegevensrechts">
                        <div className="fileUpload">
                          <p className="plusUpload">+</p>
                          <p className="tekstUpload">Voeg een foto toe</p>
                          <input className="moestuinfile" type="file"
                                 name="moestuinfile" id="moestuinfile"
                                 />
                        </div>
                    </div>
                  </div>
                </section>
                <section className="moestuinvisualisatie">
                  <h3 className="moestuinvisualistatietitel">Moestuinvisualistatie</h3>
                  <ul className="moestuinlijst" style={style}>
                    {this.renderMoestuin()}
                  </ul>
                </section>
                <div className="eigenaarswrapper">
                  <section className="eigenaars">
                    <h3 className="eigenaarstitel">Eigenaars</h3>
                    <ul className="eigenaarsoplijsting">
                      <li>
                        <img src={`${basename}/assets/img/${admin.foto}`} width="100" height="100" alt={`${admin.voornaam} ${admin.achternaam}`} />
                        <p>{admin.voornaam}</p>
                      </li>
                      {this.renderMedeEigenaars()}
                    </ul>
                  </section>
                  <section className="addeigenaar">
                    <h3>Voeg een eigenaar toe</h3>
                    <label for="eigenaaremail">Naam mede-eigenaar</label>
                    <div className="addEigenaarAction">
                      <input type="text" name="eigenaaremail"
                      id="eigenaaremail" placeholder="John Doe"
                      ref="search" value={search}
                      onClick={()=>this.showUsers()} autocomplete="off"/>
                      <div className="dropdownformUsers">
                        <div className="dropdown">
                          <ul className="userlijst">
                            {this.renderUsers()}
                          </ul>
                        </div>
                     </div>
                    </div>
                  </section>
                </div>
                <input className="button submitMoestuin" type="submit" name="submit" defaultValue="Maak een moestuin"/>
              </form>
            </div>
          </section>
        </main>
      </div>
    );
  }
}
