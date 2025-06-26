
import React, { useState } from 'react'
import { BsListCheck, BsPlus, BsSearch, BsThreeDotsVertical, BsExclamationTriangle, BsBell, BsEnvelope } from 'react-icons/bs'
import ReactECharts from 'echarts-for-react'

function Inventory() {
  const [inventory, setInventory] = useState([
    { id: 1, product: 'iPhone 14', sku: 'IP14-001', category: 'Electronics', stock: 25, minStock: 10, price: '$899', status: 'In Stock' },
    { id: 2, product: 'Nike Air Max', sku: 'NAM-002', category: 'Footwear', stock: 5, minStock: 15, price: '$129', status: 'Low Stock' },
    { id: 3, product: 'Samsung TV 55"', sku: 'STV-003', category: 'Electronics', stock: 0, minStock: 5, price: '$599', status: 'Out of Stock' },
    { id: 4, product: 'Coffee Maker', sku: 'CM-004', category: 'Appliances', stock: 18, minStock: 8, price: '$89', status: 'In Stock' },
    { id: 5, product: 'Gaming Chair', sku: 'GC-005', category: 'Furniture', stock: 12, minStock: 10, price: '$299', status: 'In Stock' },
  ])

  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Low stock alert: Nike Air Max', type: 'warning', time: '5 min ago' },
    { id: 2, message: 'Out of stock: Samsung TV 55"', type: 'critical', time: '10 min ago' }
  ])

  const stockLevels = {
    inStock: inventory.filter(item => item.stock > item.minStock).length,
    lowStock: inventory.filter(item => item.stock > 0 && item.stock <= item.minStock).length,
    outOfStock: inventory.filter(item => item.stock === 0).length
  }

  const sendStockAlert = () => {
    const newAlert = {
      id: notifications.length + 1,
      message: 'Stock alert notification sent to admin',
      type: 'info',
      time: 'Just now'
    }
    setNotifications([newAlert, ...notifications])
    alert('Stock alert sent to local admin!')
  }

  const sendEmailReport = () => {
    alert('Inventory report email sent to admin@company.com')
  }

  const chartOption = {
    title: {
      text: 'Stock Level Distribution',
      left: 'center',
      textStyle: { 
        color: '#333', 
        fontSize: 18,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} items ({d}%)',
      backgroundColor: 'rgba(50, 50, 50, 0.9)',
      borderColor: '#667eea',
      borderWidth: 1,
      textStyle: {
        color: '#fff'
      }
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'middle',
      textStyle: {
        color: '#555',
        fontSize: 12
      }
    },
    series: [
      {
        name: 'Stock Status',
        type: 'pie',
        radius: '70%',
        center: ['60%', '50%'],
        data: [
          { value: stockLevels.inStock, name: 'In Stock', itemStyle: { color: '#91cc75' } },
          { value: stockLevels.lowStock, name: 'Low Stock', itemStyle: { color: '#fac858' } },
          { value: stockLevels.outOfStock, name: 'Out of Stock', itemStyle: { color: '#ee6666' } }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        labelLine: {
          show: false
        },
        label: {
          show: true,
          position: 'inside',
          formatter: '{d}%',
          fontSize: 12,
          fontWeight: 'bold'
        }
      }
    ]
  }

  const getStatusIcon = (status) => {
    if (status === 'Low Stock' || status === 'Out of Stock') {
      return <BsExclamationTriangle className='warning-icon' />
    }
    return null
  }

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>INVENTORY - LOCAL ADMIN</h3>
        <div className='admin-controls'>
          <button className='btn-secondary' onClick={sendStockAlert}>
            <BsBell className='icon' /> Send Alert
          </button>
          <button className='btn-secondary' onClick={sendEmailReport}>
            <BsEnvelope className='icon' /> Email Report
          </button>
          <button className='btn-primary'>
            <BsPlus className='icon' /> Add Product
          </button>
        </div>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3>TOTAL PRODUCTS</h3>
            <BsListCheck className='card_icon'/>
          </div>
          <h1>{inventory.length}</h1>
        </div>
        <div className='card success'>
          <div className='card-inner'>
            <h3>IN STOCK</h3>
            <BsListCheck className='card_icon'/>
          </div>
          <h1>{stockLevels.inStock}</h1>
        </div>
        <div className='card warning'>
          <div className='card-inner'>
            <h3>LOW STOCK</h3>
            <BsExclamationTriangle className='card_icon'/>
          </div>
          <h1>{stockLevels.lowStock}</h1>
        </div>
        <div className='card danger'>
          <div className='card-inner'>
            <h3>OUT OF STOCK</h3>
            <BsExclamationTriangle className='card_icon'/>
          </div>
          <h1>{stockLevels.outOfStock}</h1>
        </div>
      </div>

      <div className='admin-panel'>
        <div className='notifications-section'>
          <h4><BsBell className='icon' /> Stock Alerts</h4>
          <div className='notifications-list'>
            {notifications.slice(0, 3).map(notification => (
              <div key={notification.id} className={`notification-item ${notification.type}`}>
                <div className='notification-content'>
                  <span className='notification-message'>{notification.message}</span>
                  <span className='notification-time'>{notification.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='charts'>
        <div className='chart-container'>
          <ReactECharts option={chartOption} style={{ height: '400px' }} />
        </div>
      </div>

      <div className='table-container'>
        <div className='table-header'>
          <h3>Inventory List</h3>
          <div className='search-box'>
            <BsSearch className='search-icon' />
            <input type="text" placeholder="Search products..." />
          </div>
        </div>
        <div className='table-wrapper'>
          <table className='data-table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Min Stock</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.product}</td>
                  <td>{item.sku}</td>
                  <td>{item.category}</td>
                  <td>{item.stock}</td>
                  <td>{item.minStock}</td>
                  <td>{item.price}</td>
                  <td>
                    <span className={`status ${item.status.replace(' ', '-').toLowerCase()}`}>
                      {getStatusIcon(item.status)}
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <BsThreeDotsVertical className='action-icon' />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}

export default Inventory
