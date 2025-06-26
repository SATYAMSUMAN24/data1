
import React, { useState } from 'react'
import { BsFillGearFill, BsPersonFill, BsShieldFill, BsGraphUp, BsBell, BsKey, BsSave, BsEnvelope, BsMailbox, BsMoon, BsSun, BsPalette, BsDisplay, BsGlobe } from 'react-icons/bs'
import ReactECharts from 'echarts-for-react'
import AIAssistant from './AIAssistant'

function Settings() {
  const [darkMode, setDarkMode] = useState(true)
  const [adminData, setAdminData] = useState({
    profile: {
      name: 'Local Admin',
      email: 'admin@localhost.com',
      role: 'Local Administrator',
      phone: '+1 555-0123',
      department: 'Local Management',
      lastLogin: '2024-01-15 09:30 AM',
      serverUrl: 'http://localhost:5173',
      environment: 'Development',
      version: '1.0.0'
    },
    notifications: {
      emailAlerts: true,
      stockAlerts: true,
      orderNotifications: true,
      customerAlerts: false
    },
    mailSettings: {
      smtpServer: 'localhost',
      smtpPort: '587',
      emailFrom: 'admin@localhost.com',
      emailSignature: 'Best regards,\nLocal Admin Team'
    },
    security: {
      localAuth: true,
      sessionTimeout: 30,
      passwordStrength: 'Strong'
    },
    appearance: {
      theme: 'dark',
      accentColor: '#40e0ff',
      fontSize: 'medium',
      compactMode: false
    },
    system: {
      autoSave: true,
      backupFrequency: 'daily',
      debugMode: false,
      performanceMode: true
    }
  })

  const systemStats = [
    { metric: 'Local Storage', value: 45, color: '#5470c6' },
    { metric: 'Memory Usage', value: 68, color: '#91cc75' },
    { metric: 'Cache Size', value: 32, color: '#fac858' },
    { metric: 'Performance', value: 78, color: '#ee6666' }
  ]

  const performanceChartOption = {
    title: {
      text: 'Local System Performance',
      left: 'center',
      textStyle: { color: '#333', fontSize: 16 }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    xAxis: {
      type: 'category',
      data: systemStats.map(stat => stat.metric)
    },
    yAxis: {
      type: 'value',
      max: 100,
      axisLabel: { formatter: '{value}%' }
    },
    series: [
      {
        name: 'Usage %',
        type: 'bar',
        data: systemStats.map(stat => ({
          value: stat.value,
          itemStyle: { color: stat.color }
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }

  const activityChartOption = {
    title: {
      text: 'Local Admin Activity',
      left: 'center',
      textStyle: { color: '#333', fontSize: 16 }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'middle'
    },
    series: [
      {
        name: 'Activities',
        type: 'pie',
        radius: '70%',
        center: ['60%', '50%'],
        data: [
          { value: 35, name: 'Customer Management', itemStyle: { color: '#5470c6' } },
          { value: 25, name: 'Inventory Updates', itemStyle: { color: '#91cc75' } },
          { value: 20, name: 'Email Notifications', itemStyle: { color: '#fac858' } },
          { value: 15, name: 'System Settings', itemStyle: { color: '#ee6666' } },
          { value: 5, name: 'Other', itemStyle: { color: '#73c0de' } }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }

  const handleSave = () => {
    alert('Local admin settings saved successfully!')
  }

  const testEmail = () => {
    alert('Test email sent from ' + adminData.mailSettings.emailFrom)
  }

  const sendBulkNotification = () => {
    alert('Bulk notification sent to all users!')
  }

  const toggleTheme = () => {
    setDarkMode(!darkMode)
    setAdminData({
      ...adminData,
      appearance: { ...adminData.appearance, theme: darkMode ? 'light' : 'dark' }
    })
    document.body.classList.toggle('light-mode', !darkMode)
  }

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>LOCAL ADMIN SETTINGS</h3>
        <div className='admin-controls'>
          <button className='btn-secondary theme-toggle' onClick={toggleTheme}>
            {darkMode ? <BsSun className='icon' /> : <BsMoon className='icon' />}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button className='btn-secondary' onClick={testEmail}>
            <BsEnvelope className='icon' /> Test Email
          </button>
          <button className='btn-secondary' onClick={sendBulkNotification}>
            <BsBell className='icon' /> Send Notification
          </button>
          <button className='btn-primary' onClick={handleSave}>
            <BsSave className='icon' /> Save Changes
          </button>
        </div>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3>SERVER STATUS</h3>
            <BsGlobe className='card_icon'/>
          </div>
          <h1>Live</h1>
          <small>localhost:5173</small>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>THEME MODE</h3>
            <BsPalette className='card_icon'/>
          </div>
          <h1>{darkMode ? 'Dark' : 'Light'}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>NOTIFICATIONS</h3>
            <BsBell className='card_icon'/>
          </div>
          <h1>On</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>SECURITY</h3>
            <BsShieldFill className='card_icon'/>
          </div>
          <h1>Local</h1>
        </div>
      </div>

      <div className='charts'>
        <div className='chart-container'>
          <ReactECharts option={performanceChartOption} style={{ height: '400px' }} />
        </div>
        <div className='chart-container'>
          <ReactECharts option={activityChartOption} style={{ height: '400px' }} />
        </div>
      </div>

      <div className='settings-panels'>
        <div className='settings-panel'>
          <h4><BsPersonFill className='panel-icon' /> Local Admin Profile</h4>
          <div className='admin-info'>
            <div className='info-row'>
              <label>Name:</label>
              <span>{adminData.profile.name}</span>
            </div>
            <div className='info-row'>
              <label>Email:</label>
              <span>{adminData.profile.email}</span>
            </div>
            <div className='info-row'>
              <label>Role:</label>
              <span className='role-badge'>{adminData.profile.role}</span>
            </div>
            <div className='info-row'>
              <label>Server URL:</label>
              <span className='server-url'>{adminData.profile.serverUrl}</span>
            </div>
            <div className='info-row'>
              <label>Environment:</label>
              <span className='env-badge'>{adminData.profile.environment}</span>
            </div>
            <div className='info-row'>
              <label>Version:</label>
              <span>{adminData.profile.version}</span>
            </div>
            <div className='info-row'>
              <label>Last Login:</label>
              <span>{adminData.profile.lastLogin}</span>
            </div>
          </div>
        </div>

        <div className='settings-panel'>
          <h4><BsMailbox className='panel-icon' /> Mail Settings</h4>
          <div className='mail-settings'>
            <div className='setting-item'>
              <label>SMTP Server:</label>
              <input 
                type="text" 
                value={adminData.mailSettings.smtpServer}
                onChange={(e) => setAdminData({
                  ...adminData,
                  mailSettings: { ...adminData.mailSettings, smtpServer: e.target.value }
                })}
              />
            </div>
            <div className='setting-item'>
              <label>SMTP Port:</label>
              <input 
                type="text" 
                value={adminData.mailSettings.smtpPort}
                onChange={(e) => setAdminData({
                  ...adminData,
                  mailSettings: { ...adminData.mailSettings, smtpPort: e.target.value }
                })}
              />
            </div>
            <div className='setting-item'>
              <label>From Email:</label>
              <input 
                type="email" 
                value={adminData.mailSettings.emailFrom}
                onChange={(e) => setAdminData({
                  ...adminData,
                  mailSettings: { ...adminData.mailSettings, emailFrom: e.target.value }
                })}
              />
            </div>
          </div>
        </div>

        <div className='settings-panel'>
          <h4><BsBell className='panel-icon' /> Notification Settings</h4>
          <div className='settings-options'>
            <div className='setting-item'>
              <label>Email Alerts</label>
              <input 
                type="checkbox" 
                checked={adminData.notifications.emailAlerts}
                onChange={(e) => setAdminData({
                  ...adminData,
                  notifications: { ...adminData.notifications, emailAlerts: e.target.checked }
                })}
              />
            </div>
            <div className='setting-item'>
              <label>Stock Alerts</label>
              <input 
                type="checkbox" 
                checked={adminData.notifications.stockAlerts}
                onChange={(e) => setAdminData({
                  ...adminData,
                  notifications: { ...adminData.notifications, stockAlerts: e.target.checked }
                })}
              />
            </div>
            <div className='setting-item'>
              <label>Order Notifications</label>
              <input 
                type="checkbox" 
                checked={adminData.notifications.orderNotifications}
                onChange={(e) => setAdminData({
                  ...adminData,
                  notifications: { ...adminData.notifications, orderNotifications: e.target.checked }
                })}
              />
            </div>
            <div className='setting-item'>
              <label>Customer Alerts</label>
              <input 
                type="checkbox" 
                checked={adminData.notifications.customerAlerts}
                onChange={(e) => setAdminData({
                  ...adminData,
                  notifications: { ...adminData.notifications, customerAlerts: e.target.checked }
                })}
              />
            </div>
          </div>
        </div>

        <div className='settings-panel'>
          <h4><BsPalette className='panel-icon' /> Appearance Settings</h4>
          <div className='settings-options'>
            <div className='setting-item'>
              <label>Theme Mode</label>
              <button className='theme-switch' onClick={toggleTheme}>
                {darkMode ? <BsMoon /> : <BsSun />}
                <span>{darkMode ? 'Dark' : 'Light'}</span>
              </button>
            </div>
            <div className='setting-item'>
              <label>Accent Color:</label>
              <input 
                type="color" 
                value={adminData.appearance.accentColor}
                onChange={(e) => setAdminData({
                  ...adminData,
                  appearance: { ...adminData.appearance, accentColor: e.target.value }
                })}
              />
            </div>
            <div className='setting-item'>
              <label>Font Size:</label>
              <select 
                value={adminData.appearance.fontSize}
                onChange={(e) => setAdminData({
                  ...adminData,
                  appearance: { ...adminData.appearance, fontSize: e.target.value }
                })}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <div className='setting-item'>
              <label>Compact Mode</label>
              <input 
                type="checkbox" 
                checked={adminData.appearance.compactMode}
                onChange={(e) => setAdminData({
                  ...adminData,
                  appearance: { ...adminData.appearance, compactMode: e.target.checked }
                })}
              />
            </div>
          </div>
        </div>

        <div className='settings-panel'>
          <h4><BsDisplay className='panel-icon' /> System Settings</h4>
          <div className='settings-options'>
            <div className='setting-item'>
              <label>Auto Save</label>
              <input 
                type="checkbox" 
                checked={adminData.system.autoSave}
                onChange={(e) => setAdminData({
                  ...adminData,
                  system: { ...adminData.system, autoSave: e.target.checked }
                })}
              />
            </div>
            <div className='setting-item'>
              <label>Backup Frequency:</label>
              <select 
                value={adminData.system.backupFrequency}
                onChange={(e) => setAdminData({
                  ...adminData,
                  system: { ...adminData.system, backupFrequency: e.target.value }
                })}
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
            <div className='setting-item'>
              <label>Debug Mode</label>
              <input 
                type="checkbox" 
                checked={adminData.system.debugMode}
                onChange={(e) => setAdminData({
                  ...adminData,
                  system: { ...adminData.system, debugMode: e.target.checked }
                })}
              />
            </div>
            <div className='setting-item'>
              <label>Performance Mode</label>
              <input 
                type="checkbox" 
                checked={adminData.system.performanceMode}
                onChange={(e) => setAdminData({
                  ...adminData,
                  system: { ...adminData.system, performanceMode: e.target.checked }
                })}
              />
            </div>
          </div>
        </div>

        <div className='settings-panel'>
          <h4><BsShieldFill className='panel-icon' /> Local Security</h4>
          <div className='security-info'>
            <div className='info-row'>
              <label>Local Authentication:</label>
              <span className={`status ${adminData.security.localAuth ? 'active' : 'inactive'}`}>
                {adminData.security.localAuth ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <div className='info-row'>
              <label>Session Timeout:</label>
              <span>{adminData.security.sessionTimeout} minutes</span>
            </div>
            <div className='info-row'>
              <label>Password Strength:</label>
              <span className='password-strength'>{adminData.security.passwordStrength}</span>
            </div>
          </div>
          <button className='btn-secondary'>
            <BsKey className='icon' /> Change Password
          </button>
        </div>
      </div>

      {/* AI Assistant positioned on left side */}
      <div className='settings-ai-assistant'>
        <AIAssistant />
      </div>
    </main>
  )
}

export default Settings
