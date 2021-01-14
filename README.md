Database is not currently using volume so data is not persistent, command is commented in its dockerfile for easy access.

Verkkosovellus, johon ihmiset voivat lisätä myytäviä tuotteita.

Frontend on tehty create-react-app kirjastolla.

Backend on tehty nodejs-tiedostoilla.

API on REST-pohjainen.

Tietokanta on postreSQL

Kuinka käyttää:

Jotta voit suorittaa paikallisesti, sinulla on oltava docker and docker-compose asennettuna.

Käytä terminaalista vain 'docker-compose up', se kestää noin muutaman minuutin, ennenkuin docker kuvat on rakennettu ja käynnistyneet.

Backend-URL on tällä hetkellä kovakoodattu osoitteeseen http://ocalhost:4000/api

Sovellus on saatavana osoitteesta http://localhost:8080

Olen tehnyt valmiin käyttäjän, kirjautumistiedot sähköposti: testi@hotmail.com, salasana: testi. Sinun pitäisi pystyä kirjautumaan tämän käyttäjän kanssa tai voit luoda oman.

Olen lisännyt tavan lisätä mallitietoja sovellukseen nähdäksesi miltä se näyttää, kun tietokannassa on tuotteita. Napsauttamalla Lisää ilmoitusta.

Avaat lomakkeen tuotteen lisäämiseksi. Jos napsautat "Valitse tiedosto" ja valitset yhden kuvan (vain jpeg hyväksytään toistaiseksi), ja painat 'tee 100 ilmoitusta'

sovellus lisää 100 mallituotetta, jotka sisältävät valokuvan, kolme kertaa. Sitten voit testata tuotelistaa ja sen haku-ominaisuuksia.

Haku toimii vain hakusanan ja sijainnin kanssa, tuotetyyppi otetaan käyttöön tulevaisuudessa. Voit myös lisätä omia tuotteitasi.



ENGLISH:

Web application where people can sell products.

Frontend has been made with create-react-app.

Backend has been made with nodejs.

Application API is REST based.

Database is postreSQL

How to use:

To run locally you need to have docker, and docker compose installed.

From terminal just use docker-compose up, it will take approx couple of minutes to get all containers running.

Backend url is currently hardcoded to http://localhost:4000/api

Application will be available at http://localhost:8080

I have made initdb user with credentials email: testi@hotmail.com, password: testi. You should be able to login with this user, or you can create your own.

I have added a way to add mock data to application to see whats it like when there is data on the database. By clicking "Lisää ilmoitus".

You will open a form to add product. If you click "Valitse tiedosto" and choose one photo (only accepting jpeg for now),

it will add 100 mock products containing that photo times three. Then you will be able to test the productlist with its search and pagination components.

Search is only working with search word and location, type of product will be implemented in the future. You can allways add your own products aswell.

Backend url is currently hardcoded to localhost:4000/api
