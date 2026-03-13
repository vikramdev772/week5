import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { formDataApi } from '../services/api'
import { Search, Trash2, ArrowLeft, Plus, Download, FileSpreadsheet, FileText, BarChart3, Users, Calendar, Filter, RefreshCw, Eye, Edit, ExternalLink, Globe, Link2 } from 'lucide-react'

const Dashboard = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [totalCount, setTotalCount] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [apiError, setApiError] = useState(false)

  const fetchData = async (search = '') => {
    try {
      setLoading(true)
      setApiError(false)
      const response = await formDataApi.getAllFormData(search)
      
      if (response && response.success) {
        setData(response.data || [])
        setTotalCount(response.totalCount || 0)
      } else {
        // Handle case where backend is not running or returns error
        setApiError(true)
        setData([])
        setTotalCount(0)
        console.log('API not available, showing empty state')
      }
    } catch (error) {
      console.log('API Error handled:', error.message)
      setApiError(true)
      setData([])
      setTotalCount(0)
      // Don't show toast for initial load errors to avoid spam
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(searchTerm)
  }, [searchTerm])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await fetchData(searchTerm)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        const response = await formDataApi.deleteFormData(id)
        if (response && response.success) {
          toast.success('Entry deleted successfully!')
          fetchData(searchTerm)
        } else {
          toast.error('Failed to delete entry')
        }
      } catch (error) {
        toast.error('Error deleting entry')
      }
    }
  }

  const handleExportExcel = async () => {
    try {
      const response = await formDataApi.exportToExcel(searchTerm)
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'project_evaluations.xlsx')
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
      toast.success('Excel file downloaded successfully!')
    } catch (error) {
      toast.error('Error exporting to Excel')
    }
  }

  const handleExportPdf = async () => {
    try {
      const response = await formDataApi.exportToPdf(searchTerm)
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'project_evaluations.pdf')
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
      toast.success('PDF file downloaded successfully!')
    } catch (error) {
      toast.error('Error exporting to PDF')
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const statsCards = [
    {
      title: 'Total Projects',
      value: totalCount,
      icon: BarChart3,
      color: 'primary',
      trend: '+12%'
    },
    {
      title: 'This Month',
      value: data.filter(item => {
        try {
          const itemDate = new Date(item.createdAt)
          const now = new Date()
          return itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear()
        } catch {
          return false
        }
      }).length,
      icon: Calendar,
      color: 'success',
      trend: '+8%'
    },
    {
      title: 'Active Users',
      value: new Set(data.map(item => item.name)).size,
      icon: Users,
      color: 'warning',
      trend: '+5%'
    }
  ]

  const renderUrlButton = (url, label, icon) => {
    if (!url) return <span className="text-muted">-</span>
    
    return (
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="btn-url"
        title={`View ${label}`}
      >
        <ExternalLink size={14} />
        {label}
      </a>
    )
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <button 
            onClick={() => navigate('/')}
            className="btn-back"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
          
          <div className="header-content">
            <div>
              <h1 className="dashboard-title">Project Dashboard</h1>
              <p className="dashboard-subtitle">
                {apiError ? 'Backend server is not running. Showing demo data.' : 'Manage and track all project submissions'}
              </p>
            </div>
            <button 
              onClick={() => navigate('/form')}
              className="btn btn-primary btn-lg"
            >
              <Plus size={20} className="me-2" />
              New Project
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="stats-grid">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div className="stat-card" key={index}>
                <div className="stat-icon-wrapper">
                  <div className={`stat-icon stat-${stat.color}`}>
                    <Icon size={24} />
                  </div>
                  <div className="stat-trend">
                    <span className="trend-value">{stat.trend}</span>
                  </div>
                </div>
                <div className="stat-content">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.title}</div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Search and Actions */}
        <div className="actions-card">
          <div className="search-section">
            <div className="search-wrapper">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search projects by name, roll number, or branch..."
                value={searchTerm}
                onChange={handleSearch}
                disabled={apiError}
              />
            </div>
            <button 
              onClick={handleRefresh}
              className={`btn-refresh ${isRefreshing ? 'spinning' : ''}`}
              title="Refresh data"
              disabled={apiError}
            >
              <RefreshCw size={20} />
            </button>
          </div>
          
          <div className="export-section">
            <button 
              onClick={handleExportExcel}
              className="btn-export btn-excel"
              title="Export to Excel"
              disabled={apiError}
            >
              <FileSpreadsheet size={18} className="me-2" />
              Excel
            </button>
            <button 
              onClick={handleExportPdf}
              className="btn-export btn-pdf"
              title="Export to PDF"
              disabled={apiError}
            >
              <FileText size={18} className="me-2" />
              PDF
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="table-card">
          <div className="table-header">
            <h2 className="table-title">Project Submissions</h2>
            <div className="table-info">
              <span className="table-count">{data.length} projects</span>
            </div>
          </div>
          
          <div className="table-container">
            {loading ? (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Loading project evaluations...</p>
              </div>
            ) : apiError ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <FileText size={64} />
                </div>
                <h3>Backend Server Offline</h3>
                <p>
                  The backend server is not running. Please start the backend server to view actual data.
                  {searchTerm && ' No projects match your search criteria.'}
                </p>
                <div className="demo-info">
                  <p><strong>Demo Mode:</strong> You can still submit new projects which will be stored when the backend is available.</p>
                  <button 
                    onClick={() => navigate('/form')}
                    className="btn btn-primary"
                  >
                    <Plus size={18} className="me-2" />
                    Submit Demo Project
                  </button>
                </div>
              </div>
            ) : data.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <FileText size={64} />
                </div>
                <h3>No Projects Found</h3>
                <p>
                  {searchTerm 
                    ? 'No projects match your search criteria.' 
                    : 'No project evaluations yet. Submit your first project to get started.'
                  }
                </p>
                {!searchTerm && (
                  <button 
                    onClick={() => navigate('/form')}
                    className="btn btn-primary"
                  >
                    <Plus size={18} className="me-2" />
                    Submit First Project
                  </button>
                )}
              </div>
            ) : (
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Student Info</th>
                      <th>Academic Details</th>
                      <th>Project</th>
                      <th>Links</th>
                      <th>Submitted</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={item.id} className="table-row">
                        <td>
                          <span className="project-id">#{item.id}</span>
                        </td>
                        <td>
                          <div className="student-info">
                            <div className="student-name">{item.name || 'N/A'}</div>
                            <div className="student-roll">{item.rollNo || 'N/A'}</div>
                          </div>
                        </td>
                        <td>
                          <div className="academic-info">
                            <span className="branch-badge">{item.branch || 'N/A'}</span>
                            <span className="section-badge">{item.section || 'N/A'}</span>
                          </div>
                        </td>
                        <td>
                          <div className="project-info">
                            <div className="project-name">{item.abstractName || 'No description'}</div>
                          </div>
                        </td>
                        <td>
                          <div className="links-group">
                            {renderUrlButton(item.frontendUrl, 'Frontend', Globe)}
                            {renderUrlButton(item.backendUrl, 'Backend', Link2)}
                            {renderUrlButton(item.githubUrl, 'GitHub', FileText)}
                          </div>
                        </td>
                        <td>
                          <div className="date-info">
                            <span className="date-text">
                              {item.createdAt ? formatDate(item.createdAt) : 'N/A'}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              onClick={() => handleDelete(item.id)}
                              className="btn-action btn-delete"
                              title="Delete project"
                              disabled={apiError}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-page {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--primary-50) 0%, var(--secondary-50) 100%);
          padding: 2rem 0;
        }

        .dashboard-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .dashboard-header {
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .btn-back {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: white;
          border: 2px solid var(--secondary-200);
          border-radius: var(--radius-lg);
          color: var(--secondary-600);
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          align-self: flex-start;
        }

        .btn-back:hover {
          border-color: var(--primary-300);
          background: var(--primary-50);
          color: var(--primary-600);
          transform: translateY(-2px);
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
        }

        .dashboard-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--secondary-800);
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }

        .dashboard-subtitle {
          font-size: 1.125rem;
          color: var(--secondary-600);
          margin: 0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: white;
          border-radius: var(--radius-2xl);
          padding: 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid var(--secondary-200);
          display: flex;
          align-items: center;
          gap: 1.5rem;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        .stat-icon-wrapper {
          position: relative;
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: var(--radius-xl);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .stat-primary {
          background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
        }

        .stat-success {
          background: linear-gradient(135deg, var(--success-500), var(--success-600));
        }

        .stat-warning {
          background: linear-gradient(135deg, var(--warning-500), var(--warning-600));
        }

        .stat-trend {
          position: absolute;
          top: -8px;
          right: -8px;
          background: var(--success-100);
          color: var(--success-600);
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 600;
        }

        .stat-content {
          flex: 1;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 800;
          color: var(--secondary-800);
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--secondary-600);
          font-weight: 500;
        }

        .actions-card {
          background: white;
          border-radius: var(--radius-2xl);
          padding: 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid var(--secondary-200);
          margin-bottom: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
        }

        .search-section {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
        }

        .search-wrapper {
          position: relative;
          flex: 1;
          max-width: 500px;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--secondary-400);
        }

        .search-input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          border: 2px solid var(--secondary-200);
          border-radius: var(--radius-lg);
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: var(--primary-500);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .search-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-refresh {
          padding: 1rem;
          background: var(--secondary-50);
          border: 2px solid var(--secondary-200);
          border-radius: var(--radius-lg);
          color: var(--secondary-600);
          transition: all 0.3s ease;
        }

        .btn-refresh:hover:not(:disabled) {
          background: var(--primary-50);
          border-color: var(--primary-300);
          color: var(--primary-600);
        }

        .btn-refresh:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-refresh.spinning {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .export-section {
          display: flex;
          gap: 1rem;
        }

        .btn-export {
          display: inline-flex;
          align-items: center;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: var(--radius-lg);
          font-weight: 600;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .btn-export:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-excel {
          background: linear-gradient(135deg, var(--success-500), var(--success-600));
          color: white;
        }

        .btn-excel:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
        }

        .btn-pdf {
          background: linear-gradient(135deg, var(--accent-500), var(--accent-600));
          color: white;
        }

        .btn-pdf:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
        }

        .table-card {
          background: white;
          border-radius: var(--radius-2xl);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid var(--secondary-200);
          overflow: hidden;
        }

        .table-header {
          padding: 2rem;
          border-bottom: 1px solid var(--secondary-200);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .table-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--secondary-800);
          margin: 0;
        }

        .table-count {
          color: var(--secondary-600);
          font-weight: 500;
        }

        .table-container {
          overflow-x: auto;
        }

        .loading-state, .empty-state {
          padding: 4rem 2rem;
          text-align: center;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid var(--secondary-200);
          border-top: 4px solid var(--primary-500);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        .empty-icon {
          color: var(--secondary-400);
          margin-bottom: 1rem;
        }

        .empty-state h3 {
          color: var(--secondary-800);
          margin-bottom: 0.5rem;
        }

        .empty-state p {
          color: var(--secondary-600);
          margin-bottom: 2rem;
        }

        .demo-info {
          background: var(--warning-50);
          border: 1px solid var(--warning-200);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          margin: 2rem 0;
        }

        .demo-info p {
          margin-bottom: 1rem;
          color: var(--warning-800);
        }

        .table-wrapper {
          overflow-x: auto;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table th {
          background: var(--secondary-50);
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          color: var(--secondary-700);
          border-bottom: 2px solid var(--secondary-200);
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .data-table td {
          padding: 1rem;
          border-bottom: 1px solid var(--secondary-100);
          vertical-align: middle;
        }

        .table-row:hover {
          background: var(--primary-50);
        }

        .project-id {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
          color: white;
          border-radius: var(--radius-full);
          font-size: 0.875rem;
          font-weight: 600;
        }

        .student-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .student-name {
          font-weight: 600;
          color: var(--secondary-800);
        }

        .student-roll {
          font-size: 0.875rem;
          color: var(--secondary-600);
        }

        .academic-info {
          display: flex;
          gap: 0.5rem;
        }

        .branch-badge, .section-badge {
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-md);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .branch-badge {
          background: var(--primary-100);
          color: var(--primary-700);
        }

        .section-badge {
          background: var(--warning-100);
          color: var(--warning-700);
        }

        .project-info {
          max-width: 300px;
        }

        .project-name {
          font-size: 0.875rem;
          color: var(--secondary-600);
          line-height: 1.4;
        }

        .links-group {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .btn-url {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.75rem;
          background: var(--secondary-50);
          border: 1px solid var(--secondary-200);
          border-radius: var(--radius-md);
          color: var(--secondary-600);
          text-decoration: none;
          font-size: 0.75rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .btn-url:hover {
          background: var(--primary-50);
          border-color: var(--primary-300);
          color: var(--primary-600);
        }

        .date-info {
          font-size: 0.875rem;
          color: var(--secondary-600);
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .btn-action {
          padding: 0.5rem;
          border: none;
          border-radius: var(--radius-md);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .btn-action:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-delete {
          background: var(--accent-50);
          color: var(--accent-600);
        }

        .btn-delete:hover:not(:disabled) {
          background: var(--accent-100);
          color: var(--accent-700);
        }

        @media (max-width: 1024px) {
          .header-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .actions-card {
            flex-direction: column;
            gap: 1rem;
          }

          .search-section {
            width: 100%;
          }

          .export-section {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .dashboard-container {
            padding: 0 1rem;
          }

          .dashboard-title {
            font-size: 2rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .actions-card {
            padding: 1.5rem;
          }

          .table-header {
            padding: 1.5rem;
          }

          .data-table {
            font-size: 0.875rem;
          }

          .data-table th,
          .data-table td {
            padding: 0.75rem 0.5rem;
          }

          .links-group {
            flex-direction: column;
            gap: 0.25rem;
          }

          .project-info {
            max-width: 200px;
          }
        }
      `}</style>
    </div>
  )
}

export default Dashboard
