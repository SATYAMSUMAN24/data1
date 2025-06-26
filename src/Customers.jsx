
import React, { useState } from 'react'
import { BsPeopleFill, BsPlus, BsSearch, BsThreeDotsVertical, BsEnvelope, BsTelephone, BsBell, BsMailbox, BsPersonFill } from 'react-icons/bs'
import ReactECharts from 'echarts-for-react'

function Customers() {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Doe', email: 'john@email.com', phone: '+1 234-567-8901', orders: 15, totalSpent: '$2,450', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@email.com', phone: '+1 234-567-8902', orders: 8, totalSpent: '$1,200', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@email.com', phone: '+1 234-567-8903', orders: 22, totalSpent: '$3,800', status: 'VIP' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@email.com', phone: '+1 234-567-8904', orders: 3, totalSpent: '$450', status: 'New' },
    { id: 5, name: 'David Brown', email: 'david@email.com', phone: '+1 234-567-8905', orders: 0, totalSpent: '$0', status: 'Inactive' },
  ])

  const [adminSettings, setAdminSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    orderAlerts: true,
    lowStockAlerts: true
  })

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'email', message: 'New customer John Doe registered', time: '2 min ago', read: false },
    { id: 2, type: 'order', message: 'Order #1234 completed', time: '5 min ago', read: false },
    { id: 3, type: 'stock', message: 'Low stock alert for Nike Air Max', time: '10 min ago', read: true }
  ])

  const sendEmail = (customer) => {
    alert(`Email sent to ${customer.name} at ${customer.email}`)
  }

  const sendNotification = (message) => {
    const newNotification = {
      id: notifications.length + 1,
      type: 'admin',
      message: message,
      time: 'Just now',
      read: false
    }
    setNotifications([newNotification, ...notifications])
  }

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const chartOption = {
    title: {
      text: 'Customer Distribution',
      left: 'center',
      textStyle: { 
        color: '#333', 
        fontSize: 18,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(50, 50, 50, 0.9)',
      borderColor: '#667eea',
      borderWidth: 1,
      textStyle: {
        color: '#fff'
      },
      formatter: function(params) {
        return `${params[0].name}: ${params[0].value} customers`;
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['New', 'Active', 'VIP', 'Inactive'],
      axisLabel: {
        color: '#666',
        fontSize: 12
      },
      axisLine: {
        lineStyle: {
          color: '#ddd'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#666',
        fontSize: 12
      },
      axisLine: {
        lineStyle: {
          color: '#ddd'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#f0f0f0'
        }
      }
    },
    series: [
      {
        name: 'Customers',
        type: 'bar',
        barWidth: '60%',
        data: [
          { value: 1, itemStyle: { color: '#667eea' } },
          { value: 2, itemStyle: { color: '#91cc75' } },
          { value: 1, itemStyle: { color: '#fac858' } },
          { value: 1, itemStyle: { color: '#ee6666' } }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>CUSTOMERS - LOCAL ADMIN</h3>
        <div className='admin-controls'>
          <button className='btn-secondary' onClick={() => sendNotification('Admin broadcast message sent')}>
            <BsBell className='icon' /> Send Notification
          </button>
          <button className='btn-secondary' onClick={() => alert('Bulk email sent to all customers')}>
            <BsMailbox className='icon' /> Bulk Email
          </button>
          <button className='btn-primary'>
            <BsPlus className='icon' /> Add Customer
          </button>
        </div>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3>TOTAL CUSTOMERS</h3>
            <BsPeopleFill className='card_icon'/>
          </div>
          <h1>{customers.length}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>ACTIVE CUSTOMERS</h3>
            <BsPeopleFill className='card_icon'/>
          </div>
          <h1>{customers.filter(customer => customer.status === 'Active' || customer.status === 'VIP').length}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>NOTIFICATIONS</h3>
            <BsBell className='card_icon'/>
          </div>
          <h1>{notifications.filter(n => !n.read).length}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>ADMIN ACTIVE</h3>
            <BsPersonFill className='card_icon'/>
          </div>
          <h1>Local</h1>
        </div>
      </div>

      <div className='admin-panel'>
        <div className='notifications-section'>
          <h4><BsBell className='icon' /> Recent Notifications</h4>
          <div className='notifications-list'>
            {notifications.slice(0, 3).map(notification => (
              <div key={notification.id} className={`notification-item ${notification.read ? 'read' : 'unread'}`}>
                <div className='notification-content'>
                  <span className='notification-message'>{notification.message}</span>
                  <span className='notification-time'>{notification.time}</span>
                </div>
                {!notification.read && (
                  <button className='mark-read-btn' onClick={() => markAsRead(notification.id)}>
                    Mark as Read
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className='admin-settings'>
          <h4><BsPersonFill className='icon' /> Admin Settings</h4>
          <div className='settings-toggles'>
            <label>
              <input 
                type="checkbox" 
                checked={adminSettings.emailNotifications}
                onChange={(e) => setAdminSettings({...adminSettings, emailNotifications: e.target.checked})}
              />
              Email Notifications
            </label>
            <label>
              <input 
                type="checkbox" 
                checked={adminSettings.orderAlerts}
                onChange={(e) => setAdminSettings({...adminSettings, orderAlerts: e.target.checked})}
              />
              Order Alerts
            </label>
            <label>
              <input 
                type="checkbox" 
                checked={adminSettings.lowStockAlerts}
                onChange={(e) => setAdminSettings({...adminSettings, lowStockAlerts: e.target.checked})}
              />
              Low Stock Alerts
            </label>
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
          <h3>Customers List</h3>
          <div className='search-box'>
            <BsSearch className='search-icon' />
            <input type="text" placeholder="Search customers..." />
          </div>
        </div>
        <div className='table-wrapper'>
          <table className='data-table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>
                    <div className='contact-info'>
                      <div><BsEnvelope className='contact-icon' /> {customer.email}</div>
                      <div><BsTelephone className='contact-icon' /> {customer.phone}</div>
                    </div>
                  </td>
                  <td>{customer.orders}</td>
                  <td>{customer.totalSpent}</td>
                  <td>
                    <span className={`status ${customer.status.toLowerCase()}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td>
                    <button className='action-btn' onClick={() => sendEmail(customer)}>
                      <BsEnvelope />
                    </button>
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

export default Customers
