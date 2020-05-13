const refresh = document.getElementById("refresh")
const colorDivs = document.getElementsByClassName("color")


window.onload = function() {
    for(let item of colorDivs) {
        const bgColor = '#' + Math.random().toString(16).substr(2, 6)
        item.style.backgroundColor = bgColor;
    }
}


refresh.addEventListener('click', (event) => {
    for(let item of colorDivs) {
        const bgColor = '#' + Math.random().toString(16).substr(2, 6)
        item.style.backgroundColor = bgColor;
    }
})