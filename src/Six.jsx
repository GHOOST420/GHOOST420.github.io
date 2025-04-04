import React, { useEffect } from "react";
import { useState } from "react";

function Six(){
const Maltaplaja=[10000,7500,5000,2500,1000,500,300,200,150,100,90,80,70,60,50,40,30,25,20,15,10,9,8,7,6,5,4,3,2,1];
const [tiket,SetTiket]=useState([]);  
const [UplaceniTiketi,SetIzvuceneBrojeve]=useState([{brTiketa:0,brojeviTiketa:[],prosliBrojevi:[],obradjenTiket:false}]);
const brojevi=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49];
const [IzvuceniBrojevi,SetIzvucene]=useState({izvuceni:[],trenutni:0,trenutniMaltaplaja:null});
const [NovacKorisnika,SetKes]=useState(5000);


function UplacivanjeTiketa(){

if(tiket.length===6){
   if(UplaceniTiketi[0].brTiketa===0)
   {
        const objTiket={brTiketa:1,brojeviTiketa:tiket,prosliBrojevi:[],obradjenTiket:false}
        SetIzvuceneBrojeve([objTiket]);
        SetKes(prosloStanje=>(prosloStanje-=50))
   }
   else
   {
        const max=UplaceniTiketi.length;
        const objTiket={brTiketa:max+1,brojeviTiketa:tiket,prosliBrojevi:[],obradjenTiket:false}
        SetIzvuceneBrojeve([...UplaceniTiketi,objTiket]);
        SetKes(prosloStanje=>(prosloStanje-=50))
   }
        SetTiket([]);
        var divBroj=[...document.getElementsByClassName("divovi")];
        divBroj.map((div,index)=>{
            div.style.backgroundColor="white";
            //div.classList.add("white-bg");
   })
}
else{alert("Abe nemas 6 broja");}
}

//useEffect(()=>{console.log(IzvuceniBrojevi);},[IzvuceniBrojevi])



useEffect(()=>{

console.log("Uplaceni brojevi su ",UplaceniTiketi);


},[UplaceniTiketi])//stampa uplacene tikete

const IzbaciBroj=(broj)=>{
        
       SetTiket(tiket.filter(broj2=>broj2!=broj));
        console.log(tiket);
}

function PotamniPozadinu(e){
   var ima=false;
   // alert(e.target.innerText);
    //console.log(e.target.style);
    if(tiket.length<6){
                tiket.map((broj,index)=>{
                    if(broj==e.target.innerText)
                    {
                        ima=true;

                    }
                    
                })
                if(!ima){
                    SetTiket([...tiket, e.target.innerText]);
                    e.target.style.backgroundColor="gainsboro";
                }
                else
                {
                   // alert("Vec imate taj broj u tiketu");
                    IzbaciBroj(e.target.innerText);
                    e.target.style.backgroundColor="white";
                    
                }
    }
    else
    {
        tiket.map((broj,index)=>{
            if(broj==e.target.innerText)
            {
                ima=true;

            }
        })
            if(!ima){
                alert("Max je 6 brojeva u tiketu");
            }
            else
            {
               
                IzbaciBroj(e.target.innerText);
                e.target.style.backgroundColor="white";
              
            }
        
        
    }
    
}//Dodavanje broja u tiket i izbacivanje iz njega ,promena pozadine na klik 

useEffect(()=>{
console.log("Brojevi u tiketu su ", tiket);

},[tiket])//stampa kad se promeni tiket


function Sacekaj(){
        return new Promise((finsih)=>{setTimeout(finsih,1000)})
}

async function Algoritam(){
    if(UplaceniTiketi[0].brTiketa!=0){
    const dugme=document.getElementById("pokreni");
    dugme.style.pointerEvents="none";
    dugme.style.backgroundColor="gray";
    var divBroj=[...document.getElementsByClassName("divovi")];
   
        divBroj.map((div,index)=>{
            div.style.pointerEvents="none";
            div.style.backgroundColor="gainsboro";
            //div.classList.add("white-bg");
   })
    
    var niz=new Set();
   while(niz.size<35)
   {
        await Sacekaj(); 
        var broj=Math.floor(Math.random()*48)+1;
        if(!niz.has(broj))
        {
            console.log(broj);
            niz.add(broj);
            ProveraDobitka(broj,niz);
            if(niz.size>=6){
               PromeniCenu(Maltaplaja[niz.size-6]);
               SetIzvucene(proslo=>({izvuceni:[...proslo.izvuceni],trenutni:proslo.trenutni,trenutniMaltaplaja:Maltaplaja[niz.size-6]}))
             console.log(Maltaplaja[niz.size-6]);
            }
        }
       // else{console.log("vec bio");}
        
        
        
   }
   console.log(niz);
}
}
function PromeniCenu(multipla)
{
    UplaceniTiketi.map((tiket,index)=>
   {
     if(!tiket.obradjenTiket){
        if(tiket.prosliBrojevi.length==6)
        {
        console.log(tiket.brTiketa);
        console.log(tiket.prosliBrojevi);
        SetKes(prosloStanje=>(prosloStanje+(50*multipla)))//zagrade zamenjuju return
        tiket.obradjenTiket=true;
        }
     }
 
   })
}

function ProveraDobitka(NoviBroj,set)
{
  

    var nizProslih=[];
    UplaceniTiketi.map((up,index)=>{
       
      let VecProso=false;
      VecProso=up.prosliBrojevi.includes(NoviBroj);
           
      if(!VecProso)
      {
        
        
        SetIzvucene(prevState=>({izvuceni:[...set],trenutni:NoviBroj}));
       
    }
       if(up.prosliBrojevi.length!=6)
       {
                        
              VecProso=up.prosliBrojevi.includes(NoviBroj);
           
              if(!VecProso)
              {
          
                

             
            
             //   console.log(IzvuceniBrojevi.izvuceni,NoviBroj);
                const response =up.brojeviTiketa.includes(NoviBroj.toString());
               // console.log(typeof(NoviBroj.toString()));
               // console.log(response);

                    if(response)
                    {
                        if(up.prosliBrojevi[0]===0){
                            up.prosliBrojevi=[NoviBroj];
                        }
                        else{
                        up.prosliBrojevi.push(NoviBroj);
                        const element= document.getElementById("brTiketaP"+up.brTiketa+NoviBroj);
                        element.style.backgroundColor="yellow";
                        }
                    }

                if(up.prosliBrojevi.length===6)
                {
                    console.log("opaaaaaaaaaaaaaaaaaaaaaa");
                }
                else{}
            }
       }
     
       
    })
 
}

function ResetujBiranje()
{
    const dugme=document.getElementById("pokreni");
    dugme.style.pointerEvents="auto";
    dugme.style.backgroundColor="buttonface";
    var divBroj=[...document.getElementsByClassName("divovi")];
    console.log(divBroj);
        divBroj.map((div,index)=>{
            div.style.pointerEvents="auto";
            div.style.backgroundColor="white";
          
   })
   const obj={brTiketa:0,brojeviTiketa:[],prosliBrojevi:[]};
   SetIzvuceneBrojeve([obj]);
   SetIzvucene({izvuceni:[],trenutni:null,trenutniMaltaplaja:null});
   SetTiket([]);//ovoo
   
}
function Ponovi()
{
    const uplaceniBrojevidiv=[...document.getElementsByClassName("brTiketaP")];
    SetIzvucene({izvuceni:[],trenutni:null,trenutniMaltaplaja:null});
    uplaceniBrojevidiv.map((div,index)=>
    {
        div.style.backgroundColor="white";
    })
    UplaceniTiketi.map((tiket,index)=>
    {
        tiket.prosliBrojevi=[];
        tiket.obradjenTiket=false;
    })
    let brojac=0;
    UplaceniTiketi.map((tiket)=>
    {
        brojac++;
    })
    SetKes(prosloStanje=>(prosloStanje-=brojac*50))
    Algoritam();
    
}

return(
    <div>
        <div className="novac">
            <p>{NovacKorisnika}</p>
        </div>
        <div className="GlavniDiv">
           
            {brojevi.map((p,index)=>{
                return <div className="divovi" id="divovi" key={p} onClick={(event)=>PotamniPozadinu(event)}>{p}</div>
            })}


        </div>

        
        <div className="PrikazTiketa">
            {tiket.map((broj,index)=>{
                return <div className="brojeviSaTiketaP" key={index}><p key={index}>{broj}</p></div>
            })}
        </div>
            <button id="UplatiDugme" onClick={()=>{UplacivanjeTiketa()}}>Uplati</button>

            <div className="OmotacZaUplaceneTikete">
                {
                UplaceniTiketi.map((tiket,index)=>{
                    return <div className="OmotacZaUplacenTiket" key={index}>
                                <p id="ptIKETI" key={index}>{tiket.brTiketa} </p>
                                <div className="omotacZaBrojeveUplacenogTiketa">
                                    {
                                        tiket.brojeviTiketa.map((brojevi,index)=>{
                                            return <div key={brojevi}>
                                                <p className="brTiketaP" id={"brTiketaP"+tiket.brTiketa+brojevi} key={index}>{brojevi}</p> 
                                                
                                                </div>
                                           
                                        })
                                    }
                                </div>
                             
                           </div>
                })
                }
            </div>
            <p>{IzvuceniBrojevi.trenutniMaltaplaja}</p>
            <button id="pokreni" onClick={(()=>Algoritam())}>Pokreni igru</button>
            <button onClick={()=>Ponovi()}>Ponovi</button>
            <button onClick={()=>ResetujBiranje()}>Obrisi Sve</button>

            <p>{IzvuceniBrojevi.trenutni}</p>
            <div className="OmotacZaIzvuceneBrojeve">
                
                {IzvuceniBrojevi.izvuceni.map((trt,index)=>
                {
                    return <div  className="OmotacZaIzvucenBroj" key={index}> 
                        <p className="izbr" key={index+1}>{trt}</p>
                        <p className="izbr" key={index+2}>{index>=5?Maltaplaja[index-5]:""}</p>
                        </div>
                })}

            </div>
    </div>
   
   
)

}


export default Six;