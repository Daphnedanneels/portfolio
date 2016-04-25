<section class="breadcrumbwrapper">
  <h2 class="hide">breadcrumb</h2>
  <a class="previous" href="#">&lt;</a>
  <ul class="breadcrumblijst">
    <li><a class="breadcrumbitem" href="#">Registreer</a></li>
  </ul>
</section>
<main class="registreer">
  <header class="moestuinenheader">
    <h2>Maak een account</h2>
  </header><!-- /header -->
  <div class="registreerwrapper">
  <form class="registreerform" action="#" method="POST">
    <div class="avatarFileUpload">
      <p class="plusFileUpload">+</p>
      <p class="tekstFileUpload">Upload een profielfoto</p>
      <input class="avatarFile" type="file" name="avatarFile" id="avatarFile"/>
    </div>
    <section class="persoonlijkeGegevens">
      <h3>Persoonlijke gegevens</h3>
      <div class="voornaaminput">
        <label for="voornaam">Voornaam</label>
        <input type="text" placeholder="John" name="voornaam" id="voornaam" />
      </div>
      <div class="achternaaminput">
        <label for="achternaam">Achternaam</label>
        <input type="text" placeholder="Doe" name="achternaam" id="achternaam" />
      </div>
    </section>
    <section class="inlogGegevens">
      <h3>Inlog gegevens</h3>
      <div class="emailinput">
        <label for="email">E-mail adres</label>
        <input type="email" placeholder="john.doe@gmail.com" name="email" id="email"/>
      </div>
      <div class="passwordinput">
        <label for="password">Wachtwoord</label>
        <input type="password" placeholder="*******" name="password" id="password"/>
      </div>
    </section>
    <input class="button" type="submit" name="submit" value="Maak een account"/>
  </form>
  </div>
</main>
