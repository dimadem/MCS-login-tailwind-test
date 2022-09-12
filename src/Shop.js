import React, { useState, useEffect } from "react";
import Item from "./Item";

/*
Shop.js рендерит по одному <Item /> 
на каждый элемент полученного списка
передать информацию о товаре через атрибут info

Item.js  рендерит название, описание и фото.

Cтили
*/

export default function Shop(props) {
  const [item, setItem] = useState();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    (async () => {
      setLoad(true);
      try {
        const response = await fetch("https://covid-shop-mcs.herokuapp.com");
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoad(false);
      }
    })();
  }, []);

  console.log(item, "item log");

  return (
    <div className="shop">
      <ul>
        {item &&
          item.map((i) => (
            <li key={i.id}>
              <Item name={i.name} desc={i.desc} image={i.image} />
            </li>
          ))}
      </ul>
    </div>
  );
}
