const selectorobj={
    content :$(".container"),
    moves:$(".option .moves"),
    time:$(".option .time"),
    score:$(".option .score"),
    start:$(".option a"),
    board:$(".container .board"),
    win:$(".win")

};
const state ={
    gamest:false,
    totaltime:0,
    totalflips:0,
    flippedcards:0,
    loop:null
};
console.log(selectorobj.content,selectorobj.moves,selectorobj.time,selectorobj.start,selectorobj.win,state.gamest,state.totaltime,state.flippedcards
    ,state.loop,state.totalflips)
const suffle=(array)=>{
    const clonearray=[...array];
   
    for (let i=clonearray.length-1; i>0; i--){
        const randomindex=Math.floor(Math.random()*(i+1));
           const org=clonearray[i];
           clonearray[i]=clonearray[randomindex];
           clonearray[randomindex]=org;
    }
    return clonearray;
};
const pickrandom=(array,items)=>{
    const clonearray=[...array];
    let randompics=[];
    for (let i=0;i<items;i++){
           const randomindex=Math.floor(Math.random(0,1,2,3,4)*clonearray.length);
           randompics.push(clonearray[randomindex]);
           randompics.splice(randomindex,1);
    } 
    //jk      
    if(randompics.length===8){
        return randompics;
    }else{
       return randompics=["🍔","🍕","🍿","🍟","🌭","🍗","🍠","🥪"];
    }
    
};


const generategame=()=>{
    const dimension=selectorobj.board.attr("data-dimension")
    console.log(dimension);
    if(dimension%2 !=0){
        throw new Error("enter even")
 }
    const emoj=["🍔","🍕","🍿","🍟","🌭","🍗","🍠","🥪","🍩","🍦"];
    console.log(emoj);
    const picks=pickrandom(emoj, ( (dimension ) + (dimension)  ) / 2);
    console.log(picks)

    const items=suffle([...picks, ...picks]);
    
    console.log(items.length);
    if(items.length === 16){
    const cards=`
    <div class="board" style="grid-template-columns:repeat(${dimension},auto)">

    ${items.map(item =>
        
       `
       <div class="card">
         <div class="card-open"></div>
         <div class="card-close">${item}</div>
       </div>
       `).join('')}
        </div>
    `
    
    const parser=new DOMParser().parseFromString(cards,"text/html");
    selectorobj.board.replaceWith(parser.querySelector(".board"))
    }
    //jk
    else{
        alert("refresh untill get elements");
        
    }

};
startgame=()=>{
    state.gamest=true;
    selectorobj.start.addClass('disable');
    state.loop=setInterval(()=>{
          state.totaltime++;
          selectorobj.moves.text(`${state.totalflips} moves`);
          selectorobj.time.text(`Time ${state.totaltime} sec`);
          console.log(state.flippedcards,state.totalflips,state.totaltime);
    },1000)
}
const flipback=()=>{
    document.querySelectorAll(".card:not(.matched)").forEach(card =>{
       card.classList.remove('flipped');
    });
    state.flippedcards=0;
}
const flipcard= c =>{
    state.flippedcards++;
    state.totalflips++;
    if(!state.gamest){
        startgame()
    }
    if(state.flippedcards <= 2){
        c.classList.add("flipped")
    }
    if(state.flippedcards === 2){
        const flippedcards=document.querySelectorAll('.flipped:not(.matched)');
            if(flippedcards[0].innerText===flippedcards[1].innerText){
                flippedcards[0].classList.add('matched');
                flippedcards[1].classList.add('matched');
            }
            setTimeout(()=>{
                flipback();
            },1000)
}
    if(!document.querySelectorAll('.card:not(.flipped)').length){
        setTimeout(()=>{
            selectorobj.content.addClass('flipped')
            selectorobj.win.html(`
                <span class="win-text">You Won! <br>with <span class="highlight">${state.totalflips}</span>
                moves <br> under <span class="highlight">${state.totaltime}</span> seconds
                </span>`);
            
            clearInterval(state.loop)
        },1000)
    }
    
}
const addclick=()=>{
    document.addEventListener("click",(event)=>{
        const eventtarget=event.target;
        const eventparent=eventtarget.parentElement;
        console.log(eventtarget);
        console.log(eventparent);
        // console.log(state.flippedcards,state.totalflips,state.totaltime);
        if(eventtarget.className.includes('card')&& !eventparent.className.includes('flipped')){
            flipcard(eventparent)
        }
        else if(eventtarget.nodeName==='A'&& !eventtarget.className.includes('disabled')){
            startgame();
        }
    })
}
generategame();
addclick();




