"use strict"

const url = "https://series-221700.herokuapp.com/series";

const getSeries = async () => {
    return await fetch(`${url}`, { method: 'GET' })
    .then(res => res.json())
}

const getSerie = async (id) => {
    return await fetch(`${url}/${id}`, { method: 'GET' })
    .then(res => res.json())
}

const addSerie = async (serie) => {
    return await fetch(`${url}`,
    {
        method: 'POST',
        body: JSON.stringify(serie),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
}

const editSerie = async (serie) => {
    return await fetch(`${url}/${serie.id}`,
    {
        method: 'PUT',
        body: JSON.stringify(serie),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
}

const delSerie = async (id) => {
    return await fetch(`${url}/${id}`,
    {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
}



