import React, { useContext, useEffect, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'
import { toast } from 'react-toastify'

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext)
  const [orderData, setorderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) return

      const response = await axios.post(`${backendUrl}/api/order/userorders`, {}, { headers: { token } })

      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.forEach(order => {
          order.items.forEach(item => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            item['id'] = order._id
            item['ordercancel'] = order.ordercancel
            allOrdersItem.push(item)
          })
        })

        setorderData(allOrdersItem.filter((item => !item.ordercancel)).reverse())

      }
    } catch (error) {
      console.error('Order load failed:', error)
    }
  }

  const cancelOrder = (id) => {
    confirmAlert({
      title: 'Confirm Cancel',
      message: 'Are you sure you want to cancel this order?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              if (!token) return;

              const response = await axios.put(
                `${backendUrl}/api/order/cancelorder`,
                { orderId: id },
                { headers: { token } }
              );

              toast.success(response.data.message);
              loadOrderData();
            } catch (error) {
              console.error('Order cancel failed:', error);
              toast.error('Failed to cancel order.');
            }
          }
        },
        {
          label: 'No',
          onClick: () => console.log('Cancel aborted')
        }
      ]
    });
  };



  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <div className='border-t pt-16 px-4 sm:px-6 md:px-10 lg:px-16 mb-[110px]'>
      <div className='text-2xl mb-12'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div className='space-y-6'>
        {orderData.map((item, index) => (
          <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-6'>
            <div className='flex flex-col sm:flex-row gap-4 text-sm'>
              <img className='w-20 sm:w-24 object-contain' src={item.image[0]} alt={item.name} />
              <div>
                <p className='sm:text-base font-medium'>{item.name}</p>
                <div className='flex flex-wrap items-center gap-4 mt-1 text-base text-gray-700'>
                  <p>{currency}{item.price}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className='mt-1 text-sm'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                <p className='mt-1 text-sm'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
              </div>
            </div>

            <div className='md:w-1/2 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4 md:mt-0'>
              <div className='flex items-center gap-2 mt-2 md:mt-0'>
                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                <p className='text-sm md:text-base'>{item.status}</p>
              </div>
              {/* Buttons */}
              <div className='flex gap-2 flex-wrap md:flex-nowrap'>
                <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
                <button onClick={() => { cancelOrder(item.id) }} className='border px-4 py-2 text-sm font-medium rounded-sm'>Cancel Order</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
