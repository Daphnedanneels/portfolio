'use strict';

import React, {Component, PropTypes} from 'react';
import {basename} from '../globals';
import {Link} from 'react-router';
import {getMoestuinDetail} from '../api/moestuinen.js';
import {AardeDetail, PlantenForm, DetailPerceel} from '../components/';
import {getPlanten} from '../api/planten.js';
import {updatePercelen, getPercelenByMoestuin} from '../api/percelen.js';
import {selectAllByMoestuin} from '../api/users.js';
import token from '../auth/token';
//import token from '../auth/token';

//renderRole is een functie die de rol netjes omzet
//import renderRole from '../util/renderRole';

export default class Detail extends Component{

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props, context){
    super(props, context);
    this.state = {
      moestuin: '',
      moestuinDetailFetched: false,
      percelen: '',
      percelenFetched: false,
      users: '',
      usersFetched: '',
      admin: token.content(),
      planten: '',
      plantenFetched: false,
      selectedPerceel: '',
      selectedPlant: '',
      errors: ''
    };
  }

  componentDidMount(){
    this.fetchMoestuin();
    this.fetchPlanten();
  }

  fetchMoestuin(){
    getMoestuinDetail(this.props.params.id)
    .then(moestuin =>{
      this.setState({moestuin, moestuinenFetched: true});
    })
    .then(()=>{
      this.fetchPercelen();
    })
    .then(()=>{
      this.fetchUsers();
    });
  }

  fetchUsers(){
    selectAllByMoestuin(this.state.moestuin.id)
    .then(data=>{
      this.setState({users: data, usersFetched: true});
    });
  }

  fetchPercelen(){
    getPercelenByMoestuin(this.state.moestuin.id)
    .then(data=>{
      this.setState({percelen: data, percelenFetched: true});
    });
  }

  fetchPlanten(){
    getPlanten()
    .then(planten =>{
      this.setState({planten, plantenFetched: true});
    });
  }

  showUsers(){

    let eigenaarsEmail = document.querySelector('#eigenaaremail');
    let dropdownFormUsers = document.querySelector('.dropdownformUsers');

    eigenaarsEmail.addEventListener('input', ()=>{
      dropdownFormUsers.style.display='block';
    });

    eigenaarsEmail.addEventListener('blur', ()=>{
      dropdownFormUsers.style.display='none';
    });
  }

  showInsert(props){
    //log van de props die in de state gestoken worden
    this.setState({selectedPerceel: props});

    //visible maken
    let insertTab = document.querySelector('.dropdownformwrapper');
    insertTab.style.display = 'flex';

    //selected tonen
    let groenten = document.querySelectorAll('.groente>label');
    [].forEach.call(groenten, groente => {
      groente.addEventListener('click', ()=>{

        [].forEach.call(groenten, groentenLabel => {
          groentenLabel.style.backgroundColor = '#F7F7F7';
          groentenLabel.querySelector('span').style.color = '#3D3F40';
        });

        groente.style.backgroundColor = '#66DB52';
        groente.querySelector('span').style.color = 'white';
      });
    });
  }

  showStatus(props){
    this.setState({selectedPlant: props});

    let detailPerceelVenster = document.querySelector('.oogsttijdwrapper');
    detailPerceelVenster.style.display = 'flex';
  }

  deletePlant(props){
    let data = {
      perceel_id: props.percelen_id,
      plant_id: props.plant_id,
      action: 'delete'
    };

    updatePercelen(data)
    .then((updated)=>{
      this.setState({percelen: this.setPerceelState(updated)});
    })
    .then(()=>{
      this.closeItem('', 'oogsttijdwrapper');
    })
    .catch(phpErrors =>{
      this.setState({ errors: phpErrors});
    });
  }

  setPerceelState(updated){

    let {percelen} = this.state;

    let teller = 0;
    let newPercelen = [];
    [].forEach.call(percelen, perceel=>{
      if (perceel.percelen_id === updated.percelen_id){
        perceel = updated;
      }
      newPercelen.push(perceel);
      teller++;
    });

    return newPercelen;
  }

  updatePerceel(data){

    updatePercelen(data)
    .then((updated)=>{
      this.setState({percelen: this.setPerceelState(updated)});
    })
    .then(()=>{
      this.closeItem('', 'dropdownformwrapper');
    })
    .catch(phpErrors =>{
      this.setState({ errors: phpErrors});
    });
  }

  renderPercelen(){

    let {kolommen, rijen} = this.state.moestuin;
    let {percelen, percelenFetched} = this.state;

    if (percelenFetched){

      let grid = [];
      let aarde;
      let teller = -1;

      for (let i = 0; i < parseInt(rijen); i++){
        for (let j = 0; j < parseInt(kolommen); j++){
          teller++;
          aarde= <AardeDetail key={percelen[teller].percelen_id} {...percelen[teller]} showStatus={(props)=>this.showStatus(props)} showInsert={(props)=>this.showInsert(props)}/>;
          // aarde = "lol";
          grid.push(aarde);
        }
      }
      return grid;
    }
  }

  closeItem(e, item){

    if(e){
      e.preventDefault();
    }

    let venster = document.querySelector(`.${item}`);
    venster.style.display = 'none';

    if(item === 'dropdownformwrapper'){
      let groenten = document.querySelectorAll('.groente>label');
      [].forEach.call(groenten, groente => {
        groente.style.backgroundColor = '#F7F7F7';
        groente.querySelector('span').style.color = '#3D3F40';
      });
    }
  }

  render(){

    let {naam} = this.state.moestuin;

    let {kolommen} = this.state.moestuin;

    let size = Math.round(184*kolommen);
    let style = {
      width: `${size}px`
    };

    let {user} = this.state.admin;

    return (
      <div>
      <section className="breadcrumbwrapper">
        <h2 className="hide">Breadcrumb</h2>
        <Link to="/home" className="previous" >&lt;</Link>
        <ul className="breadcrumblijst">
          <li><Link className="breadcrumbitem" to="/home">Mijn moestuinen</Link></li>
          <li>></li>
          <li><p className="breadcrumbitem">{naam}</p></li>
        </ul>
      </section>
      <main className="mijnmoestuin">
        <section className="mijnmoetuinwrapper">
          <PlantenForm planten={this.state.planten} updatePerceel={(data)=>this.updatePerceel(data)} closeItem={(e, item)=>this.closeItem(e, item)} selectedPerceel={this.state.selectedPerceel} plantenFetched={this.state.plantenFetched}/>
          <DetailPerceel closeItem={(e, item)=>this.closeItem(e, item)} selectedPlant={this.state.selectedPlant} deletePlant={(props) => this.deletePlant(props)}/>
          <header className="moestuinenheader">
            <h2>{naam}</h2>
          </header>
          <div className="mijntuinoverzicht" >
            <section className="tuin" >
              <h3 className="hide">Tuin</h3>
              <ul className="moestuinlijst" style={style}>
               {this.renderPercelen()}
              </ul>
            </section>
            <section className="mijnmoestuingeigenaars">
              <h3 className="hide">Eigenaars</h3>
              <div className="addeigenaar">
                <label for="eigenaaremail">Naam mede-eigenaar</label>
                <div className="addEigenaarAction">
                <input type="text" name="eigenaaremail" autocomplete="off" id="eigenaaremail" onClick={()=>this.showUsers()}placeholder="John Doe"/>
                <form className="dropdownformUsers" action="#" method="POST">
                  <div className="dropdown">
                    <ul className="userlijst">
                      <li className="userinlijst">
                        <input type="radio" name="user" id="1" defaultValue="1"/>
                        <label for="1">
                          <img width="50" height="50" src={`${basename}/assets/img/twitter.jpg`} alt="jonas devacht"/>
                          <span className="labelnaam">Jonas Devacht</span>
                        </label>
                      </li>
                      <li className="userinlijst">
                        <input type="radio" name="user" id="2" defaultValue="2"/>
                        <label for="2">
                          <img width="50" height="50" src={`${basename}/assets/img/twitter.jpg`} alt="jonas devacht"/>
                          <span className="labelnaam">Joyce Devacht</span>
                        </label>
                      </li>
                      <li className="userinlijst">
                        <input type="radio" name="user" id="3" defaultValue="3"/>
                        <label for="3">
                          <img width="50" height="50" src={`${basename}/assets/img/twitter.jpg`} alt="jonas devacht"/>
                          <span className="labelnaam">Jonas Devacht</span>
                        </label>
                      </li>
                      <li className="userinlijst">
                        <input type="radio" name="user" id="4" defaultValue="4"/>
                        <label for="4">
                          <img width="50" height="50" src={`${basename}/assets/img/twitter.jpg`} alt="jonas devacht"/>
                          <span className="labelnaam">Jonas Devacht</span>
                        </label>
                      </li>
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
                  <li className="mijnmoestuineigenaarsItem noAdmin">
                    <Link className="removeuser" to="removeuser?user_id=1&moestuin_id=1"><span>-</span></Link>
                    <figure>
                      <img src={`${basename}/assets/img/twitter.jpg`} width="100" height="100" alt="jonas"/>
                      <figcaption>JonasDevacht</figcaption>
                    </figure>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </section>
      </main>
      </div>
    );
  }
}
