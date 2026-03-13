import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { formDataApi } from '../services/api'
import { ArrowLeft, User, Hash, GitBranch, Layers, FileText, Link2, Github, Globe, Send, CheckCircle } from 'lucide-react'

const Form = () => {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      await formDataApi.submitForm(data)
      toast.success('Form submitted successfully!')
      reset()
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.message || 'Error submitting form')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formFields = [
    {
      name: 'name',
      label: 'Full Name',
      placeholder: 'Enter your full name',
      icon: User,
      type: 'text',
      validation: {
        required: 'Name is required',
        minLength: {
          value: 2,
          message: 'Name must be at least 2 characters',
        },
        maxLength: {
          value: 100,
          message: 'Name must not exceed 100 characters',
        },
      }
    },
    {
      name: 'rollNo',
      label: 'Roll Number',
      placeholder: 'Enter your roll number',
      icon: Hash,
      type: 'text',
      validation: {
        required: 'Roll Number is required',
        pattern: {
          value: /^[A-Za-z0-9/-]+$/,
          message: 'Roll number can only contain letters, numbers, hyphens and slashes',
        },
      }
    },
    {
      name: 'branch',
      label: 'Branch',
      placeholder: 'Select your branch',
      icon: GitBranch,
      type: 'select',
      options: [
        { value: '', label: 'Select Branch' },
        { value: 'Computer Science', label: 'Computer Science' },
        { value: 'Information Technology', label: 'Information Technology' },
        { value: 'Electronics', label: 'Electronics' },
        { value: 'Electrical', label: 'Electrical' },
        { value: 'Mechanical', label: 'Mechanical' },
        { value: 'Civil', label: 'Civil' }
      ],
      validation: {
        required: 'Branch is required',
      }
    },
    {
      name: 'section',
      label: 'Section',
      placeholder: 'Select your section',
      icon: Layers,
      type: 'select',
      options: [
        { value: '', label: 'Select Section' },
        { value: 'A', label: 'Section A' },
        { value: 'B', label: 'Section B' },
        { value: 'C', label: 'Section C' },
        { value: 'D', label: 'Section D' }
      ],
      validation: {
        required: 'Section is required',
      }
    },
    {
      name: 'abstractName',
      label: 'Project Abstract',
      placeholder: 'Describe your project abstract in detail...',
      icon: FileText,
      type: 'textarea',
      rows: 4,
      validation: {
        required: 'Abstract name is required',
        minLength: {
          value: 10,
          message: 'Abstract must be at least 10 characters',
        },
        maxLength: {
          value: 500,
          message: 'Abstract must not exceed 500 characters',
        },
      }
    },
    {
      name: 'githubUrl',
      label: 'GitHub Repository URL',
      placeholder: 'https://github.com/username/repository',
      icon: Github,
      type: 'url',
      validation: {
        pattern: {
          value: /^https?:\/\/(www\.)?github\.com\/.+/,
          message: 'Please enter a valid GitHub URL',
        },
      }
    },
    {
      name: 'frontendUrl',
      label: 'Frontend Deployment URL',
      placeholder: 'https://your-app.vercel.app',
      icon: Globe,
      type: 'url',
      validation: {
        pattern: {
          value: /^https?:\/\/.+/,
          message: 'Please enter a valid URL',
        },
      }
    },
    {
      name: 'backendUrl',
      label: 'Backend API URL',
      placeholder: 'https://api.your-app.com',
      icon: Link2,
      type: 'url',
      validation: {
        pattern: {
          value: /^https?:\/\/.+/,
          message: 'Please enter a valid URL',
        },
      }
    }
  ]

  const renderField = (field) => {
    const Icon = field.icon
    const hasError = errors[field.name]

    return (
      <div className="form-group-modern" key={field.name}>
        <label htmlFor={field.name} className="form-label-modern">
          <Icon size={18} className="me-2" />
          {field.label}
          {field.validation?.required && <span className="text-danger ms-1">*</span>}
        </label>
        
        <div className="input-wrapper">
          {field.type === 'select' ? (
            <select
              className={`form-modern ${hasError ? 'is-invalid' : ''}`}
              id={field.name}
              {...register(field.name, field.validation)}
            >
              {field.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : field.type === 'textarea' ? (
            <textarea
              className={`form-modern ${hasError ? 'is-invalid' : ''}`}
              id={field.name}
              rows={field.rows}
              placeholder={field.placeholder}
              {...register(field.name, field.validation)}
            />
          ) : (
            <input
              type={field.type}
              className={`form-modern ${hasError ? 'is-invalid' : ''}`}
              id={field.name}
              placeholder={field.placeholder}
              {...register(field.name, field.validation)}
            />
          )}
        </div>
        
        {hasError && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {hasError.message}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="form-page">
      <div className="form-container">
        <div className="form-header">
          <button
            className="btn-back"
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
          
          <div className="form-title-section">
            <div className="form-icon">
              <Send size={32} />
            </div>
            <div>
              <h1 className="form-title">Submit Your Project</h1>
              <p className="form-subtitle">Share your amazing project with our community</p>
            </div>
          </div>
        </div>

        <div className="form-body">
          <form onSubmit={handleSubmit(onSubmit)} className="project-form">
            <div className="form-grid">
              {formFields.slice(0, 2).map(renderField)}
            </div>
            
            <div className="form-grid">
              {formFields.slice(2, 4).map(renderField)}
            </div>
            
            <div className="form-section">
              {renderField(formFields[4])}
            </div>
            
            <div className="form-section-title">
              <h3>Project Links</h3>
              <p>Add your project URLs for deployment and source code</p>
            </div>
            
            <div className="form-grid">
              {formFields.slice(5).map(renderField)}
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={() => navigate('/')}
              >
                <ArrowLeft size={20} className="me-2" />
                Cancel
              </button>
              
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner-border spinner-border-sm me-2" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} className="me-2" />
                    Submit Project
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .form-page {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--primary-50) 0%, var(--secondary-50) 100%);
          padding: 2rem 0;
        }

        .form-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .form-header {
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

        .form-title-section {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .form-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
          border-radius: var(--radius-2xl);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
        }

        .form-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--secondary-800);
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }

        .form-subtitle {
          font-size: 1.125rem;
          color: var(--secondary-600);
          margin: 0;
        }

        .form-body {
          background: white;
          border-radius: var(--radius-3xl);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
          padding: 3rem;
          border: 1px solid var(--secondary-200);
        }

        .project-form {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .form-section {
          width: 100%;
        }

        .form-section-title {
          text-align: center;
          margin: 2rem 0 1.5rem;
        }

        .form-section-title h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--secondary-800);
          margin-bottom: 0.5rem;
        }

        .form-section-title p {
          color: var(--secondary-600);
          margin: 0;
        }

        .form-group-modern {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .form-label-modern {
          display: flex;
          align-items: center;
          font-weight: 600;
          color: var(--secondary-700);
          font-size: 0.95rem;
        }

        .input-wrapper {
          position: relative;
        }

        .form-modern {
          width: 100%;
          padding: 1rem 1.25rem;
          border: 2px solid var(--secondary-200);
          border-radius: var(--radius-lg);
          font-size: 1rem;
          transition: all 0.3s ease;
          background: white;
        }

        .form-modern:focus {
          outline: none;
          border-color: var(--primary-500);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-modern.is-invalid {
          border-color: var(--accent-500);
          background: rgba(239, 68, 68, 0.02);
        }

        .form-modern.is-invalid:focus {
          border-color: var(--accent-500);
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }

        .form-modern::placeholder {
          color: var(--secondary-400);
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--accent-600);
          font-size: 0.875rem;
          font-weight: 500;
        }

        .error-icon {
          font-size: 1rem;
        }

        .form-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid var(--secondary-200);
        }

        .form-actions .btn {
          min-width: 150px;
        }

        @media (max-width: 768px) {
          .form-container {
            padding: 0 1rem;
          }

          .form-body {
            padding: 2rem 1.5rem;
          }

          .form-title-section {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }

          .form-title {
            font-size: 2rem;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-actions {
            flex-direction: column;
            gap: 1rem;
          }

          .form-actions .btn {
            width: 100%;
          }
        }

        /* Animation */
        .form-group-modern {
          animation: slideUp 0.6s ease-out;
        }

        .form-group-modern:nth-child(1) { animation-delay: 0.1s; }
        .form-group-modern:nth-child(2) { animation-delay: 0.2s; }
        .form-group-modern:nth-child(3) { animation-delay: 0.3s; }
        .form-group-modern:nth-child(4) { animation-delay: 0.4s; }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default Form
