// HTML'den gelenler
const addBtn = document.getElementById("add-btn");
const priceInp = document.getElementById("price-inp")
const titleInp = document.querySelector("#title-inp")
const checkBox = document.querySelector("#checked")
const list = document.querySelector("#list")
const totalSpan = document.querySelector("#price-info")
const select = document.querySelector("select")
const userInp = document.querySelector("#user-inp")

// Olay İzleyicileri
addBtn.addEventListener("click", addExpense);
list.addEventListener("click", handleUpdate);
select.addEventListener("change", handleFilter);
userInp.addEventListener("change",saveUser);
document.addEventListener("DOMContentLoaded", getUser);

let totalPrice = 0;

// Fonksiyonlar
function updateTotal(price) {
    totalPrice += price;
    totalSpan.innerText = totalPrice;
}

function addExpense(event) {

    event.preventDefault();

    const title = titleInp.value;
    const price = priceInp.valueAsNumber;

    if (!title || !price) {
        alert("Lütfen formu doldurunuz")
        return;
    }
    const expenseDiv = document.createElement("div");
    expenseDiv.classList.add("expense");

    if (checkBox.checked === true) {
        expenseDiv.classList.add("paid")
    }

    expenseDiv.innerHTML = `   
    <h2 id="title">${title}</h2>
    <h2 id="price">${price}</h2>
    <div class="btns">
        <img id="update" src="/images/money.png" />
        <img id="delete" src="/images/delete.png" />
    </div>
    `;
    list.appendChild(expenseDiv);

    updateTotal(price);

    titleInp.value = "";
    priceInp.value = "";
    checkBox.checked = false;
}

function handleUpdate(event) {
    const ele = event.target;

    const parent = ele.parentElement.parentElement;

    if (ele.id === "delete") {
        const price = Number(parent.children[1].innerText);

        updateTotal(-price)

        parent.remove();

        
    }
    if (ele.id === "update") {
        parent.classList.toggle("paid")
    }
}

function handleFilter (event) {
    const selected = event.target.value;

    const items = list.childNodes;

    items.forEach((item) => {
        switch (selected) {
            case "all":
                item.style.display = "flex"
                break;
            case "paid":
             if (item.classList.contains("paid")) {
                item.style.display = "flex"
             } else {
                item.style.display = "none"
             }
             break;
             case "not-paid":
                if (!item.classList.contains("paid")) {
                    item.style.display = "flex"
                } else {
                    item.style.display = "none"
                }
                break;
        }
    })
}

function saveUser(event){
    localStorage.setItem("username", event.target.value)
}

function getUser(){
    const username = localStorage.getItem("username") || "";

    userInp.value = username;
}