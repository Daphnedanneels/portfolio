'use strict';

import React, {Component, PropTypes} from 'react';
// import {basename} from '../globals';
import {Link} from 'react-router';
import {getMoestuinDetail} from '../api/moestuinen.js';
import {AardeDetail, PlantenForm, DetailPerceel, AdminEigenaars} from '../components/';
import {getPlanten} from '../api/planten.js';
import {updatePercelen, getPercelenByMoestuin} from '../api/percelen.js';
import {selectAllByMoestuin, selectAllMinFilter} from '../api/users.js';
import token from '../auth/token';
import {isEmpty, filter} from 'lodash';
import {deleteMoestuinUsers, insertMoestuinUser} from '../api/moestuinenUsers.js';
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
      errors: '',
      allUsers: '',
      allUsersFetched: false,
      search: ''
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
    })
    .catch(phpErrors =>{
      this.setState({ errors: phpErrors});
    });
  }


  fetchAllUsers(search){

    let searchParams = {};
    searchParams.search = search;

    selectAllMinFilter(searchParams)
    .then(response=>{
      console.log("response",response);

      let usersWithoutAdmin = [];
      if (!isEmpty(response)){
        usersWithoutAdmin = filter(response, o => o.id !== this.state.admin.user.id);
        this.setState({allUsers:usersWithoutAdmin});
        // console.log("length",usersWithoutAdmin.length);
        for (let i = 0; i< usersWithoutAdmin.length; i++) {

          for (let j = 0; j< this.state.users.length; j++) {
            console.log(i);
            console.log("testrender",i, usersWithoutAdmin[i]);
            if(usersWithoutAdmin[i].id === this.state.users[j].id){
              usersWithoutAdmin.splice(i,1);
              this.setState({allUsers:usersWithoutAdmin});
            }
          }
        }

      }


      // this.setState({allUsers:usersWithoutAdmin});
      this.setState({allUsers:usersWithoutAdmin,allUsersFetched: true});
    })
    // .catch(phpErrors =>{
    //   this.setState({ errors: phpErrors});
    // });
  }


  fetchUsers(){
    //hier wil ik alle users bij de moestuin ophalen
    selectAllByMoestuin(this.state.moestuin.id)
    .then(data=>{
      // let users = filter(data, o => o.id !== this.state.admin.user.id);
      this.setState({users:data, usersFetched: true});
    })
    .then(()=>{
      if (this.state.usersFetched){
        this.fetchAllUsers(this.state.search);
      }
    })
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
          grid.push(aarde);
        }
      }
      return grid;
    }
  }

  removeMedeEigenaar(userId){
    let eigenaars = filter(this.state.users, o => o.id !== userId);
    this.setState({users: eigenaars});

    let data = {
      user_id: userId,
      moestuin_id: this.state.moestuin.id
    };


    deleteMoestuinUsers(data)
    .catch(phpErrors =>{
      this.setState({ errors: phpErrors});
    });
  }

  pushEigenaarIntoUsers(user){

    let eigenaars = this.state.users;

    eigenaars.push(user);
    console.log("eigenaars",eigenaars);
    this.setState({users: eigenaars});

    console.log(this.state.users);

    let users = [];
    users.push(user.id);

    let data = {
      users: users,
      moestuin_id: this.state.moestuin.id
    };

    insertMoestuinUser(data)
    .catch(phpErrors =>{
      this.setState({ errors: phpErrors});
    });
  }

  renderAdminPanel(){
    let {user} = this.state.admin;
    let {users, usersFetched, allUsers, allUsersFetched} = this.state;

    if (allUsersFetched && usersFetched){
      return (<AdminEigenaars moestuin={this.state.moestuin} allUsers={allUsers} pushEigenaarIntoUsers={(usertje)=>this.pushEigenaarIntoUsers(usertje)} fetchAllUsers={(search)=>this.fetchAllUsers(search)} medeEigenaars={users} removeMedeEigenaar={userId => this.removeMedeEigenaar(userId)}/>);
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
            {this.renderAdminPanel()}
          </div>
        </section>
      </main>
      </div>
    );
  }
}
