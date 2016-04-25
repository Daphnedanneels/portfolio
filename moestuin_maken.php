<section class="breadcrumbwrapper">
  <h2 class="hide">breadcrumb</h2>
  <a class="previous" href="#">&lt;</a>
  <ul class="breadcrumblijst">
    <li><a class="breadcrumbitem" href="#">Mijn moestuinen</a></li>
    <li>></li>
    <li><a class="breadcrumbitem" href="#">Maak een moestuin</a></li>
  </ul>
</section>
<main class="maakmoestuin">
  <section class="maakmoestuincontent">
    <div class="maakmoestuinwrapper">
      <header class="moestuinenheader">
        <h2>Maak je eigen moestuin</h2>
      </header><!-- /header -->
       <form class="maakmoestuinform" action="#" method="POST">
        <section class="moestuingegevens">
          <div class="moestuingegevenswrapper">
            <div class="moestuingegevenslinks">
              <h3>Moestuin Gegevens</h3>
              <div class="moestuinnaamwrapper">
                <label for="moestuinnaam">Naam van de moestuin</label>
                <input type="text" name="moestuinnaam" id="moestuinnaam" placeholder="Moestuinnaam"/>
              </div>
              <div class="moestuindimensies">
                <div>
                 <label for="moestuinrijen">Rijen: <span class="bold">5</span></label>
                 <input type="range" name="moestuinrijen" id="moestuinrijen" min="1" max="10" value="5"/>
                </div>
                <div>
                  <label for="moestuinkolommen">Kolommen: <span class="bold">5</span></label>
                  <input type="range" name="moestuinkolommen" id="moestuinkolommen" min="1" max="10" value="5"/>
                </div>
              </div>
            </div>
            <div class="moestuingegevensrechts">
              <div class="fileUpload">
                <p class="plusUpload">+</p>
                <p class="tekstUpload">Voeg een foto toe</p>
                <input class="moestuinfile" type="file" name="moestuinfile" id="moestuinfile" />
              </div>
            </div>
           </div>
         </section>
         <section class="moestuinvisualisatie">
           <h3 class="moestuinvisualistatietitel">Moestuinvisualistatie</h3>
           <ul class="moestuinlijst">
             <li>
               <a class="plot" href="#">
                 <img width="164" height="164" src="<?php echo $basePath;?>/assets/icons/aarde.svg" alt="aarde">
               </a>
             </li>
             <li>
               <a class="plot" href="#">
                 <img width="164" height="164" src="<?php echo $basePath;?>/assets/icons/aarde.svg" alt="aarde">
               </a>
             </li>
             <li>
               <a class="plot" href="#">
                 <img width="164" height="164" src="<?php echo $basePath;?>/assets/icons/aarde.svg" alt="aarde">
               </a>
             </li>
             <li>
               <a class="plot" href="#">
                 <img width="164" height="164" src="<?php echo $basePath;?>/assets/icons/aarde.svg" alt="aarde">
               </a>
             </li>
             <li>
               <a class="plot" href="#">
                 <img width="164" height="164" src="<?php echo $basePath;?>/assets/icons/aarde.svg" alt="aarde">
               </a>
             </li>
             <li>
               <a class="plot" href="#">
                 <img width="164" height="164" src="<?php echo $basePath;?>/assets/icons/aarde.svg" alt="aarde">
               </a>
             </li>
             <li>
               <a class="plot" href="#">
                 <img width="164" height="164" src="<?php echo $basePath;?>/assets/icons/aarde.svg" alt="aarde">
               </a>
             </li>
             <li>
               <a class="plot" href="#">
                 <img width="164" height="164" src="<?php echo $basePath;?>/assets/icons/aarde.svg" alt="aarde">
               </a>
             </li>
             <li>
               <a class="plot" href="#">
                 <img width="164" height="164" src="<?php echo $basePath;?>/assets/icons/aarde.svg" alt="aarde">
               </a>
             </li>
             <li>
               <a class="plot" href="#">
                 <img width="164" height="164" src="<?php echo $basePath;?>/assets/icons/aarde.svg" alt="aarde">
               </a>
             </li>
           </ul>
         </section>
         <div class="eigenaarswrapper">
          <section class="eigenaars">
            <h3 class="eigenaarstitel">Eigenaars</h3>
            <ul class="eigenaarsoplijsting">
              <li>
                <img src="<?php echo $basePath;?>/assets/img/twitter.jpg" width="100" height="100" alt="avatar">
                <p>Jonas</p>
              </li>
            </ul>
           </section>
           <section class="addeigenaar">
            <h3>Voeg een eigenaar toe</h3>
            <label for="eigenaaremail">Naam mede-eigenaar</label>
            <div class="addEigenaarAction">
            <input type="text" name="eigenaaremail" id="eigenaaremail" placeholder="John Doe"/>
            <button class="button sendEmail" type="button">+</button>
             </div>
           </section>
         </div>
         <input class="button submitMoestuin" type="submit" name="submit" value="Maak een moestuin"/>
       </form>
    </div>
  </section>
</main>

