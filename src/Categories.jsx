
import React from 'react'
import { BsFillGrid3X3GapFill, BsPlus, BsSearch, BsThreeDotsVertical } from 'react-icons/bs'
import ReactECharts from 'echarts-for-react'

function Categories() {
  const categories = [
    { id: 1, name: 'Electronics', products: 45, revenue: '$12,500', status: 'Active' },
    { id: 2, name: 'Clothing', products: 78, revenue: '$8,900', status: 'Active' },
    { id: 3, name: 'Books', products: 32, revenue: '$3,200', status: 'Active' },
    { id: 4, name: 'Sports', products: 23, revenue: '$5,600', status: 'Inactive' },
    { id: 5, name: 'Home & Garden', products: 56, revenue: '$7,800', status: 'Active' },
  ]

  const chartOption = {
    title: {
      text: 'Category Performance',
      left: 'center',
      textStyle: { 
        color: '#333', 
        fontSize: 18,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} products ({d}%)',
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
        name: 'Products',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['60%', '50%'],
        data: [
          { value: 45, name: 'Electronics', itemStyle: { color: '#667eea' } },
          { value: 78, name: 'Clothing', itemStyle: { color: '#764ba2' } },
          { value: 32, name: 'Books', itemStyle: { color: '#91cc75' } },
          { value: 23, name: 'Sports', itemStyle: { color: '#fac858' } },
          { value: 56, name: 'Home & Garden', itemStyle: { color: '#ee6666' } }
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

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>CATEGORIES</h3>
        <button className='btn-primary'>
          <BsPlus className='icon' /> Add Category
        </button>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3>TOTAL CATEGORIES</h3>
            <BsFillGrid3X3GapFill className='card_icon'/>
          </div>
          <h1>{categories.length}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>ACTIVE CATEGORIES</h3>
            <BsFillGrid3X3GapFill className='card_icon'/>
          </div>
          <h1>{categories.filter(cat => cat.status === 'Active').length}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>TOTAL PRODUCTS</h3>
            <BsFillGrid3X3GapFill className='card_icon'/>
          </div>
          <h1>{categories.reduce((sum, cat) => sum + cat.products, 0)}</h1>
        </div>
      </div>

      <div className='charts'>
        <div className='chart-container'>
          <ReactECharts option={chartOption} style={{ height: '400px' }} />
        </div>
      </div>

      <div className='table-container'>
        <div className='table-header'>
          <h3>Categories List</h3>
          <div className='search-box'>
            <BsSearch className='search-icon' />
            <input type="text" placeholder="Search categories..." />
          </div>
        </div>
        <div className='table-wrapper'>
          <table className='data-table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Category Name</th>
                <th>Products</th>
                <th>Revenue</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(category => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.products}</td>
                  <td>{category.revenue}</td>
                  <td>
                    <span className={`status ${category.status.toLowerCase()}`}>
                      {category.status}
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

export default Categories
