const refresh = document.getElementById("refresh")
const colorDivs = document.getElementsByClassName("color")
const copied = document.getElementById("copied")

// set color of divs on first load event
window.onload = function() {
    for(let item of colorDivs) {
        const bgColor = '#' + Math.random().toString(16).substr(2, 6)
        item.style.backgroundColor = bgColor;
        item.childNodes[1].innerText = bgColor
    }
}

// onclick event iterate over the divs and set background color
refresh.addEventListener('click', (event) => {
    for(let item of colorDivs) {
        const bgColor = '#' + Math.random().toString(16).substr(2, 6)
        item.style.backgroundColor = bgColor;
        item.childNodes[1].innerText = bgColor
    }
})

for(let item of colorDivs) {
    item.addEventListener('click', event => {
        const color = item.childNodes[1].innerText
        
        navigator.clipboard.writeText(color)
        .then(() => {
            copied.classList.add("show")
            alert("Copied")
        }).catch((err) => {
            alert(err)
        })
    })
}