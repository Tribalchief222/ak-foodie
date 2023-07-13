import { Modal, useMantineTheme } from "@mantine/core";
import css from "../styles/Order.module.css";
import React from "react";
import { createOrder } from "../lib/orderHandler";
import { Toaster, toast } from "react-hot-toast";
import { useStore } from "../store/store";
import { useRouter } from "next/router";

const OrderModal = ({ opened, setOpened, paymentMethod }) => {
  const theme = useMantineTheme();
  const router = useRouter();
  const [formData, setFormData] = React.useState({});
  const resetCart = useStore((state) => state.resetCart);

  const total =
    typeof window !== "undefined" ? localStorage.getItem("total") : null;

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = await createOrder({ ...formData, total, paymentMethod });
    toast.success("Order Placed");
    resetCart();
    {
      typeof window !== "undefined" && localStorage.setItem("order", id);
    }
    router.push(`/order/${id}`);
  };

  if (typeof window === "undefined") {
    return null; // Render nothing during server-side rendering
  }

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={opened}
      onClose={() => setOpened(null)}
    >
      {/* Modal content */}
      <form onSubmit={handleSubmit} className={css.formContainer}>
        <input
          onChange={handleInput}
          type="text"
          name="name"
          required
          placeholder="Name"
        />
        <input
          onChange={handleInput}
          type="text"
          name="phone"
          required
          placeholder="Phone"
        />
        <textarea
          onChange={handleInput}
          name="address"
          rows="3"
          placeholder="Address"
        ></textarea>
        {total && (
          <span>
            You will pay <span>$ {total}</span> on delivery
          </span>
        )}
        <button type="submit" className="btn">
          Place Order
        </button>
      </form>
      <Toaster />
    </Modal>
  );
};

export default OrderModal;
