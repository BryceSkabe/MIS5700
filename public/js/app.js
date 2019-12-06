import { React, ReactDOM } from "https://unpkg.com/es-react@16.8.60/index.js";
import htm from "https://unpkg.com/htm@2.2.1/dist/htm.mjs";
const html = htm.bind(React.createElement);
let artpieces;
let filteredArtpieces;

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
          <p className="card-price">$${artpiece.price} usd</p>
        <div
        onClick=${() =>
          setShoppingCartQuantity(
            artpiece,
            currentQuantity => currentQuantity + 1
          )}
        className="btn btn-primary"
        >Add to Cart</div
        >
        </div>
      </div>
    </div>
  `;
}

function SortCriteria(props) {
  // The below uncommented line is the same as:
  // const name = props.name;
  // const checked = props.checked
  const { name, checked, onSortPropChange } = props;
  const id = `sort-${name}`;
  return html`
    <span className="sort-prop mx-2">
      <input
        onChange=${e => onSortPropChange(e.target.checked, name)}
        checked=${checked}
        className="mx-1"
        type="radio"
        id=${id}
        name="sortbyprop"
      />
      <label className="mx-1" htmlFor=${id}>${name}</label>
    </span>
  `;
}

function SortingOptions(props) {
  const {
    artpiece,
    sortProp,
    onSortPropChange,
    sortOrder,
    onSortOrderChange
  } = props;
  // props to exclude from the sort
  const propsExcludedFromSort = new Set(["id", "img"]);
  const searchableProps = Object.keys(artpiece)
    // filter out excluded props
    .filter(keyProperty => !propsExcludedFromSort.has(keyProperty))
    // map the keys/props to React Components.
    .map(
      (keyProperty, index) => html`
        <${SortCriteria}
          key=${keyProperty}
          name=${keyProperty}
          onSortPropChange=${onSortPropChange}
          checked=${keyProperty === sortProp}
        />
      `
    );
  return html`
    <div className="col-md-12 row">
      <div className="col-md-6">
        Sort By:
        <br />
        ${searchableProps}
      </div>
      <div className="col-md-6">
        Sort:
        <br />
        <span className="mx-2">
          <input
            onChange=${e => onSortOrderChange(e.target.checked, "ascending")}
            className="mx-1"
            type="radio"
            checked=${sortOrder === "ascending"}
            id="sort-ascending"
            name="sortorder"
          />
          <label className="mx-1" htmlFor="sort-ascending">Ascending</label>
        </span>
        ${" "}
        <span className="mx-2">
          <input
            onChange=${e => onSortOrderChange(e.target.checked, "descending")}
            className="mx-1"
            checked=${sortOrder === "descending"}
            type="radio"
            id="sort-descending"
            name="sortorder"
          />
          <label className="mx-1" htmlFor="sort-descending">Descending</label>
        </span>
      </div>
    </div>
  `;
}

function sortArtPieces(artpieces, sortProp, sortOrder) {
  return artpieces.sort((focusedArtpiece, alternateArtpiece) => {
    const moveFocusedArtpieceLeft = -1,
      moveFocusedArtpieceRight = 1,
      dontMoveEitherArtpiece = 0;
    if (focusedArtpiece[sortProp] < alternateArtpiece[sortProp]) {
      if (sortOrder === "ascending") {
        // move focusedWatch left of alternateWatch
        return moveFocusedArtpieceLeft;
      } else {
        // move focusedWatch right of alternateWatch
        return moveFocusedArtpieceRight;
      }
    } else if (focusedArtpiece[sortProp] > alternateArtpiece[sortProp]) {
      if (sortOrder === "ascending") {
        // move focusedWatch right of alternateWatch
        return moveFocusedArtpieceRight;
      } else {
        // move focusedWatch left of alternateWatch
        return moveFocusedArtpieceLeft;
      }
    } else {
      // Both watches are equal don't move either.
      return dontMoveEitherArtpiece;
    }
  });
}

function setShoppingCartQuantity(
  cartItem,
  updateQuantity = quantity => quantity + 1
) {
  const shoppingCartItem = shoppingCartData.cartProducts.find(
    item => item.id === cartItem.id
  );
  if (shoppingCartItem) {
    shoppingCartItem.quantity = updateQuantity(shoppingCartItem.quantity);
  } else {
    // the ... is the spread operator
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    shoppingCartData.cartProducts.push({
      ...cartItem,
      quantity: updateQuantity(0)
    });
  }
  setShoppingCartOrder();
  render()
}

function setShoppingCartOrder() {
  let total = 0;
  for (const item of shoppingCartData.cartProducts) {
    total += item.price * item.quantity;
  }
  shoppingCartData.order.total = total;
}

function ShoppingCartItem(props) {
  const item = props.cartItem;
  return html`
    <div className="row p-2">
      <img
        style=${{ width: "100%" }}
        src=${""+ item.image}
        alt=${item.name}
      />
      <div className="flex-direction-column p-2">
        <h6 className="">${item.name}</h6>
        <div className="text-muted">price: $${item.price}</div>
        <div className="text-muted">quantity: ${item.quantity}</div>
      </div>
    </div>
  `;
}

function ShoppingCart(props) {
  const items = props.shoppingCart.cartProducts;
  return html`
    <div className="dropdown px-2">
      <div data-toggle="dropdown" className="row align-items-center px-2">
        <div className="fa fa-shopping-cart mx-2"></div>
        <div
          id="shopping-cart-toggle"
          className="dropdown-toggle"
          data-toggle="dropdown"
        ></div>
      </div>

      <div
        className="dropdown-menu dropdown-menu-right p-2"
        aria-labelledby="dropdownMenuButton"
      >
        <!--Below lines are using ternary operators-->
        <!--https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator-->
        ${items.length > 0
          ? `Total Price: $${props.shoppingCart.order.total}`
          : ""}
        ${items.length === 0 ? "No items in Cart" : ""}
        ${items.map(
          cartItem =>
            html`
              <${ShoppingCartItem} key=${cartItem.id} cartItem=${cartItem} />
            `
        )}
      </div>
    </div>
  `;
}

function TopBar(props) {
  return html`
    <div className="row align-items-center">
      <${Search} />
      <${ShoppingCart} shoppingCart=${props.shoppingCart} />
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
  ReactDOM.render(vdom, document.getElementById("displayartdiv"));
  ReactDOM.render(
    html`
      <${TopBar} shoppingCart=${shoppingCartData} />
    `,
    document.getElementById("search")
  );
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

let search = document.location.search.toString();
search = search.substr(1, search.length - 1);
if(search !== undefined){
  let request = '/api/search/'+search;
  fetch(request).then(response => {
      if (response.ok) {
       return response.json();
      } else {
        throw Error("Something went wrong with that request:", response.statusText);
      }
  }).then(function (data) {
    console.log(data);
    console.log("returned stuff");
    artpieces = data;
    filteredArtpieces = artpieces['products'];
    render();
  });
}
