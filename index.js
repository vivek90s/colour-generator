const refresh = document.getElementById("refresh")
const colorDivs = document.getElementsByClassName("color")
const copied = document.getElementById("copied")

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/SW.js")
      .then((reg) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  }

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

    const colors = JSON.parse(localStorage.getItem("colors"))
    const random = Math.floor(Math.random() * colors.length)

    const color = colors[random]
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
            copied.classList.add("fade-in")
            setTimeout( () => {
                copied.classList.remove("fade-in")
            } , 3000)
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

    localStorage.setItem('colors', JSON.stringify(colors))

    const random = Math.floor(Math.random() * colors.length)

    return colors[random]
}

function doAdelay(){
    setTimeout(function(){return true;},1000);
};



//Toggle in Nav

const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function () {
  // console.log(links.classList);
  // console.log(links.classList.contains("random"));
  // console.log(links.classList.contains("links"));
  // if (links.classList.contains("show-links")) {
  //   links.classList.remove("show-links");
  // } else {
  //   links.classList.add("show-links");
  // }
  links.classList.toggle("show-links");
});

