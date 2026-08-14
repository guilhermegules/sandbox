import { useSelector } from "react-redux";

import { filterProducts } from "./store/products";

const Products = () => {
  const data = useSelector(filterProducts);

  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cor</th>
            <th>Preço</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ id, name, color, price }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{color}</td>
              <td>R$ {price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Products;
