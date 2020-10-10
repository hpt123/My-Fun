; (function (doc) {
    var SaoLei = function (doc) {
        this.p = doc.getElementsByTagName('p')[0]
        this.qipang = doc.getElementsByClassName('qipang')[0]
        this.youxi = true,
        this.brr=[],
        this.Init()
    }
    SaoLei.prototype.Init = function () {
        this.XuanRang()
        this.qipang.addEventListener("click", this.slClick.bind(this), false)
        this.qipang.addEventListener("contextmenu",this.paiLei.bind(this),false)
    }
    SaoLei.prototype.XuanRang = function () {
        let arr = [],
            num=1
        for (let i = 0; i < 10; i++){
            var ul = document.createElement('ul')
            for (let j = 0; j < 10; j++){
                var li = document.createElement('li')
                li.id = '' + num
                num++
                ul.appendChild(li) 
            }
            this.qipang.appendChild(ul)
        }
        while (arr.length < 10) {
            let temp = Math.ceil(Math.random() * 100)
            if (arr.indexOf(temp) == -1) {
                arr.push(temp)
                this.brr.push(temp)
            }
       }
        var J_li = document.getElementsByTagName('li')
        for (let i = 0; i < J_li.length; i++){
            for (let j = 0; j < arr.length; j++){
                if (J_li[i].id == arr[j]) {
                    J_li[i].className='active'
                }
            }
        }
    }
    SaoLei.prototype.slClick = function (e) {
        var e = e || window.event,
            tar = e.target || e.srcElement
            tar.setAttribute('field','k')
         J_li = document.getElementsByTagName('li')
      if (tar.className === "active" && this.youxi == true) {
        this.p.style.visibility = "visible";
        this.youxi = false;
        for (let i = 0; i < J_li.length; i++) {
          if (J_li[i].className === "active") {
            J_li[i].className += " color";
          }
        }
      }  if (this.youxi == true) {
        var temp = parseInt(tar.id),
          count = 0;
        if (
          temp%10!==1&&
          document.getElementById(temp - 1).className === "active"
        ) {
          count++;
        }
        if (
          temp%10!==0&&
          document.getElementById(temp + 1).className === "active"
        ) {
          count++;
        }
        if (
          temp <= 90 &&
          document.getElementById(temp + 10).className === "active"
        ) {
          count++;
        }
        if (
          temp > 10 &&
          document.getElementById(temp - 10).className === "active"
        ) {
          count++;
        }
        if (
          temp > 11 &&
          document.getElementById(temp - 11).className === "active"
        ) {
          count++;
        }
        if (
          temp <= 89 &&
          document.getElementById(temp + 11).className === "active"
        ) {
          count++;
        }
        if (
          temp % 10 !== 0 &&
          temp > 10 &&
          document.getElementById(temp - 9).className === "active"
        ) {
          count++;
        }
        if (
          temp % 10 !== 1 &&
          temp <= 90 &&
          document.getElementById(temp + 9).className === "active"
        ) {
          count++;
        }
        tar.innerText = count;
      }   
    }
    SaoLei.prototype.paiLei = function (e) {
        var e = e || window.event,
            tar = e.target || e.srcElement
        console.log();
        if (!tar.getAttribute("field")&&tar.innerText=='') {
           tar.setAttribute('field', 'pl') 
        } else {
            tar.setAttribute('field', 'k')
        }
        this.Win()
            e.preventDefault()
    }
    SaoLei.prototype.Win = function () {
        var count = 0,
            lei
        for (let i = 0; i < this.brr.length; i++){
            lei = doc.getElementsByTagName('li')[this.brr[i] - 1]  
            if (lei.getAttribute('field')) {
                count++
            }
        }
        if (count == 10) {
            this.p.innerText = '游戏胜利'
            this.p.style.visibility="visible"
        }
    }
    window.SaoLei=SaoLei
})(document)