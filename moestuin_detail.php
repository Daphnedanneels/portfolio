<section class="breadcrumbwrapper">
  <h2 class="hide">Breadcrumb</h2>
  <a class="previous" href="#">&lt;</a>
  <ul class="breadcrumblijst">
    <li><a class="breadcrumbitem" href="#">Mijn moestuinen</a></li>
    <li>></li>
    <li><a class="breadcrumbitem" href="#">Jonas' moestuin</a></li>
  </ul>
</section>
<main class="mijnmoestuin">
  <section class="mijnmoetuinwrapper">
    <div class="dropdownformwrapper">
      <form class="dropdownform" action="#" method="POST">
         <div class="dropdown">
            <div class="dropdowntop">
              <p>Plant een groente.</p>
              <a class="closeIcon" href="#">+</a>
            </div>
            <ul class="groentenlijst">
             <li class="groente">
              <input type="radio" name="groente" id="ajuin" value="1"/>
              <label for="ajuin">
                <img width="100" height="100" src="<?php echo $basePath;?>/assets/icons/groentenalone/ajuin.svg" alt="ajuin">
                <span class="labelnaam">Ajuin</span>
              </label>
             </li>
             <li class="groente">
              <input type="radio" name="groente" id="auberghine" value="2"/>
              <label for="auberghine">
                <img width="100" height="100" src="<?php echo $basePath;?>/assets/icons/groentenalone/auberghine.svg" alt="auberghine">
                <span class="labelnaam">Auberghine</span>
              </label>
             </li>
             <li class="groente">
              <input type="radio" name="groente" id="broccoli" value="3"/>
              <label for="broccoli">
                <img width="100" height="100" src="<?php echo $basePath;?>/assets/icons/groentenalone/broccoli.svg" alt="broccoli">
                <span class="labelnaam">Broccoli</span>
              </label>
             </li>
             <li class="groente">
              <input type="radio" name="groente" id="champignon" value="4"/>
              <label for="champignon">
                <img width="100" height="100" src="<?php echo $basePath;?>/assets/icons/groentenalone/champignon.svg" alt="champignon">
                <span class="labelnaam">Champignon</span>
              </label>
             </li>
             <li class="groente">
              <input type="radio" name="groente" id="knol" value="5"/>
              <label for="knol">
                <img width="100" height="100" src="<?php echo $basePath;?>/assets/icons/groentenalone/knol.svg" alt="knol">
                <span class="labelnaam">Knol</span>
              </label>
             </li>
             <li class="groente">
              <input type="radio" name="groente" id="komkommer" value="6"/>
              <label for="komkommer">
                <img width="100" height="100" src="<?php echo $basePath;?>/assets/icons/groentenalone/komkommer.svg" alt="komkommer">
                <span class="labelnaam">Komkommer</span>
              </label>
             </li>
             <li class="groente">
              <input type="radio" name="groente" id="paprika" value="7"/>
              <label for="paprika">
                <img width="100" height="100" src="<?php echo $basePath;?>/assets/icons/groentenalone/paprika.svg" alt="paprika">
                <span class="labelnaam">Paprika</span>
              </label>
             </li>
             <li class="groente">
              <input type="radio" name="groente" id="pompoen" value="8"/>
              <label for="pompoen">
                <img width="100" height="100" src="<?php echo $basePath;?>/assets/icons/groentenalone/pompoen.svg" alt="pompoen">
                <span class="labelnaam">Pompoen</span>
              </label>
             </li>
             <li class="groente">
              <input type="radio" name="groente" id="sla" value="9"/>
              <label for="sla">
                <img width="100" height="100" src="<?php echo $basePath;?>/assets/icons/groentenalone/sla.svg" alt="sla">
                <span class="labelnaam">Sla</span>
              </label>
             </li>
             <li class="groente">
              <input type="radio" name="groente" id="wortel" value="10"/>
              <label for="wortel">
                <img width="100" height="100" src="<?php echo $basePath;?>/assets/icons/groentenalone/wortel.svg" alt="wortel">
                <span class="labelnaam">Wortel</span>
              </label>
             </li>
           </ul>
           <div class="buttonwrapper">
             <input class="button" type="submit" name="submit"  value="Planten"/>
           </div>
         </div>
       </form>
    </div>
    <div class="oogsttijdwrapper">
      <div class="oogsttijd">
        <a class="closeIcon" href="#">+</a>
        <div class="oogstijdtitlewrapper">
          <img width="200" height="200" src="<?php echo $basePath;?>/assets/icons/groentenalone/ajuin.svg" alt="ajuin">
          <p>Ajuin</p>
        </div>
        <div class="oogsttijddata">
          <h3>Eigenschappen</h3>
          <div class="watericon">
            <p>Water geven binnen <span class="watertijd">3 uur </span></p>
          </div>
          <div class="status">
            <div class="waternu"></div>
            <div class="watertotaal"></div>
          </div>
          <div class="oogsticon">
            <p>Oogsten binnen <span class="watertijd">3 uur </span></p>
          </div>
          <div class="status">
            <div class="oogstnu"></div>
            <div class="oogsttotaal"></div>
          </div>
        </div>
        <div class="plantbuttons">
          <a class="button waterbutton" href="#water">Water</a>
          <a class="button oogstbutton" href="#water">Oogsten</a>
          <a class="button verwijderbutton" href="#water">Verwijder</a>
        </div>
     </div>
   </div>
    <header class="moestuinenheader">
      <h2>Jonas' moestuin</h2>
    </header>
    <div class="mijntuinoverzicht">
      <section class="tuin">
        <h3 class="hide">Tuin</h3>
        <ul class="moestuinlijst">
         <li class="perceel">
           <a class="plot" href="#">
             <p class="perceelhover">+</p>
             <img width="164" height="164" src="<?php echo $basePath;?>/assets/icons/aarde.svg" alt="aarde">
           </a>
         </li>
         <li class="perceel">
           <a class="plot" href="#">
             <p class="perceelhover">+</p>
             <img width="164" height="164" src="<?php echo $basePath;?>/assets/icons/aarde.svg" alt="aarde">
           </a>
         </li>
         <li class="perceel filledin">
           <a class="plot" href="#">
             <img width="164" height="164" src="<?php echo $basePath;?>/assets/icons/groentenaarde/ajuin.svg" alt="aarde">
              <div class="water">
                <div class="watericon"></div>
                <div class="status">
                  <div class="waternu"></div>
                  <div class="watertotaal"></div>
                </div>
              </div>
           </a>
         </li>
         <li class="perceel">
           <a class="plot" href="#">
             <p class="perceelhover">+</p>
             <img width="164" height="164" src="<?php echo $basePath;?>/assets/icons/aarde.svg" alt="aarde">
           </a>
         </li>
         <li class="perceel">
           <a class="plot" href="#">
             <p class="perceelhover">+</p>
             <img width="164" height="164" src="<?php echo $basePath;?>/assets/icons/aarde.svg" alt="aarde">
           </a>
         </li>
         <li class="perceel">
           <a class="plot" href="#">
             <p class="perceelhover">+</p>
             <img width="164" height="164" src="<?php echo $basePath;?>/assets/icons/aarde.svg" alt="aarde">
           </a>
         </li>
         <li class="perceel">
           <a class="plot" href="#">
             <p class="perceelhover">+</p>
             <img width="164" height="164" src="<?php echo $basePath;?>/assets/icons/aarde.svg" alt="aarde">
           </a>
         </li>
         <li class="perceel">
           <a class="plot" href="#">
             <p class="perceelhover">+</p>
             <img width="164" height="164" src="<?php echo $basePath;?>/assets/icons/aarde.svg" alt="aarde">
           </a>
         </li>
         <li class="perceel">
           <a class="plot" href="#">
             <p class="perceelhover">+</p>
             <img width="164" height="164" src="<?php echo $basePath;?>/assets/icons/aarde.svg" alt="aarde">
           </a>
         </li>
         <li class="perceel">
           <a class="plot" href="#">
             <p class="perceelhover">+</p>
             <img width="164" height="164" src="<?php echo $basePath;?>/assets/icons/aarde.svg" alt="aarde">
           </a>
         </li>
       </ul>
      </section>
      <section class="mijnmoestuingeigenaars">
        <h3 class="hide">Eigenaars</h3>
        <div class="addeigenaar">
          <label for="eigenaaremail">Naam mede-eigenaar</label>
          <div class="addEigenaarAction">
          <input type="text" name="eigenaaremail" id="eigenaaremail" placeholder="John Doe"/>
           <form class="dropdownformUsers" action="#" method="POST">
             <div class="dropdown">
                <ul class="userlijst">
                 <li class="userinlijst">
                  <input type="radio" name="user" id="1" value="1"/>
                  <label for="1">
                    <img width="50" height="50" src="assets/img/twitter.jpg" alt="jonas devacht">
                    <span class="labelnaam">Jonas Devacht</span>
                  </label>
                 </li>
                 <li class="userinlijst">
                  <input type="radio" name="user" id="2" value="2"/>
                  <label for="2">
                    <img width="50" height="50" src="assets/img/twitter.jpg" alt="jonas devacht">
                    <span class="labelnaam">Joyce Devacht</span>
                  </label>
                 </li>
                 <li class="userinlijst">
                  <input type="radio" name="user" id="3" value="3"/>
                  <label for="3">
                    <img width="50" height="50" src="assets/img/twitter.jpg" alt="jonas devacht">
                    <span class="labelnaam">Jonas Devacht</span>
                  </label>
                 </li>
                 <li class="userinlijst">
                  <input type="radio" name="user" id="4" value="4"/>
                  <label for="4">
                    <img width="50" height="50" src="assets/img/twitter.jpg" alt="jonas devacht">
                    <span class="labelnaam">Jonas Devacht</span>
                  </label>
                 </li>
               </ul>
             </div>
           </form>
           </div>
        </div>
        <div class="eigenaarwrapper">
          <ul class="mijnmoestuineigenaars">
            <li class="mijnmoestuineigenaarsItem">
              <figure>
                <img src="<?php echo $basePath;?>/assets/img/twitter.jpg" width="100" height="100" alt="jonas">
                <figcaption>Jonas</figcaption>
              </figure>
            </li>
            <li class="mijnmoestuineigenaarsItem noAdmin">
              <a class="removeuser" href="#"><span>-</span></a>
              <figure>
                <img src="<?php echo $basePath;?>/assets/img/twitter.jpg" width="100" height="100" alt="jonas">
                <figcaption>JonasDevacht</figcaption>
              </figure>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </section>
</main>
