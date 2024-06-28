let arr = [];

// Fetch products
fetch('https://fakestoreapi.com/products')
  .then((response) => response.json())
  .then((data) => {
    arr = data;
    render(arr);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });

// Render function
function render(data) {
  console.log(data);

  let myshow = document.getElementById('show');
  myshow.innerHTML = ''; // Clear previous content
  data.forEach(function (d) {
    let { price } = d;
    let color = price >= 300 ? "red" : price > 100 ? "green" : "orange";
    let ele = `
      <div class="box1 box">
        <div class="box-content">
          <h2>${d.category}</h2>
          <div class="box-img" style="background-image: url(${d.image})"></div>
          <h3 style="color: ${color}">${d.price}</h3>
          <p class='para1'>${d.title}</p>
          <p class='para2'>${d.description}</p>
        </div>
      </div>`;
    myshow.innerHTML += ele;
  });
}

// Button click function for category filtering
function btn() {
  let myinp = document.getElementById('inp');
  const filtered1 = arr.filter((d) => d.category.toUpperCase().includes(myinp.value.toUpperCase()));
  render(filtered1);
}

// Event listener for priority dropdown
let priority_dropdown = document.getElementById("priority");
priority_dropdown.addEventListener("change", function () {
  let priorityFiltered;
  if (this.value === "high") {
    priorityFiltered = arr.filter((d) => d.price >= 300);
    console.log(priorityFiltered);
  } else if (this.value === "medium") {
    priorityFiltered = arr.filter((d) => d.price > 100 && d.price < 300);
  } else if (this.value === "low") {
    priorityFiltered = arr.filter((d) => d.price <= 100);
  } else {
    priorityFiltered = arr; // Show all if no priority is selected
  }
  
  render(priorityFiltered);
});