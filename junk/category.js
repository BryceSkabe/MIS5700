import { React, ReactDOM } from "https://unpkg.com/es-react@16.8.60/index.js";
import htm from "https://unpkg.com/htm@2.2.1/dist/htm.mjs";
const html = htm.bind(React.createElement);

let artpieces = {
  products: [
    {
      name:
      "Lectern for the Reading of the Gospels with the Eagle of Saint John the Evangelist",
      description: "Giovanni Pisano",
      img: "https://images.metmuseum.org/CRDImages/md/original/DP167328.jpg",
      price: "104.99",
      id: 1
    },
    {
      name: "Relief: two servants bearing food and drink",
      description: "Achaemenid",
      img: "https://images.metmuseum.org/CRDImages/an/original/DP226593.jpg",
      price: "174.99",
      id: 2
    },
    {
      name:
      "Tomb Effigy Bust of Marie de France (1327-41), daughter of Charles IV of France and Jeanne d'Evreux",
      description: "Jean de Liège",
      img: "https://images.metmuseum.org/CRDImages/md/original/DT135.jpg",
      price: "144.99",
      id: 3
    }
  ],
  count: 8,
  pageNum: 2
};



function Artpiece(props) {
  const artpiece = props.artpiece;
  return html`
<div key=${artpiece.id} className="col-lg-4 col-md-6 col-mb-4">
<div className="card h-100">
<img
src=${"" + artpiece.img}
className="card-img-top"
alt="bootstraplogo"
/>
<div className="card-body">
<h5 className="card-title">${artpiece.name}</h5>
<p className="card-text"><i>${artpiece.description}</i></p>
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

function Artpieces(props) {
  return html`
${props.artpieces.map(function(artpiece) {
    return html`<${Artpiece} key=${artpiece.id} artpiece="${artpiece}" />`;
  })}`;
}

function Search() {
  const [searchTerm, setSearchTerm] = React.useState("");
  return html`
<form id="search" onSubmit=${e => {
    e.preventDefault();
    filterArtpieces(searchTerm);
  }} className="form-inline my-2 my-lg-0">
<input value=${searchTerm} onChange=${eventData =>
  setSearchTerm(
    eventData.target.value
  )} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
<button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
</form>`;
}
// create a copy of artpieces;
let filteredArtpieces = artpieces.products.slice();
function filterArtpieces(searchTerm) {
  filteredArtpieces = artpieces.products.filter(artpiece => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      artpiece.description.toLowerCase().includes(lowerSearchTerm) ||
      artpiece.name.toLowerCase().includes(lowerSearchTerm)
    );
  });

  render();
}

window.render = function render() {
  const vdom = html`
<${Artpieces} artpieces=${filteredArtpieces} />
`;
  console.log("vdom", vdom);
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

render();
