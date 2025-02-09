const ordersTableContent = document.querySelector(`.container main .recent-orders table tbody`);
const sideMenu = document.querySelector('aside');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const darkMode = document.querySelector('.dark-mode');

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});

darkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode-variables');
    darkMode.querySelector('span:nth-child(1)').classList.toggle('active');
    darkMode.querySelector('span:nth-child(2)').classList.toggle('active');
})

fetch("/orders.json")
.then((response) => {
    let orders = response.json();
    console.log(orders);
    return orders;
})
.then((orders) => {
    orders.forEach((order) => {
        let row = document.createElement('tr');
        for (let info in order) {
            let cell = document.createElement('td');
            cell.textContent = order[info];
            row.appendChild(cell);
            if (info === "status") {
                if (order[info] === "Pending") cell.style.color = "orange";
                if (order[info] === "Declined") cell.style.color = "red";
                if (order[info] === "Active") cell.style.color = "green";
            }
        }
        let details = document.createElement('td');
        details.textContent = `Details`;
        
        row.appendChild(details);
        ordersTableContent.appendChild(row);
    });
})