async function fetchUsers(url) {
    try {
        let data = await fetch(url)
        return await data.json()
    } catch (error) {
        console.log(error)
    }
}

parseDay = (timestamp) => {
    return new Date(timestamp * 1000).getDay()
}

findDay = (users) => {
    const sunData = [], monData = [], tueData = [], wedData = [], thuData = [], friData = [], satData = []
    for (let user of users) {
        let rawDate = user.birthday.raw
        if (this.parseDay(rawDate) === 0) sunData.push(user)
        if (this.parseDay(rawDate) === 1) monData.push(user)
        if (this.parseDay(rawDate) === 2) tueData.push(user)
        if (this.parseDay(rawDate) === 3) wedData.push(user)
        if (this.parseDay(rawDate) === 4) thuData.push(user)
        if (this.parseDay(rawDate) === 5) friData.push(user)
        if (this.parseDay(rawDate) === 6) satData.push(user)
    }
    const sun = Object.assign({}, { group_name: "sunday", data: sunData }),
        mon = Object.assign({}, { group_name: "monday", data: monData }),
        tue = Object.assign({}, { group_name: "tuesday", data: tueData }),
        wed = Object.assign({}, { group_name: "wednesday", data: wedData }),
        thu = Object.assign({}, { group_name: "thursday", data: thuData }),
        fri = Object.assign({}, { group_name: "friday", data: friData }),
        sat = Object.assign({}, { group_name: "saturday", data: satData }),
        objUsers = [{ ...sun }, { ...mon }, { ...tue }, { ...wed }, { ...thu }, { ...fri }, { ...sat }]
    return objUsers
}

function createTitle(name) {
    return name.substr(0, 3).toUpperCase()
}

async function main() {
    const url = "https://uinames.com/api/?ext&amount=25"
    let users = await fetchUsers(url)
    let dataObj = findDay(users)
    console.log(dataObj)
    const itemList = dataObj.map((user, i) => {
        let div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = ` <div class="title" id="card-${i}" >${createTitle(user.group_name)}</div>`
        document.getElementById("root").appendChild(div);
        user.data.map(u => {
            let div = document.createElement('div');
            div.className = 'card-item';
            div.innerHTML = `<img class="img-card" src=${u.photo}></img>
                                    <div class="card-body">
                                    <p>${u.name}</p>
                             </div>`
            document.getElementById(`card-${i}`).appendChild(div);
        })
    })
} 