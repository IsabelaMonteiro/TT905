"use strict"

fetch("https://api.github.com/repos/IsabelaMonteiro/TT905/commits")
    .then(res => res.json())
    .then(res => {
        const commitsDiv = document.getElementById("commits")
        for (let commit of res) {
            const url = commit.html_url
            const message = commit.commit.message
            const date = commit.commit.author.date.split("T")[0]
            const formattedDate = date.split("-").slice(1, 3).reverse().join("/")
            const formattedMessage = 
                message.length == message.substring(0,20).length ? message : message.substring(0, 20) + "..."
            
            commitsDiv.innerHTML += `
                <a href="${url}"
                    target="_blank">
                    <div class="card">
                        <div class="card-header">
                            ${formattedMessage}
                        </div>
                        <div class="card-footer">
                            ${formattedDate}
                        </div>
                        <div class="clearfix"></div>
                    </div>
                </a>
            `
        }
    })