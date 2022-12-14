# ether-roll
![image](https://user-images.githubusercontent.com/80633152/207639138-6122c5fb-0ff9-4f56-940f-5aad72fd8a6b.png)

## Programa
Sukurtas puslapis, skirtas žaisti su savo turima ethereum valiuta panaudojant Web3 technologijas.

## Programos paleidimas
- git clone https://github.com/Matas-V/ether-roll.git
- cd ether-roll/gambling
- paleisti komandą *npm run dev* (Front-end part)
- nusikopijuoti kontrakto kodą iš ./solidity/contracts/Roulette.sol ir panaudojant REMIX IDE dislokuoti (deploy)
- Pasileisti Ganache įrankį bei pasirinkti REMIX IDE provaiderį - *Ganache provider*
- Nusikopijuoti kontrakto adresą iš REMIX IDE bei jį įkelti į ./gambling/src/web3Provider.js failą
- Toje pačioje lokacijoje ./gambling/src/web3Provider.js taip pat reikalingas manager adresas, kuris yra pirmoji paskyra iš Ganache
- Lets go gamble now!

## Naudoti įrankiai:
* React
* Typescript
* Solidity
* Remix IDE
* Ganache
* Material-UI

## Išmaniosios sutarties Roulette aprašymas
- Išmanioje sutartyje gali dalyvauti daug dalyvių, tačiau visados turi sudaryti bent du dalyviai, t.y. sutarties sukūrėjęs - manager bei paprastas žaidėjas - player.
- Manager (bankas) sukuria sutartyje ir į ją prideda laimėjimams išmokėti skirtų Ethereum.
- Tuomet Dalyviai privalo prisijungti bei save taip "identifikuoti"
- Kai įvyksta prisijungimas, žaidėjams leidžiasi įsidėti savo Ethereum žaidimui.
- Turint Ethereum galima pradėti žaisti - atlikti statymus ant pasirinktos spalvos: raudonos, mėlynos ar žalios.
- Užbaigti žaidimo raundą (išsukti ruletę) gali tik jos sukūrėjęs, o tai atlikus yra parodoma išridenta spalva bei paskirstomi laimėjimai žaidėjams.
- Žaidėjui nusprendus nebe žaisti daugiau, jis turi teisę išsiimti savo turimą Ethereum likutį.

## Testavimas (truffle test komanda)
- Buvo sukurti unit testai kontraktui patikrinti:<br/><br/>
![image](https://user-images.githubusercontent.com/80633152/207638767-8ce98c5f-6c69-44dc-a37e-391d41915a84.png)
