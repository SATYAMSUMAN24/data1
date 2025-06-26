
import React, { useState, useRef, useEffect } from 'react'
import { BsRobot, BsSend, BsX, BsMic, BsStars } from 'react-icons/bs'

function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Hello! I\'m your Cosmic AI Assistant. How can I help you manage your admin panel today?',
      timestamp: new Date().toLocaleTimeString()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const predefinedResponses = {
    'hello': 'Hello! Welcome to your Cosmic Admin Panel. I can help you with navigation, data analysis, or system management.',
    'help': 'I can assist you with:\n• Dashboard analytics\n• Customer management\n• Inventory tracking\n• System settings\n• Data reports\n• Navigation guidance',
    'dashboard': 'Your dashboard shows key metrics including products, categories, customers, and alerts. Would you like me to explain any specific metric?',
    'customers': 'The customers section displays customer data with charts and detailed tables. You can view customer status, VIP levels, and contact information.',
    'inventory': 'Inventory management tracks your stock levels with visual charts and alerts for low stock items. Need help with specific inventory tasks?',
    'categories': 'Categories section shows product category performance with interactive charts and detailed breakdowns.',
    'settings': 'Settings allow you to configure local admin preferences, notifications, mail system, and security options.',
    'data': 'I can help analyze your sales data, customer trends, inventory levels, and generate insights for better decision making.',
    'export': 'You can export data from various sections. Would you like me to guide you through the export process?',
    'charts': 'The admin panel uses Apache ECharts for interactive visualizations. I can explain chart data or help customize views.',
    'performance': 'System performance metrics show local storage, memory usage, cache size, and overall performance indicators.',
    'notifications': 'Notification settings control email alerts, stock alerts, order notifications, and customer alerts.',
    'security': 'Security settings include local authentication, session timeout configuration, and password strength requirements.'
  }

  const getAIResponse = (message) => {
    const lowerMessage = message.toLowerCase()
    
    // Check for keyword matches
    for (const [keyword, response] of Object.entries(predefinedResponses)) {
      if (lowerMessage.includes(keyword)) {
        return response
      }
    }
    
    // Default responses based on message patterns
    if (lowerMessage.includes('how') || lowerMessage.includes('what')) {
      return 'I can provide guidance on admin panel features. Try asking about "dashboard", "customers", "inventory", "settings", or "help" for more specific assistance.'
    }
    
    if (lowerMessage.includes('thank')) {
      return 'You\'re welcome! I\'m here whenever you need assistance with your Cosmic Admin Panel. ✨'
    }
    
    return 'I understand you\'re asking about "' + message + '". Could you be more specific? Try asking about dashboard, customers, inventory, settings, or type "help" for available commands.'
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const newMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages(prev => [...prev, newMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: getAIResponse(inputMessage),
        timestamp: new Date().toLocaleTimeString()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  const quickActions = [
    { text: 'Show Dashboard Overview', action: () => setInputMessage('dashboard') },
    { text: 'Customer Analytics', action: () => setInputMessage('customers') },
    { text: 'Inventory Status', action: () => setInputMessage('inventory') },
    { text: 'Help & Commands', action: () => setInputMessage('help') }
  ]

  return (
    <>
      {/* AI Assistant Toggle Button */}
      <div 
        className={`ai-assistant-toggle ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <BsRobot className="ai-icon" />
        <div className="ai-pulse"></div>
      </div>

      {/* AI Assistant Chat Window */}
      {isOpen && (
        <div className="ai-assistant-window">
          <div className="ai-header">
            <div className="ai-header-content">
              <BsStars className="ai-header-icon" />
              <div>
                <h4>Cosmic AI Assistant</h4>
                <span className="ai-status">Online</span>
              </div>
            </div>
            <button className="ai-close" onClick={() => setIsOpen(false)}>
              <BsX />
            </button>
          </div>

          <div className="ai-messages">
            {messages.map(message => (
              <div key={message.id} className={`ai-message ${message.type}`}>
                <div className="message-content">
                  <div className="message-text">{message.content}</div>
                  <div className="message-time">{message.timestamp}</div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="ai-message ai typing">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="ai-quick-actions">
            {quickActions.map((action, index) => (
              <button 
                key={index} 
                className="quick-action-btn"
                onClick={action.action}
              >
                {action.text}
              </button>
            ))}
          </div>

          <div className="ai-input-area">
            <div className="ai-input-container">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your admin panel..."
                className="ai-input"
              />
              <button className="ai-mic-btn">
                <BsMic />
              </button>
              <button 
                className="ai-send-btn"
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
              >
                <BsSend />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AIAssistant
