import React, { useEffect, useState } from "react";
import css from "../styles/Header.module.css";
import Image from "next/image";
import Logo from "../assets/Logo.png";
import { UilShoppingBag, UilReceipt } from "@iconscout/react-unicons";
import { useStore } from "../store/store";
import Link from "next/link";

const Header = () => {
  const length = useStore((state) => state.cart.pizzas.length);
  const [Order, setOrder] = useState('');

  useEffect(() => {
    setOrder(localStorage.getItem('order'));
  }, [])

  return (
    <header className={css.header}>
      {/* Logo side */}
      <div className={css.logo}>
        <Image src={Logo} alt="logo" width={50} height={50} />
        <span>Fudo</span>
      </div>
      {/* Menu side */}
      <ul className={css.menu}>
        <li>
          <a href="/">Home</a>
        </li>
        <li>Menu</li>
        <li>Contact</li>
      </ul>
      {/* Cart side */}
      <div className={css.rightSide}>
        <Link href= '/cart'>
          <div className={css.cart}>
            <UilShoppingBag size={35} color="#2E2E2E" />
            <div className={css.badge}>{length}</div>
          </div>
        </Link>

        {Order && (
          <Link href={`/order/${Order}`}>
            <div className={css.cart}>
              <UilReceipt size={35} color='#2E2E2E' />
              {Order != "" && <div className={css.badge}>1</div>}
            </div>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
