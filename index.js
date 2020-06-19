const refresh = document.getElementById("refresh")
const colorDivs = document.getElementsByClassName("color")
const copied = document.getElementById("copied")
const save = document.getElementById("save")
const showSavedMessage = document.getElementById("saved")

const colorId = document.getElementById("color-id")

// popup selectors
const popup = document.getElementById("popup")
const cancel = document.getElementById("popup__cancel")
const add = document.getElementById("popup__add")

const saved = localStorage.getItem('saved') ? JSON.parse(localStorage.getItem('saved')) : []

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("/SW.js")
        .then((reg) => console.log("service worker registered"))
        .catch((err) => console.log("service worker not registered", err));
}

// set color of divs on first load event
window.onload = async function () {




    const color = await fetchColor()
    let i = 1
    for (let item of colorDivs) {
        const bgColor = color["color" + i]
        item.style.backgroundColor = bgColor;
        item.childNodes[1].innerText = bgColor
        i = i + 1
    }

    document.getElementById("color-id").innerHTML = color["id"]
}

// onclick event iterate over the divs and set background color
refresh.addEventListener('click', async (event) => {

    const colors = JSON.parse(localStorage.getItem("colors"))
    const random = Math.floor(Math.random() * colors.length)

    const color = colors[random]
    let i = 1



    for (let item of colorDivs) {
        const bgColor = color["color" + i]
        item.style.backgroundColor = bgColor;
        item.childNodes[1].innerText = bgColor
        i = i + 1
    }

    document.getElementById("color-id").innerHTML = color["id"]
})

// copy individual colors
for (let item of colorDivs) {
    item.addEventListener('click', event => {
        const color = item.childNodes[1].innerText

        navigator.clipboard.writeText(color)
            .then(() => {
                copied.classList.add("fade-in")
                setTimeout(() => {
                    copied.classList.remove("fade-in")
                }, 3000)
            }).catch((err) => {
                alert(err)
            })
    })
}


// fetch colors.json file and save it to localstorage
const fetchColor = async () => {

    // fetch colors data from colors.json file
    let colors

    const response = await fetch('colors.json')
    colors = await response.json()

    localStorage.setItem('colors', JSON.stringify(colors))

    const random = Math.floor(Math.random() * colors.length)

    return colors[random]
}

function doAdelay() {
    setTimeout(function () { return true; }, 1000);
};



//Toggle in Nav

const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");

navToggle.addEventListener("click", () => links.classList.toggle("show-links"));


// below code is to share pallete and copy to clipboard
save.addEventListener('click', e => {

    //TODO: Toggle Save unsave color

    e.preventDefault()

    // popup.style.display = "block"

    new ClipboardJS("save")
    const pcopy = document.getElementById("pcopy")
    const pncopy = document.getElementById("pncopy")

    const url = window.location.href

    const color0 = colorDivs[0].childNodes[1].innerText
    const color1 = colorDivs[1].childNodes[1].innerText
    const color2 = colorDivs[2].childNodes[1].innerText
    const color3 = colorDivs[3].childNodes[1].innerText

    const message = `Here is an awsome pallete from ${url} have a look at it 😍💖!!\n ${color0} | ${color1} | ${color2} | ${color3} ✔ \n Do check out once !!`


    // code for mobile devices
        

        if (navigator.share) {
            navigator.share({
              title: `Color Palette from ${url}`,
              text: message,
              url: url,
            })
              .then(() => {
                pcopy.classList.add("fade-in")
                setTimeout(() => {
                    copied.classList.remove("fade-in")
                }, 3000)
              })
              .catch((error) => {
                pncopy.classList.add("fade-in")
                setTimeout(() => {
                    copied.classList.remove("fade-in")
                }, 3000)
              });
        }

    

    else {
        navigator.clipboard.writeText(message)
        .then(() => {
            pcopy.classList.add("fade-in")
                setTimeout(() => {
                    copied.classList.remove("fade-in")
                }, 3000)
        }).catch(err => {
            pncopy.classList.add("fade-in")
                setTimeout(() => {
                    copied.classList.remove("fade-in")
                }, 3000)
        })
    }
    



})

// below code is for popup to save pallete

// add.addEventListener("click", (e) => {

//     e.preventDefault()
//     const name = document.getElementById("popup__name").value

//     const id = document.getElementById("color-id").innerHTML

//     const colors = {
//         id: id,
//         name: name
//     }

//     let i = 1
//     for (let item of colorDivs) {


//         colors["color" + i] = item.childNodes[1].innerText
//         i = i + 1

//     }

//     const found = saved.find(ele => ele.id === id)

//     if (!found) {
//         saved.push(colors)
//         localStorage.setItem('saved', JSON.stringify(saved))
//     }

//     document.getElementById("popup__form").reset();

//     popup.style.display = "none"
//     showSavedMessage.classList.add("fade-in")
//     setTimeout(() => {
//         showSavedMessage.classList.remove("fade-in")
//     }, 3000)
// })



// cancel.addEventListener("click", e => {
//     popup.style.display = "none";
// })

// /* save unsave */
// const checkId = (id) => {
//     return saved.filter(x => x.id == id)
// }


// if(checkId(colorId).length > 0) {
    
//     document.getElementById("save__button").classList.add("pallete_saved")
// }



