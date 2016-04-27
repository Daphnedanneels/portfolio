'use strict';

import React, {Component} from 'react';
import {basename} from '../globals';
import token from '../auth/token';
import {MedeEigenaars, UserItem, NoUserItem} from '../components/';
import {isEmpty} from 'lodash';

export default class AdminEigenaars extends Component{

  constructor(props, context){
    super(props, context);
    this.state = {
      search: ''
    };
  }

  showUsers(){

    let eigenaarsEmail = document.querySelector('#eigenaaremail');
    let dropdownFormUsers = document.querySelector('.dropdownformUsers');

    eigenaarsEmail.addEventListener('input', ()=>{
      dropdownFormUsers.style.display='block';

      let {search} = this.refs;
      this.setState({
        search: search.value
      });

      this.props.fetchAllUsers(this.refs.search.value);

    });

    dropdownFormUsers.addEventListener('click', ()=>{
      dropdownFormUsers.style.display='none';
      this.setState({search: ''})
    });

    document.querySelector('body').addEventListener('click', ()=>{
      dropdownFormUsers.style.display='none';

    });

  }

  /*
  --LIJST MET ALLE EVENTS--

   *Mouse
      click
      dblclick
      mousedown
      mouseup
      mouseover
      mouseout
      mousemove

   *Keyboard
      input
      keydown
      keypress
      keyup

   *Form
      submit
      change
      input

   *User Interface
      load
      unload
      error
      resize
      scroll

  */

  renderMedeEigenaars(){
    let {medeEigenaars} = this.props;
    return medeEigenaars.map(medeEigenaar => <MedeEigenaars moestuin={this.props.moestuin} removeMedeEigenaar={(userId) => this.props.removeMedeEigenaar(userId)} key={medeEigenaar.id} {...medeEigenaar} />);
  }

  renderAllUsers(){
    let {allUsers} = this.props;

    if (!isEmpty(allUsers)){
      return allUsers.map(user => <UserItem pushEigenaarIntoUsers={(usertje)=>this.props.pushEigenaarIntoUsers(usertje)} insertOnClick={true} key={user.id} {...user} />);
    }else{
      return <NoUserItem/>;
    }

  }

  render(){


    let user = token.content().user;
    let {search} = this.state;


    return (
     <section className="mijnmoestuingeigenaars">
        <h3 className="hide">Eigenaars</h3>
        <div className="addeigenaar">
          <label for="eigenaaremail">Naam mede-eigenaar</label>
          <div className="addEigenaarAction">
          <input type="text" name="eigenaaremail" autocomplete="off" id="eigenaaremail"
                 onClick={()=>this.showUsers()} placeholder="John Doe"
                 ref="search" value={search}/>
          <form className="dropdownformUsers" action="#" method="POST">
            <div className="dropdown">
              <ul className="userlijst">
                {this.renderAllUsers()}
              </ul>
            </div>
           </form>
           </div>
        </div>
        <div className="eigenaarwrapper">
          <ul className="mijnmoestuineigenaars">
            {this.renderMedeEigenaars()}
          </ul>
        </div>
      </section>
    );
  }
}
