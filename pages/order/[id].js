import Image from "next/image";
import Layout from "../../components/Layout";
import { client } from "../../lib/client";
import css from "../../styles/OrderId.module.css";
import { UilBill, UilBox } from "@iconscout/react-unicons";
import Cooking from '../../assets/cooking.png'
import Onway from '../../assets/onway.png'
import Spinner from '../../assets/spinner.svg';
import { useEffect } from "react";

export default function Orders({ order }) {
    useEffect(() => {
        if (order.status>3) {
            localStorage.clear();
        }
    }, [order])

  return (
    <Layout>
      <div className={css.container}>
        <span className={css.heading}>Order in Process</span>
        <div className={css.details}>
          <div>
            <span>Order ID</span>
            <span>{order._id}</span>
          </div>

          <div>
            <span>Customer Name</span>
            <span>{order.name}</span>
          </div>

          <div>
            <span>Phone</span>
            <span>{order.phone}</span>
          </div>

          <div>
            <span>Method</span>
            <span>
              {order.method === 0 ? "Cash on Delivery" : "Online Payment"}
            </span>
          </div>

          <div>
            <span>Total</span>
            <span>$ {order.total}</span>
          </div>
        </div>

        {/* Status Div */}
        <div className={css.statusContainer}>
          <div className={css.status}>
            <UilBill width={50} height={50} />
            <span>Payment</span>
            {order.method === 0 ? (
              <span className={css.pending}> On Delivery</span>
            ) : (
              <span className={css.completed}>Completed</span>
            )}
          </div>

          <div className={css.status}>
            <Image alt='pic' src={Cooking} width={50} height={50} />
            <span>Cooking</span>
            {order.status === 1 && (
                <div className={css.spinner}>
                    <Image alt='pic' src={Spinner} />
                </div>
            )}

            {order.status> 1 && (
                <span className={css.completed}>Completed</span>
            )}
          </div>

          <div className={css.status}>
            <Image alt='pic' src={Onway} width={50} height={50} />
            <span>OnWay</span>
            {order.status === 2 && (
                <div className={css.spinner}>
                    <Image alt='pic' src={Spinner} />
                </div>
            )}
            {order.status> 2 && (
                <span className={css.completed}>Completed</span>
            )}
          </div>

          <div className={css.status}>
            <UilBox width={50} height={50} />
            <span>Delivered</span>
            {order.status === 3 && (
                <div className={css.spinner}>
                    <Image alt='pic' src={Spinner} />
                </div>
            )}
            {order.status> 3 && (
                <span className={css.completed}>Completed</span>
            )}
          </div>

        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const query = `*[_type == 'order' && _id == '${params.id}']`; // Enclose ${params.id} in quotes
  const orderResult = await client.fetch(query);
  const order = orderResult[0] || null;

  return {
    props: {
      order,
    },
  };
}
