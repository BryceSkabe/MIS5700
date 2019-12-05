import { React, ReactDOM } from "https://unpkg.com/es-react@16.8.60/index.js";
import htm from "https://unpkg.com/htm@2.2.1/dist/htm.mjs";
const html = htm.bind(React.createElement);
let artpieces = {};
let filteredArtpieces = {};
const shoppingCartData = {
  "order": {
      "orderId": 1,
      "orderDate": new Date().toISOString(),
      "total": 0,
      "userID": 1,
      "completed": 0
  },
  "cartProducts": []
}

// Takes a object and creates an html element
function Artpiece(props) {
  const artpiece = props.artpiece;
  return html`
    <div key=${artpiece.id} className="col-lg-4 col-md-6 col-mb-4">
      <div className="card h-100">
        <img
        src=${"" + artpiece.image}
        className="card-img-top"
        innerHeight='50px'
        alt="bootstraplogo"
        />
        <div className="card-body">
          <h5 className="card-title">${artpiece.title}</h5>
          <p className="card-text"><i>${artpiece.artist}</i></p>
          <p className="card-price">${artpiece.price}</p>
        <div
        onClick=${() => toggleCart(artpiece)}
        className="btn btn-primary"
        >Add to Cart</div
        >
        </div>
      </div>
    </div>
  `;
}

// Maps list to html object
function Artpieces(props) {
  return html`
    ${props.artpieces.map(function(artpiece) {
      return html`<${Artpiece} key=${artpiece.id} artpiece="${artpiece}" />`;
    })}`;
}

// Adds serach functionality to search bar
function Search() {
  const [searchTerm, setSearchTerm] = React.useState("");
  return html`
    <form id="search" onSubmit=${e => {
      e.preventDefault();
      filterArtpieces(searchTerm);
    }} 
    className="form-inline my-2 my-lg-0">
    <input value=${searchTerm} onChange=${eventData => setSearchTerm( eventData.target.value)} 
    className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
  </form>`;
}

// create a copy of artpieces
// let filteredArtpieces = artpieces.slice(0,20);
// function filterArtpieces(searchTerm) {
//   filteredArtpieces = artpieces.products.filter(artpiece => {
//     const lowerSearchTerm = searchTerm.toLowerCase();
//     return (
//       artpiece.description.toLowerCase().includes(lowerSearchTerm) ||
//       artpiece.name.toLowerCase().includes(lowerSearchTerm)
//     );
//   });

//   render();
// }

window.render = function render() {
  const vdom = html`
    <${Artpieces} artpieces=${filteredArtpieces} />
  `;
  ReactDOM.render(vdom, document.getElementById("displayartdiv"));
  ReactDOM.render(html`<${Search} />`, document.getElementById("search"));
};

function toggleCart(artpiece) {
  for (var i = 0; i < artpieces.products.length; ++i) {
    if (artpieces.products[i].id !== artpiece.id) {
      continue;
    }
    const price = artpieces.products[i].price;
    if (price.endsWith("!")) {
      artpieces.products[i].price = price.replace(
        "Added to cart!",
        "Removed from cart."
      );
    } else {
      artpieces.products[i].price = price.replace(price, "Added to cart!");
    }
  }
  render();
}

fetch('/api/getAll').then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw Error("Something went wrong with that request:", response.statusText);
    }
}).then(function (data) {
  artpieces = data;
  filteredArtpieces = artpieces['products'];
  console.log(artpieces['products']);
  render();
});
