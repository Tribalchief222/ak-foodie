import React from "react";
import css from "../styles/Menu.module.css";
import Image from "next/image";
import { urlFor } from "../lib/client";
import Link from "next/link";

const Menu = ({ pizzas }) => {
//   console.log(pizzas);

  return (
    <div className={css.container}>
      {/* Heading */}
      <div className={css.heading}>
        <span>OUR MENU</span>
        <span>Menu That Always</span>
        <span>Make you Fall In Love</span>
      </div>

      {/* Pizzas Data from Prop */}
      <div className={css.menu}>
        {pizzas?.map((pizza, id) => {
          const src = urlFor(pizza?.image).url();

          return (
            <div className={css.pizza} key={id}>
              <div className={css.imageWrapper}>
                <Link href={`./pizza/${pizza?.slug?.current}`}>
                  <Image
                    loader={() => src}
                    src={src}
                    alt={pizza?.name}
                    objectFit="cover"
                    layout="fill"
                  />
                </Link>
              </div>
              <span>{pizza?.name}</span>
              <span>
                <span style={{ color: "var(--themeRed)", fontSize: "1.6rem" }}>
                  $
                </span>{" "}
                {pizza?.price[0]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
