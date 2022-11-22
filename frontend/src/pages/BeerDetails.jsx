import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { moneyConverterJmdToEur } from "../utils/constants";
import CartContext from "../context/Cart/CartContext";

function BeerDetails() {
  const { addToCart } = useContext(CartContext);
  const [dataBeer, setDataBeer] = useState([]);
  const { id } = useParams();
  const getBeer = () => {
    axios.get(`https://api.punkapi.com/v2/beers/${id}`).then((response) => {
      setDataBeer(response.data);
    });
  };
  useEffect(() => {
    getBeer();
  }, [id]);

  if (dataBeer.length === 0) return <div>Loading ...</div>;

  return (
    <div className=" borderflex flex-col justify-center my-5 h-full text-center w-[60%] m-auto ">
      <div className="p-2 flex flex-col items-center ">
        <img
          className="h-52 w-16 "
          src={dataBeer[0].image_url}
          alt="Une biere"
        />
        <p className="font-fun text-2xl">
          {" "}
          <br />
          {dataBeer[0].name}
        </p>

        <p>
          {" "}
          <br />
          {dataBeer[0].description}
        </p>
        <div className="flex flex-col items-center ">
          <p>
            {" "}
            <br />
            ABV (Alcohol By Volume) : {dataBeer[0].abv}%
          </p>
          <p>IBU (International Bitterness Unit) : {dataBeer[0].ibu}</p>
          <p>EBC (European Brewery Convention) : {dataBeer[0].ebc}</p>
          <p>SRM (Standard Reference Method) : {dataBeer[0].srm}</p>
          <p>pH : {dataBeer[0].ph}</p>
          <p className="font-bold">
            {" "}
            <br />
            INGREDIENTS
          </p>
          <p className="font-bold">
            {" "}
            <br />
            Malt :{" "}
          </p>
          <ul>
            {dataBeer[0].ingredients.malt.map((item) => (
              <li>{item.name}</li>
            ))}
          </ul>
          <p className="font-bold">
            {" "}
            <br />
            Hops :{" "}
          </p>
          <div className="flex flex-row ">
            <ul className="mr-16">
              {dataBeer[0].ingredients.hops.map((item) => (
                <li>{item.name}</li>
              ))}
            </ul>
            <ul>
              {dataBeer[0].ingredients.hops.map((item) => (
                <p>({item.add})</p>
              ))}
            </ul>
          </div>
          <p>Yeast : {dataBeer[0].ingredients.yeast}</p>
          <p className="font-bold">
            {" "}
            <br />
            FOOD PAIRING
          </p>
          <ul>
            {dataBeer[0].food_pairing.map((item) => (
              <li>{item}</li>
            ))}
          </ul>

          <p className=" text-bargreen font-semibold ">
            {moneyConverterJmdToEur(dataBeer[0].target_fg).toFixed(2)} €
          </p>

          <motion.button
            whileHover={{ scale: 1.2 }}
            type="button"
            onClick={() => addToCart(dataBeer[0])}
            className="text-sm bg-bargreen rounded-md flex justify-center items-center   text-white h-full w-1/4"
          >
            Add to <FaShoppingCart />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default BeerDetails;
