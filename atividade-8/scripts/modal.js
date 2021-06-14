"use strict"

const closeModals = () => {
    const modals = document.querySelectorAll(".modal")
    for (let i = 0; i < modals.length; i++) {
        modals[i].style.display = "none"
    }
}

const openModal = (id) => {
    const modal = document.getElementById(id)
    modal.style.display = "flex"
}

const closeButtons = document.querySelectorAll(".modal-close")
for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].onclick = closeModals
}