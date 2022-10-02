diceArrays = ["./image/0.png","./image/1.png","./image/2.png","./image/3.png","./image/4.png","./image/5.png","./image/6.png"]
leftArrays = ["./image/0.png","./image/l1.png","./image/l2.png","./image/l3.png","./image/l4.png","./image/l5.png","./image/l6.png"]
rightArrays = ["./image/0.png","./image/r1.png","./image/r2.png","./image/r3.png","./image/r4.png","./image/r5.png","./image/r6.png"]
var centreState = 0;  //中间骰子信号量
var leftState = 1;  //左边九宫格信号量
var rightState = 1; //右边九宫格信号量
var index;  //骰子点数
var i = 0;  //用来判奇偶，自增一
var leftScore =0    //左边分数
var rightScore = 0  //右边分数
var isNull = []    //存放电脑右九宫格空位置
var isNullIndex      //电脑下到右边九宫格的位置
var leftAllNum = []    //存放右边九宫格所有点数
    leftAllNum[0] =[] 
    leftAllNum[1] =[]
    leftAllNum[2] =[]
var rightAllNum = []   //存放右边九宫格所有点数
    rightAllNum[0] =[] 
    rightAllNum[1] =[]
    rightAllNum[2] =[]
var aiLayDiceSite

// 投掷骰子事件
function diceClick() {
    // alert(document.getElementById("diceId").src)
    if (centreState === 0 && leftState === 1 && rightState === 1) {
        // 随机骰子
        index =  Math.floor(Math.random() * 6 + 1)
        document.getElementById("diceId").src = diceArrays[index]
        

        centreState = 1
        // 偶数可点击左九宫格，奇数可点击右九宫格
        if(i % 2 === 0){
            i++
            leftState = 0
            rightState = 1
            // 边框指示灯
            indicateLight("left",true)
            
        }else{
            i++
            leftState = 1
            rightState = 0
            indicateLight("right",true)
        }
        
        
    }
    
}
// 左分数
function leftCount(){
    leftScore = 0
    var score = []
    for(var x = 1; x < 4; x++){
        for(var y = 1; y < 4; y++){
            stringNum = (document.getElementById("左" + x + "." + y).src).match (/image\/.?([0-6])\.png/i)[1]
            score[y-1] =Number(stringNum)
        }
        if(score[0] == score[1] && score[1] == score[2]){
            leftScore += score[0]*9
        }else if (score[0] != score[1] && score[0]!= score[2] && score[1]!= score[2]){
              leftScore += score[0] + score[1] + score[2]
        }else{
            if(score[0] == score[1]){
                leftScore += score[0] * 4 + score[2]
            }else if(score[0] == score[2]){
                leftScore += score[0] * 4 + score[1]
            }else{
                leftScore += score[1] * 4 + score[0]
            }
        }
    }
    document.getElementById("leftScore").innerHTML = leftScore;
    
}
// 右分数
function rightCount(){
    rightScore = 0
    var score = []
    for(var x = 1; x < 4; x++){
        for(var y = 1; y < 4; y++){
            // 拿到格子的数值
            stringNum = (document.getElementById("右" + x + "." + y).src).match (/image\/.?([0-6])\.png/i)[1]
            score[y-1] =Number(stringNum)
        }
        // 一行三个数显相等，或者全部相等，或者两个相等
        if(score[0] == score[1] && score[1] == score[2]){
            rightScore += score[0]*9
        }else if (score[0] != score[1] && score[0]!= score[2] && score[1]!= score[2]){
              rightScore += score[0] + score[1] + score[2]
        }else{
            if(score[0] == score[1]){
                rightScore += score[0] * 4 + score[2]
            }else if(score[0] == score[2]){
                rightScore += score[0] * 4 + score[1]
            }else{
                rightScore += score[1] * 4 + score[0]
            }
        }
    }
    document.getElementById("rightScore").innerHTML = rightScore;
    
}
// 放置骰子
function layDice(id){
    
    if(leftState === 0 && rightState === 1 && centreState === 1 &&  (document.getElementById(id).src).match(/0.png/i)){

        document.getElementById(id).src = leftArrays[index]

            remove(id) //判断是否需要消除
            leftCount() //判断左边分数  
            rightCount() //右边分数
            end("左")   //是否游戏结束
            indicateLight("left") //显示左边提示灯

            leftState = 1
            centreState = 0;

            diceClick()
            layDice()
    }
    // 电脑自动投掷骰子
    if (centreState == 1 && leftState == 1 && rightState == 0) {
       
        aiLayDice()
        
        leftCount()
        rightCount()
        end("右")
        indicateLight("right")

        rightState = 1
        centreState = 0;
    }    
}

//电脑放置骰子
function aiLayDice(){
    // 清空每行点数
    for (var n = 0; n <3; n++) {
        leftAllNum[n] = []
        rightAllNum[n] = []
    }
    // 九宫格所有点数
    for (var n = 0; n < 3; n++) {
        for (var m = 0; m < 3; m++) {
            num = (document.getElementById("左" + (n+1) + "." + (m+1)).src).match(/image\/.?([0-6])\.png/i)[1]
            leftAllNum[n][m] = Number(num)
            num = (document.getElementById("右" + (n+1) + "." + (m+1)).src).match(/image\/.?([0-6])\.png/i)[1]
            rightAllNum[n][m] = Number(num)
        }    
    }
    // AI策略
    for (var n = 0; n < 3; n++) {
        // 如果右九宫格某行已存在投掷的骰子点数，判断该行是否有位置，有，放置
        if (rightAllNum[n].indexOf(index) != -1 && rightAllNum[n].indexOf(0) != -1 ) {
            document.getElementById("右" + (n+1) + "." + (rightAllNum[n].indexOf(0) + 1)).src = rightArrays[index]
            remove("右" + (n+1) + "." + (rightAllNum[n].indexOf(0) + 1))
            return
        }
        // 如果左九宫格某行有投掷的骰子点数，且点数大于2，判断右九宫格改行是否有位置，有，放置
        if(leftAllNum[n].indexOf(index) !=-1 && rightAllNum[n].indexOf(0) != -1 && index >= 3){
            document.getElementById("右" + (n+1) + "." + (rightAllNum[n].indexOf(0) + 1)).src = rightArrays[index]
            remove("右" + (n+1) + "." + (rightAllNum[n].indexOf(0) + 1))
            return
        }
        // 没有相同点数，如果点数是1和2，就放在一起
    }
    //不符合上面，随便下一个
    for (var n = 2; n >= 0; n--){
        if(rightAllNum[n].indexOf(0) != -1){
            document.getElementById("右" + (n+1) + "." + (rightAllNum[n].indexOf(0) + 1)).src = rightArrays[index]
            remove("右" + (n+1) + "." + (rightAllNum[n].indexOf(0) + 1))
            return
        }
    }

}

// 判断行消除对方骰子
function remove (id) {
    if(document.getElementById(id).id.match(/左([1-6].)/i)){
        n = document.getElementById(id).id.match(/左([1-6].)/i)[1]
        idName = "右" + n 
        for (j = 1; j < 4 ; j++) {
            if((document.getElementById(idName + j).src).match (/image\/.?([0-6])\.png/i)[1] == index){
                document.getElementById(idName + j).src = rightArrays[0]
                }
            }
        }else{
            n = document.getElementById(id).id.match(/右([1-6].)/i)[1]
            idName = "左" + n 
            for (j = 1; j < 4 ; j++) {
                if((document.getElementById(idName + j).src).match (/image\/.?([0-6])\.png/i)[1] == index){
                    document.getElementById(idName + j).src = leftArrays[0]
                }
            }
        }
        
    }

//玩家指示灯，指示左边还是右边下棋
function indicateLight (location,swith){
    if(swith == true){
        (document.getElementById(location)).style.border = "#00FFFF 5px solid"
    }else{
        (document.getElementById(location)).style.border = ""
    }   
}

//判断是否结束
function end(site){
    // 如果有各自骰子为0，退出函数
    for(var x = 1; x < 4; x++){
        for(var y = 1; y < 4; y++){
            if(((document.getElementById(site + x + "." + y).src).match (/image\/.?([0-6])\.png/i)[1]) == "0") {
                return
            }
        }  
    }
    // 如果全不为0，触发弹窗结束游戏

    leftState = 1
    centreState = 1
    rightState = 1

    var result 
    if(leftScore > rightScore) {
            result = "左方胜"
        }else if(leftScore < rightScore) {
            result = "右方胜"
        }else{
            result = "平局"
        }
        contentString = leftScore + ":" + rightScore
    const obj = {
        titile: '游戏结束',
        content: contentString,
        res: result,
        showConfirmBtn: true,
        showCancelBtn: true,
    }
    var modal = document.getElementById('myModal'); // 获取弹窗

    function init() {
        const b = [];
        for (const key in obj) {
            b.push(obj[key]);
        }
        document.querySelector(".modal-header").innerHTML = `<h1>${b[0]}</h1>`;
        document.querySelector(".modal-body").innerHTML = `<p>${b[1]}</p>`;
        document.querySelector(".modal-result").innerHTML = `<p>${b[2]}</p>`;
        b[2] === true ?"":firm.style.display = "none";
        b[3] === true ?"":cel.style.display = "none";
    }    
        modal.style.display = "block";
            
    init();
}
