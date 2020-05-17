const refresh = document.getElementById("refresh")
const colorDivs = document.getElementsByClassName("color")
const copied = document.getElementById("copied")

// set color of divs on first load event
window.onload = async function() {

    const color = await fetchColor()
    let i = 1
    for(let item of colorDivs) {
        const bgColor = color["color"+i]
        item.style.backgroundColor = bgColor;
        item.childNodes[1].innerText = bgColor
        i = i + 1
    }
}

// onclick event iterate over the divs and set background color
refresh.addEventListener('click', async (event) => {

    const color = await fetchColor()
    let i = 1

    

    for(let item of colorDivs) {
        const bgColor = color["color"+i]
        item.style.backgroundColor = bgColor;
        item.childNodes[1].innerText = bgColor
        i = i + 1
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

const fetchColor = async () => {

    // fetch colors data from colors.json file
    let colors

    const response = await fetch('colors.json')
    colors = await response.json()

    const random = Math.floor(Math.random() * colors.length)

    return colors[random]
}