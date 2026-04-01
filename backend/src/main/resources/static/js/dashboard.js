// Dashboard JavaScript functionality

function deleteEntry(id) {
    if (confirm('Are you sure you want to delete this entry?')) {
        fetch(`/dashboard/delete/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Reload page to show updated data
                window.location.reload();
            } else {
                alert('Error deleting entry: ' + (data.error || 'Unknown error'));
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error deleting entry. Please try again.');
        });
    }
}

function validateForm(form) {
    const name = form.querySelector('#name');
    const rollNo = form.querySelector('#rollNo');
    const branch = form.querySelector('#branch');
    const section = form.querySelector('#section');
    const abstractName = form.querySelector('#abstractName');
    const frontendUrl = form.querySelector('#frontendUrl');
    const backendUrl = form.querySelector('#backendUrl');
    const githubUrl = form.querySelector('#githubUrl');
    
    // Reset previous errors
    document.querySelectorAll('.error').forEach(el => el.remove());
    
    let isValid = true;
    let errorMessage = '';
    
    // Validate required fields
    if (!name.value.trim()) {
        isValid = false;
        errorMessage = 'Name is required';
    }
    if (!rollNo.value.trim()) {
        isValid = false;
        errorMessage = 'Roll Number is required';
    }
    if (!branch.value) {
        isValid = false;
        errorMessage = 'Branch is required';
    }
    if (!section.value) {
        isValid = false;
        errorMessage = 'Section is required';
    }
    if (!abstractName.value.trim()) {
        isValid = false;
        errorMessage = 'Abstract name is required';
    }
    if (!frontendUrl.value.trim()) {
        isValid = false;
        errorMessage = 'Frontend URL is required';
    }
    if (!backendUrl.value.trim()) {
        isValid = false;
        errorMessage = 'Backend URL is required';
    }
    
    // URL validation
    if (frontendUrl.value && !isValidUrl(frontendUrl.value)) {
        isValid = false;
        errorMessage = 'Please enter a valid URL starting with http:// or https://';
    }
    if (backendUrl.value && !isValidUrl(backendUrl.value)) {
        isValid = false;
        errorMessage = 'Please enter a valid URL starting with http:// or https://';
    }
    if (githubUrl.value && !isValidUrl(githubUrl.value)) {
        isValid = false;
        errorMessage = 'Please enter a valid GitHub URL';
    }
    
    if (!isValid) {
        // Show error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-error';
        errorDiv.textContent = errorMessage;
        form.parentNode.insertBefore(errorDiv, form);
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        return false;
    }
    
    return true;
}

function isValidUrl(url) {
    try {
        new URL(url);
        return url.startsWith('http://') || url.startsWith('https://');
    } catch {
        return false;
    }
}

// Initialize tooltips and other interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects for table rows
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach((row, index) => {
        row.style.animationDelay = `${index * 0.1}s`;
        row.classList.add('stagger-item');
    });
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
