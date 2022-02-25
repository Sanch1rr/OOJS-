const getAllFood = async () => {
  let res = await fetch("https://dev-api.mstars.mn/api/foods", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let resp = await res.json();
  let foods = await resp.data;
  return foods;
};
//Food class that has properties: category, category_id, image, discount, price, name, stock
//and methods: addProduct, removeProduct
class Food {
  constructor(category, category_id, image, discount, price, name, stock) {
    this.category = category;
    this.category_id = category_id;
    this.image =
      "https://mtars-fooddelivery.s3.ap-southeast-1.amazonaws.com" + image;
    this.discount = discount;
    this.price = price;
    this.name = name;
    this.stock = stock;
  }
  addProduct() {
    this.stock += 1;
  }
  removeProduct() {
    this.stock -= 1;
  }
}

//create an array foods

//call getAllFoods() then create Food objects and push every Food objects to foods array
let foods = [];

//Generate HMTL function

// getAllFood()
//   .then((res) => res.json())
//   .then((res) => {
//     console.log(res.data);
//   });

let div = document.querySelector(".foods");

getAllFood().then((e) => {
  foods = e.map((e) => {
    return new Food(
      e.category,
      e.category_id,
      e.image,
      e.discount,
      e.price,
      e.name,
      e.stock
    );
  });
  foods.map((food) => {
    console.log(food);
    let card = document.createElement("p");
    card.innerHTML = `
     <div class="card">
      <img
      src=${food.image}
       alt=""
      class="mainImg"
      />
       <div class = "badge">${food.discount}%</div>
       <h2>${food.name}</h2>
       <div class = "price">
      <p class="activePrice">
       ${new Intl.NumberFormat().format(
         food.price - (food.price * food.discount) / 100
       )}
      ₮${" "}
      </p>
      <strike class ="strike-dark"
      <p>${new Intl.NumberFormat().format(food.price)}₮</p>
      </strike>
      <p id="${food.name}id">Stock: ${food.stock}</p>
      <div class="btns">
      <button id="${food.name}+">+</button>
      <button id="${food.name}-">-</button>
  
      </div>
      </div>
  
    </div> `;
    div.appendChild(card);
    document.getElementById(`${food.name}+`).addEventListener("click", () => {
      food.addProduct();
      document.getElementById(
        `${food.name}id`
      ).innerText = `Stock: ${food.stock}`;
    });
    document.getElementById(`${food.name}-`).addEventListener("click", () => {
      food.removeProduct();
      document.getElementById(
        `${food.name}id`
      ).innerText = `Stock: ${food.stock}`;
    });
  });
});
