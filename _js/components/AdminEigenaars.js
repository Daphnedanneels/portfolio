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
    });
  }

  renderMedeEigenaars(){
    let {medeEigenaars} = this.props;
    return medeEigenaars.map(medeEigenaar => <MedeEigenaars removeMedeEigenaar={(userId) => this.props.removeMedeEigenaar(userId)} key={medeEigenaar.id} {...medeEigenaar} />);
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

    // console.log(this.props);
    let user = token.content().user;
    let {search} = this.state;
    // console.log(user);

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
            <li className="mijnmoestuineigenaarsItem">
              <figure>
                <img src={`${basename}/assets/img/${user.foto}`} width="100" height="100" alt={user.voornaam}/>
                <figcaption>{user.voornaam}</figcaption>
              </figure>
            </li>
            {this.renderMedeEigenaars()}
          </ul>
        </div>
      </section>
    );
  }
}
