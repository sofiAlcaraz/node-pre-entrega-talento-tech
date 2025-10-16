import { argv } from "process";

const getProducts = () => {
  fetch("https://fakestoreapi.com/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status:${response.status}`);
      } else {
        return response.json();
      }
    })
    .then((data) => console.log(data))
    .catch((error) => {
      console.error(error);
    });
};

const getProduct = (id) => {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status:${response.status}`);
      } else {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data);
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};

const postProduct = async (newTitle, newPrice) => {
  const product = { title: newTitle, price: parseInt(newPrice) };
  fetch("https://fakestoreapi.com/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  })
    .then((response) => {
      if (!response.status == 201) {
        throw new Error(`HTTP error! status:${response.status}`);
      } else {
        console.log("Producto Creado!");
        return response.json();
      }
    })
    .then((data) => console.log(data))
    .catch((error) => {
      console.error(error);
    });
};

const editProduct = async (id, newTitle, newPrice) => {
  const product = { title: newTitle, price: newPrice };

  fetch(`https://fakestoreapi.com/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status:${response.status}`);
      } else {
        console.log("Editado con exito");
        return response.json();
      }
    })
    .then((data) => console.log(data))
    .catch((error) => {
      console.error(error);
    });
};

const deleteProduct = async (id) => {
  fetch(`https://fakestoreapi.com/products/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        console.log("Producto borrado con exito!");
        return response.json();
      }
    })
    .then((data) => console.log(data))
    .catch((error) => {
      console.error(error);
    });
};

let [, , command, resource] = argv;
command = command.toLowerCase();
resource = resource.toLowerCase();

const typeCommand = ["put", "get", "delete", "post"];

if (typeCommand.includes(command) == false) {
  console.log("Comando no encontrada");
  process.exit();
}
let id = resource ? resource.split("/")[1] : null; // split separa ['products', '3']
id = parseInt(id);

if (isNaN(id) && command == "get") {
  //isNaN(id) &&
  getProducts();
} else if (command == "get") {
  getProduct(id);
} else if (command == "post") {
  const [title, price] = argv.slice(4);
  postProduct(title, price);
} else if (command == "put") {
  const [title, price] = argv.slice(4);
  editProduct(id, title, price);
} else if (command == "delete") {
  deleteProduct(id);
}
