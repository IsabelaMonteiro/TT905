"use strict"

const registerSeriesEvents = () => {
    const viewSerieButtons = document.querySelectorAll(".view-serie")
    for (let i = 0; i < viewSerieButtons.length; i++) {
        viewSerieButtons[i].onclick = function() {
            const serieId = this.id.split("-")[2]
            updateModalValues("view-modal", serieId, true)
            openModal("view-modal")
        }
    }

    const editSerieButtons = document.querySelectorAll(".edit-serie")
    for (let i = 0; i < editSerieButtons.length; i++) {
        editSerieButtons[i].onclick = function() {
            const serieId = this.id.split("-")[2]
            updateModalValues("edit-modal", serieId)
            openModal("edit-modal")
        }
    }

    const delSerieButtons = document.querySelectorAll(".del-serie")
    for (let i = 0; i < delSerieButtons.length; i++) {
        delSerieButtons[i].onclick = async function() {
            const serieId = this.id.split("-")[2]
            let res = await delSerie(serieId)
            alert(res.alerta)
            refreshTable()
        }
    }
}

const updateModalValues = async (modal, serieId, placeholder = false) => {
    const serie = await getSerie(serieId)
    document.querySelector(`#${modal} form input[name="id"]`).value = serieId
    for (let key in serie) {
        const el = document.querySelector(`#${modal} form input[name="${key}"]`);
        if (placeholder) {
            el.value = `${el.placeholder}: ${serie[key]}`
        } else {
            el.value = serie[key]
        }
    }
}

const refreshTable = async () => {
    const series = await getSeries()
    const tbody = document.querySelector("#filmes-series > tbody")
    let rows = ""
    for (let i = 0; i < series.length; i++) {    
        rows += `<tr>
                    <td> ${ series[i]._id } </td>
                    <td> ${ series[i].nome } </td>
                    <td> ${ series[i].genero } </td>
                    <td> ${ series[i].duracao } </td>
                    <td> ${ series[i].nota } </td>
                    <td> ${ series[i].sugestao } </td>
                    <td>
                        <button class="view-serie btn" id="view-serie-${series[i]._id}"></button>
                        <button class="edit-serie btn" id="edit-serie-${series[i]._id}"></button>
                        <button class="del-serie btn" id="del-serie-${series[i]._id}"></button>
                    </td>
                </tr>`
    }
    tbody.innerHTML = rows
    registerSeriesEvents()
}

const submitForm = async (e, modal) => {
    e.preventDefault()

    const req = {}
    const formFields = document.querySelectorAll(`#${modal} form input`)
    for (let i = 0; i < formFields.length; i++) {
        req[formFields[i].name] = formFields[i].value
    }

    if (req.nome == "") {
        alert("O nome deve ser preenchido!")
        return
    }
    let res = ""
    const action = modal.split("-")[0]
    if (action == "add") {
        res = await addSerie(req);
    } else {
        res = await editSerie(req);
    }
    
    closeModals()
    alert(res.alerta)
    document.querySelector(`#${modal} form`).reset()
    refreshTable()
}


window.onload = refreshTable

for (let modal of ["add-modal", "edit-modal"]) {
    document.querySelector(`#${modal} form`).onsubmit = (e) => submitForm(e, modal)
}

document.querySelector("#add-serie").onclick = () => openModal("add-modal")
document.querySelector("#get-series").onclick = refreshTable