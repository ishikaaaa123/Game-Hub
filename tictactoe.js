let boxes = document.querySelectorAll(".b1");

let turn = true; // true for X's turn, false for O's turn

const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], 
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], 
    [2, 4, 6]
];

let over = false;

function won(){
    for (let i =0 ;i<win.length;i++){
        const [a,b,c] = win[i];
        
        if (boxes[a].innerText && boxes[a].innerText == boxes[b].innerText && boxes[a].innerText == boxes[c].innerText){
            over = true;
            return true;
        }
    }
    return false;
}


function tie(){
    for (let i =0;i<boxes.length;i++){
        if (boxes[i].innerText == ""){
            return false;
        }
    }
    return true;
}



boxes.forEach((box,index)=>{

    box.addEventListener("click", () => {
        if (over){
            return;
        }

        if (box.innerText == "") {
            box.innerText = turn ? "X" : "O";
            if (won()){
                document.querySelector(".victory").innerText = `Player ${turn ? "X" : "O"} won!`;
                return;
            }
            if (tie()){
                document.querySelector(".victory").innerText ="Its' a tie!";
                over = true;
                return;
            }
            turn = !turn;
       }
    });
})


let a = document.querySelector(".re");

a.addEventListener("click", () => {
    turn = true;
    over= false;
    for (let i = 0;i<boxes.length;i++){
        boxes[i].innerHTML="";
    }
    document.querySelector(".victory").innerText = "";
})

