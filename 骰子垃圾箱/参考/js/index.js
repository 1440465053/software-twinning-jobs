/**
 * Created by Administrator on 2019/4/5.
 */
var s=document.getElementById("s");
var r=document.getElementById("r");
var p=document.getElementById("p");
var user_count=0;
var comp_count=0;
var user_score=document.getElementsByClassName("user_score")[0];
var comp_score=document.getElementsByClassName("comp_score")[0];
var  result=document.querySelector(".result >p");
var map = {
    "s": "剪刀",
    "r": "石头",
    "p": "布"
}
function game(user_choice){
    var arr = ["s","r","p"];
    // 0 1 2  [0 - 1) * 3 [0-3) Math.floor() 0 1 2
    var index = Math.floor(Math.random() * arr.length);
    var comp_choice = arr[index];
    console.log(user_choice);
    console.log(comp_choice);
    switch(user_choice + comp_choice){
        case "pr":
        case "rs":
        case "sp":
            user_count++;
            user_score.innerHTML = user_count;
            result.innerHTML = map[user_choice] + " vs " + map[comp_choice] + " 你赢了! ";
            break;
        case "ps":
        case "sr":
        case "rp":
            comp_count++;
            comp_score.innerHTML = comp_count;
            result.innerHTML = map[user_choice] + " vs " + map[comp_choice] + " 你输了...  ";
            console.log("你输了");
            break;
        case "pp":
        case "ss":
        case "rr":
            result.innerHTML = map[user_choice] + " vs " + map[comp_choice] + " 平局 ";
            break;
    }
}
s.onclick=function(){
    game("s");
}
r.onclick=function(){
    game("r");
};
p.addEventListener("click",function(){
    game("p");
});