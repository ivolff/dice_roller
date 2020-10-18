function rolld(d){
    return Math.floor(Math.random() * Math.floor(d)) + 1
}

function simple_roll(arg){
    textfield = document.getElementById("ThreeJS")
    textfield.textContent = "rolling d" + arg.toString()+ ": " + rolld(arg).toString()
}

function string_parcer(){
    try {
        str = document.getElementById("TextInput").value.toString();
        args = str.toString().split(" ").filter(function(entry) { return /\S/.test(entry); })
        console.log(args.length)
        ans = pro_roll(args)
        let outputField = document.getElementById("TextOutput");
        outputField.textContent = ans
    } catch (e){
        outputField = document.getElementById("TextOutput");
        outputField = e.message
    }
}

function table_parcer(){
    let dices = ["d4", "d6", "d8", "d10", "d12", "d20"]
    let ans = []
    for(i = 0; i < dices.length; i++){
        ans.push(document.getElementById(dices[i]+"count").value.toString() + dices[i] + " ")
    }
    ans.push(document.getElementById("dncount").value.toString() + "d" + document.getElementById("Ncount").value.toString()  +" ")
    ans = pro_roll(ans)
    let TableOutput = document.getElementById("TableOutput");
    TableOutput.textContent = ans

}


function pro_roll(args){
    ans = " ";
    let sum = 0, min = 100000, max = -1;
    let dicev;
    let tmp;
    for (let i = 0; i < args.length; i++) {
        tmp = args[i].split("d").filter(function(entry) { return /\S/.test(entry); })
        console.log(tmp)
        if (tmp.length > 2)
            throw new Error('invalid Input');
        if (tmp.length === 1) {
            dicev = rolld(parseInt(tmp[0], 10));
            sum += dicev
            if(dicev > max)
                max = dicev
            if(dicev < min)
                min = dicev
            ans += dicev.toString() + " | ";
        }
        if (tmp.length === 2) {
            for (let j = 0; j < parseInt(tmp[0]); j++) {
                dicev = rolld(parseInt(tmp[1], 10));
                console.log(dicev)
                sum += dicev;
                if(dicev > max)
                    max = dicev
                if(dicev < min)
                    min = dicev
                ans += dicev.toString() + " | ";
            }
        }
    }
    sum_check = document.getElementById("sum")
    min_check = document.getElementById("min")
    max_check = document.getElementById("max")
    if(sum_check.checked)
        ans += "sum: " + sum.toString() + " | ";
    if(min_check.checked)
        ans += "min: " + min.toString() + " | ";
    if(max_check.checked)
        ans += "max: " + max.toString() + " | ";
    console.log(sum)
    console.log(ans)
    return ans.substr(0, ans.length - 3);
}