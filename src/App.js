import './App.css';
import React from 'react';
import Snowfall from 'react-snowfall';

function App() {

  //upisujem vrijednosti iz handle-ova
  const [noviZapis, setNoviZapis] = React.useState({
    ime:"",
    telefon:""
  });

// podatke koje dobijem razdvaja, za ime i telefon, imenaIzStoragea: kljuc, telefonIzStoragea: value
  const [getPodaci, setGetPodaci] = React.useState({
    imenaIzStoragea:[],
    telefoniIzStoragea:[]
  });

  //ako je stavka dodaata bice true, i "okinuce" useEffect da ucita tu stavku i da je prikaze
  const [novaStavkaDodata, setNovaStavkaDodata] = React.useState(false);

  //uzima vrijednost iz input polja za ime i upisuje u state
  //ovde sam rekao uzmi mi stari state i dodaj mi novu vrijednost
  const handleIme = (event) =>{
      setNoviZapis({...noviZapis,  ime:event.target.value,})
  };

  const handlePrezime = (event) =>{
    setNoviZapis({...noviZapis, telefon:event.target.value});
  }

  //dodaj mi novi zapis u local storage
  function dodajNoviZapis(){
    var poljeIme = document.querySelector("#ime");
    var poljeTelefon = document.querySelector("#telefon");

    //polja ne smiju biti prazna
    if((poljeIme.value == "" || poljeIme.value === null) || (poljeTelefon.value == "" || poljeTelefon.value === null)){
      alert("Polje ime ili polje telefon je/su prazno/prazni")
    }
    else if(localStorage.length >= 5){
      alert("Unijeli ste maksimalan broj stavki u imenik.")

    }
    else{
    //ako je sve u redu, dodaj mi stavku u local storage
    localStorage.setItem(noviZapis.ime,JSON.stringify(noviZapis.telefon));
    alert("Dodali ste novu stavku u imenik.")

    //ocisti mi input polja
    poljeIme.value = "";
    poljeTelefon.value = "";

    setNovaStavkaDodata(true)
    }
  }
  
  //da bi mi se pokrenuo prikaz imenika svaki put kada dodam novu stavku i kad je novaStavkaDodata === true
 React.useEffect(()=>{
    //napravim niz, podatke koje dobijem prodjem kroz njih for petljom i upisem u niz, a potom smjestim u state
  
      const nizZaImena = [];
      const nizZaTelefone = [];
     if(localStorage.length > 0){
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        nizZaImena.push(key);
        nizZaTelefone.push(JSON.parse(localStorage.getItem(key)));
        setGetPodaci({...getPodaci, imenaIzStoragea:nizZaImena, telefoniIzStoragea:nizZaTelefone})
       
        }
     }
     else{
       setGetPodaci({...getPodaci, imenaIzStoragea: "", telefoniIzStoragea:""})
     }
        setNovaStavkaDodata(false);
 },[novaStavkaDodata === true]);

const izbrisiSve = () =>{
  localStorage.clear();
  setNovaStavkaDodata(true);
  alert("Stavke iz imenika su izbrisane.")
  
}
//ovde prosledim id od button-a izbrisi
const izbrisiPojedinacno = (id) =>{
  localStorage.removeItem(id)
  setNovaStavkaDodata(true);
  alert("Stavka je uspjesno izbrisana.")
}

 
  return (
    // Tailwind - koristim za CSS stilizaciju
    <div className="bg-primary-background min-h-screen min-w-full ">
      {/* Snowfall npm paket za prikaz animacije snijega */}
      <Snowfall />
      <div className="flex flex-row justify-center pt-28">
      <div className="border-2 border-blue-400 h-72 rounded-lg p-4 mr-12 bg-white">
        <h3 className="text-3xl font-bold border-b-2 border-blue-400 text-blue-500">Imenik</h3>
        <div className="flex flex-row mt-2">
         <div className="mr-16">
          <h5 className="text-lg font-bold text-blue-400">Ime</h5>

         {!!getPodaci && !!getPodaci.imenaIzStoragea && getPodaci.imenaIzStoragea.map((imena, index)=>{
           return(
             <p className="text-blue-400 my-1 justify-start">{imena}</p>
           );
         })} 
        
         </div>
         <div>
           <h5 className="text-lg font-bold text-yellow-400">Broj telefona</h5>
           {!!getPodaci && !!getPodaci.telefoniIzStoragea && getPodaci.telefoniIzStoragea.map((telefoni, index)=>{
           return(
             <div className="flex flex-row my-1 justify-end">
              <p className="text-yellow-400 mr-4">{telefoni}</p>
              
             </div>
           );
         })} 
         </div>
         <div className="flex flex-col ml-16">
         <h5 className="text-lg font-bold text-red-400">Brisanje</h5>
         {!!getPodaci && !!getPodaci.imenaIzStoragea && getPodaci.imenaIzStoragea.map((imena, index)=>{
           return(
             
            <button id={imena} className="border-2 border-yellow px-1 rounded-lg bg-red-500 text-white" onClick={(e)=>izbrisiPojedinacno(e.target.id)}>Izbrisi</button>
           );
         })} 
         </div>
        </div>
        <button className="bg-red-500 font-semibold text-white py-1 w-60 rounded-lg" onClick={izbrisiSve}>Izbrisi sve</button>
      </div>
      <div className="border-2 rounded-lg p-5 border-blue-400  ml-12 bg-white">
        <h3 className="text-3xl font-bold text-red-500 mb-3 border-b-2 border-red-400">Unos novog zapisa</h3>
        <div className="flex flex-col mt-2">
        <label className="mb-3 flex flex-col font-semibold text-blue-500">
          Ime:
          <input id="ime" type="text" className="border-2 border-blue-500 rounded-lg p-1" size={20} onChange={handleIme}/>
        </label>
        <label className="flex flex-col font-semibold text-blue-500">
          Broj telefona:
          <input id="telefon" type="text" className="border-2 border-blue-500 rounded-lg p-1" size={20} onChange={handlePrezime}/>
        </label>
        <div className="flex justify-end mt-4">
          <button className="border-2 w-64 rounded-lg font-semibold border-blue-500 bg-blue-500 text-white py-1" onClick={dodajNoviZapis}>Dodaj</button>
        </div>
        
        </div>
      </div>
      </div>
      
    </div>
  );
}

export default App;
