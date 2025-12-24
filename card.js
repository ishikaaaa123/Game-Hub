const cards = document.querySelectorAll(".card");
let emoji = ["😊", "😎", "🎉", "😘", "🔥", "😌", "👻", "😁", "💎", "😍", "❤️", "😋"];
let eid = new Array(12).fill(0);
let turn = true;
let s1 = 0;
let flipped = [];

let s2 = 0;
//true = player 1
let assemoji = new Array(24).fill(null);

function changeimg(card,idx){

    let x;
    if (assemoji[idx]!=null){
        card.innerText = assemoji[idx];
        return;
    }

    while (true){
        x = Math.floor(Math.random()*emoji.length);
        if (eid[x]<2){
            break;
        }
    }
    card.innerText = emoji[x];
    eid[x]++;
    assemoji[idx] = emoji[x];
}

function end(){
    for (let i =0 ;i<cards.length;i++){
        if (cards[i].style.backgroundColor != "rgb(198, 207, 233)") {
            return false;
        }
    }
    return true;
}

let over = false;

function winner(){
    let won = document.querySelector(".win");

    if (s1>s2){
        won.innerHTML = "Player 1 has won!";
    }else if(s1<s2) {
        won.innerHTML = "Player 2 has won!";
    }else{
        won.innerHTML = "It's a tie!";
    }
    over = true;
}

let but = document.querySelector(".button-container");

but.addEventListener("click", () => {
    over = false;
    s1 = 0;
    s2=0;
    turn = true;
    flipped=[];
    document.querySelector(".p1").innerText = `Player 1: ${s1}`;
    document.querySelector(".p2").innerText = `Player 2: ${s2}`;
    assemoji.fill(null);
    eid.fill(0);
    cards.forEach((card,idx)=>{
        card.style.backgroundColor = "#3e69a2";
        card.style.border = "none";
        card.innerText = "";
        card.style.pointerEvents = "auto";
    })
})

cards.forEach((card,idx)=>{
    
    card.addEventListener("click",()=>{
        if (over){
            return;
        }
        if (card.innerHTML != ""){
            return;
        }

        if (flipped.length == 2){
            turn = !turn;
            let first = flipped[0];
            let second = flipped[1];

            cards[first].style.backgroundColor = "#3e69a2";
            cards[second].style.backgroundColor = "#3e69a2";
            cards[first].style.border = "none";
            cards[second].style.border = "none";
            cards[first].innerText = "";
            cards[second].innerText = "";
            flipped = [];
        }

        card.style.backgroundColor = "white";
        card.style.border = "1.5px solid black";
        changeimg(card, idx);
        flipped.push(idx);

        setTimeout(() => {
            if (flipped.length == 2){
                let first = flipped[0];
                let second = flipped[1];
                if (assemoji[first] == assemoji[second]){
                    if (turn){
                        s1++;
                        document.querySelector(".p1").innerText = `Player 1: ${s1}`;
                    }else{
                        s2++;
                        document.querySelector(".p2").innerText = `Player 2: ${s2}`;
                    }
                    cards[first].style.backgroundColor = "#c6cfe9";
                    cards[second].style.backgroundColor = "#c6cfe9";
                    cards[first].style.border = "none";
                    cards[second].style.border ="none";
                    cards[first].innerText = "";
                    cards[second].innerText = "";
                    cards[second].style.pointerEvents = "none";
                    cards[first].style.pointerEvents = "none";


                    flipped = [];
                    if (end()){
                        winner();
                    }
                }
            }
        }, 500);
        
    })
})


