let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let search = document.getElementById('search');
let searchTitle = document.getElementById('searchTitle');
let searchCategory = document.getElementById('searchCategory');
let back = document.getElementById('back');
let mood = 'create';
let tmp;
let Moodsearch;

//get total price
function totalPrice() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value)
            - +discount.value;
        total.innerHTML = result;
        submit.style.background = '#466294';
        total.style.background = 'green';
    } else {
        total.innerHTML = '';
        total.style.background = '#c00707';
    }
};

//create product
let proData;
if (localStorage.allData != null) {
    proData = JSON.parse(localStorage.allData);
} else {
    proData = [];
};
submit.onclick = () => {

    if (title.value != '' && price.value != '' && taxes.value != '' && ads.value != '' && discount.value != '' && category.value != ''&& count.value <= 100 ) {
        let allProduct = {
            title: title.value.toLowerCase(),
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            count: count.value,
            category: category.value.toLowerCase(),
            
        }

     clearInputs()

        if (mood === 'create') {
            //make count
            if (allProduct.count > 1) {
                for (let i = 0; i < allProduct.count; i++) {
                    proData.push(allProduct);
                }
               
            } else {
                proData.push(allProduct);
            };
        } else {
            proData[tmp] = allProduct;
            count.style.display = 'block';
            search.style.display = 'block';
            searchTitle.style.display = 'block';
            searchCategory.style.display = 'block';
            submit.innerHTML = 'create';
            mood = 'create';
        };


        localStorage.setItem('allData', JSON.stringify(proData));
        readData()
    } else {
        submit.style.background = 'red';
        title.style.background = '#000';
        title.focus();


    }
};
title.onkeyup = () => {
    submit.style.background = '#466294';
    title.style.transform = '';
    title.style.background = '';
};
//clear all inputs
function clearInputs() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
};

//read data
function readData() {
    totalPrice()
    let table = '';
    for (let i = 0; i < proData.length; i++) {
        table += `
         <tr>
            <td>${i+1}</td>
            <td>${proData[i].title}</td>
            <td>${proData[i].price}</td>
            <td>${proData[i].taxes}</td>
            <td>${proData[i].ads}</td>
            <td>${proData[i].discount}</td>
            <td>${proData[i].total}</td>
            <td>${proData[i].category}</td>
            <td><button onclick='update(${i})' id="update">update</button></td>
            <td><button onclick='deleteRecord(${i})' id="delete">delete</button></td>
        </tr>
        `

    }
    document.getElementById('tBody').innerHTML = table;
    //delete All product
    let deleteAll = document.getElementById('deleteAll');
    if (proData.length > 0) {
        deleteAll.innerHTML = `
<button onclick='deleteAllData()'>Delete ALL ( ${proData.length} )</button>`
    } else {
        deleteAll.innerHTML = '';
    };
};
readData();

//delete record
function deleteRecord(i) {
    proData.splice(i, 1);
    localStorage.allData = JSON.stringify(proData);
    readData();
    search.value = '';
};

//deletAll
function deleteAllData() {
    localStorage.clear();
    proData.splice(0);
    readData();
}

//update
function update(i) {
    title.value = proData[i].title;
    price.value = proData[i].price;
    taxes.value = proData[i].taxes;
    ads.value = proData[i].ads;
    discount.value = proData[i].discount;
    category.value = proData[i].category;
    count.style.display = 'none';
    search.style.display = 'none';
    searchTitle.style.display = 'none';
    searchCategory.style.display = 'none';
    submit.innerHTML = 'Update';
    totalPrice()
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })
};
//search
function searchMood(id) {
    if (id == 'searchTitle') {
        Moodsearch = "title";
        searchTitle.style.background = 'red';
        searchTitle.style.border = 'solid #5f88ce';
        searchCategory.style.background = '#466294';
        searchCategory.style.border = 'none';
        back.style.display = 'block';
    } else {
        Moodsearch = "category";
        searchCategory.style.background = 'red';
        searchCategory.style.border = 'solid #5f88ce';
        searchTitle.style.background = '#466294';
        searchTitle.style.border = 'none';
        back.style.display = 'block';
    };
    search.placeholder = 'search by ' + Moodsearch;
    search.focus();
    search.value = '';
    title.style.display = 'none';
    price.style.display = 'none';
    taxes.style.display = 'none';
    ads.style.display = 'none';
    discount.style.display = 'none';
    total.style.display = 'none';
    count.style.display = 'none';
    category.style.display = 'none';
    submit.style.display = 'none';
    back.innerHTML = `
      <button onclick="backfun()" id="btnBack"> back</button>
    `
    readData();
};

function serchData(value) {
    let table = '';
    for (let i = 0; i < proData.length; i++) {
        if (Moodsearch == 'title') {

            if (proData[i].title.includes(value.toLowerCase())) {
                table += `
                <tr>
                   <td>${i}</td>
                   <td>${proData[i].title}</td>
                   <td>${proData[i].price}</td>
                   <td>${proData[i].taxes}</td>
                   <td>${proData[i].ads}</td>
                   <td>${proData[i].discount}</td>
                   <td>${proData[i].total}</td>
                   <td>${proData[i].category}</td>
                   <td><button onclick='update(${i})' id="update">update</button></td>
                   <td><button onclick='deleteRecord(${i})' id="delete">delete</button></td>
               </tr>
               `
            }

        } else {
            if (proData[i].category.includes(value.toLowerCase())) {
                table += `
                    <tr>
                       <td>${i}</td>
                       <td>${proData[i].title}</td>
                       <td>${proData[i].price}</td>
                       <td>${proData[i].taxes}</td>
                       <td>${proData[i].ads}</td>
                       <td>${proData[i].discount}</td>
                       <td>${proData[i].total}</td>
                       <td>${proData[i].category}</td>
                       <td><button onclick='update(${i})' id="update">update</button></td>
                       <td><button onclick='deleteRecord(${i})' id="delete">delete</button></td>
                   </tr>
                   `
            }
        }
    }

    document.getElementById('tBody').innerHTML = table;
};

//back
function backfun() {
    title.style.display = 'block';
    price.style.display = 'inline';
    taxes.style.display = 'inline';
    ads.style.display = 'inline';
    discount.style.display = 'inline';
    total.style.display = 'inline';
    count.style.display = 'block';
    category.style.display = 'block';
    submit.style.display = 'block';
    back.style.display = 'none';
    searchCategory.style.background = '#466294';
    searchCategory.style.border = 'none';
    searchTitle.style.background = '#466294';
    searchTitle.style.border = 'none';
};