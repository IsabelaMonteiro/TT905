"use strict"

const setSlide = (images, index) => {
    const slide = images[index]
    document.getElementById("slider-image").src = slide[0]
    document.getElementById("slider-desc").innerHTML =
        `<h2>${slide[1]}</h2> <p>${slide[2]}</p>`
}

window.onload = () => {
    const slider = {}

    slider.element = document.getElementById("slider")
    slider.images = JSON.parse(slider.element.dataset.images)
    slider.actual = 0

    const slide = slider.images[slider.actual]

    const img = document.createElement("img")
    img.src = slide[0]
    img.id = "slider-image"

    const desc = document.createElement("div")
    desc.innerHTML = `<h2>${slide[1]}</h2> <p>${slide[2]}</p>`
    desc.id = "slider-desc"

    const next = document.createElement("button")
    next.id = "slider-next"
    next.innerText = ">"
    next.onclick = () => {
        slider.actual++
        if (slider.actual == slider.images.length) slider.actual = 0
        setSlide(slider.images, slider.actual)
    }

    const prev = document.createElement("button")
    prev.id = "slider-prev"
    prev.innerText = "<"
    prev.onclick = () => {
        slider.actual--
        if (slider.actual == -1) slider.actual = slider.images.length - 1
        setSlide(slider.images, slider.actual)
    }

    slider.element.appendChild(img)
    slider.element.appendChild(desc)
    slider.element.appendChild(next)
    slider.element.appendChild(prev)
}