
const testText=`One: 'Hi Mary.' Two: 'Oh, hi.'
One: 'How are you doing?'
Two: 'I'm doing alright. How about you?'
    One: 'Not too bad. The weather is great isn't it?'
    Two: 'Yes. It's absolutely beautiful today.'
One: 'I wish it was like this more frequently.'
Two: 'Me too.'
One: 'So where are you going now?'
Two: 'I'm going to meet a friend of mine at the department store.'
One: 'Going to do a little shopping?'
Two: 'Yeah, I have to buy some presents for my parents.'
One: 'What's the occasion?'
    Two: 'It's their anniversary.'
One: 'That's great. Well, you better get going. You don't want to be late.'
Two: 'I'll see you next time.'
One: 'Sure. Bye.'`;

document.querySelector("#ta1").value=testText;
document.querySelector("#ta2").value=testText;


class rFile{
  
  constructor(input,nta){
    this.input = input;
    this.ta = nta;
  }
  
  getFile2Ta(input,nta){
    let file = input.files[0];
    //console.log('files', files);
    //alert(`File name: ${file.name}`); 
    //alert(`Last modified: ${file.lastModified}`); 

    let reader = new FileReader();

    reader.readAsText(file);
    const block = document.querySelector('.f2');

    reader.onload = function() {
      console.log(reader.result);
      //block.innerHTML=reader.result;
      document.querySelector("#ta"+nta).value=reader.result;
    };

    reader.onerror = function() {
      console.log(reader.error);
    };
  }

}


class regOper {

  constructor(nta){
    this.ta = nta;
  }

  repl(){
    
    //const form = document.querySelector('.form3');
    let t=document.querySelector("#ta"+this.ta).value;
    
      //t=t.replaceAll("'",'"');
      //t=t.replaceAll(/'\s{1}/gi,'"');

    if (this.ta==1){  
      t=t.replace(/'/gi, '"');
    }
        
    if (this.ta==2){  
      t=t.replace(/\s'{1}/gim,' "');
      t=t.replace(/\.'{1}/gim,'."');
      t=t.replace(/\?'{1}/gim,'?"');
    }

      //t=t.replaceAll( /'/gi, '"');

      document.querySelector("#ta"+this.ta).value=t;
     // const block = document.querySelector('.f2');
     // block.innerHTML=t;

   return true;
  }

}



class msgForm {
   constructor( clForm='.form3', msg='Сообщение отправлено', arrEl=[], arrReg=[], arrTitle=[] ) {
     this.clForm=clForm;
     this.msg=msg;
     this.arrEl=arrEl;
     this.arrReg=arrReg;
     this.arrTitle=arrTitle;
   }

   validateAndSend(){
    let  rez=true;
    let e1=null;
    let e2=null;
    let re=null;
    const form   = document.querySelector(this.clForm);
    for(let i=0; i<this.arrEl.length; i++){
        e1 = document.getElementById(this.arrEl[i]).value;
        e2 = document.getElementById(this.arrEl[i]);
        re = new RegExp(this.arrReg[i]);
        if (re.test(e1)) {
          //alert(this.arrTitle[i]+" ok input");
          e2.style.outline = "black solid 1px";
        }
        else {
            alert(this.arrTitle[i]+" bad input");
            e2.style.outline = "red solid 3px";
            rez= false;
        }
      }

      if(rez) { 
        alert(this.msg);
        form.submit();
      }
    return rez; 
  }

}


  const clearForm = ()=>{
    
    const e2 = document.getElementById("i2");
    e2.style.outline = "black solid 1px";
    e2.value = '';

    const t2 = document.getElementById("i3");
    t2.style.outline = "black solid 1px";
    t2.value='';
    
    const n2 = document.getElementById("i1");
    n2.style.outline = "black solid 1px";
    n2.value='';

    const ta3 = document.getElementById("ta3");
    ta3.value='';

    document.getElementById('pri').value = '1';

  }

  
function showFile(input,nta) {
       let v= new rFile(input,nta);
       v.getFile2Ta(input,nta);
  }

function p1(nta) {
    let v= new regOper(nta);
    v.repl();
}
  
function validate(){

  //let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;   // емаил
  //let re = /^my+([\.-]?\w+)@mail(\.ru{1})$/gmi                // myanymail@mail.ru  my.anymail@mail.ru my-anymail@mail.ru
  //let re = /^my+([\.-]?mail)@mail(\.ru{1})$/gmi               //mymail@mail.ru  my.mail@mail.ru my-mail@mail.ru

   const r2=new RegExp(/^my+([\.-]?\w+)@mail(\.ru{1})$/);   //my.anymail@mail.ru
   const r3=new RegExp(/^\+7\(\d{3}\)\d{3}-\d{4}$/);        //+7(000)000-0000
   const r1=new RegExp(/^[a-zA-Zа-яА-ЯёЁ]+$/);              //только буквы

   let f=new msgForm('.form3','Сообщение отправлено',['i2','i3','i1'],[r2,r3,r1], ['Емаил','Телефон','Имя']);
   f.validateAndSend();
}

const clearTxtArea = (ta,inpf) =>{
  document.querySelector('#'+ta).value=''; 
  document.querySelector('#'+inpf).value='';
}


