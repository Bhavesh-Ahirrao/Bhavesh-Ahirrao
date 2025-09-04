// Forest Fire Prediction System - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Form validation and enhancement
    const predictionForm = document.getElementById('predictionForm');
    const inputs = document.querySelectorAll('input[type="number"]');
    const loadingDiv = document.getElementById('loading');
    const resultDiv = document.getElementById('result');

    // Input validation
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            // Prevent negative values
            if (this.value < 0) {
                this.value = 0;
            }
            
            // Add visual feedback for valid/invalid input
            if (this.value && this.value >= 0) {
                this.style.borderColor = '#28a745';
            } else {
                this.style.borderColor = '#e1e5e9';
            }
        });

        // Add focus effects
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

    // Form submission handling
    if (predictionForm) {
        predictionForm.addEventListener('submit', function(e) {
            // Show loading animation
            if (loadingDiv) {
                loadingDiv.style.display = 'block';
            }
            
            // Hide previous result
            if (resultDiv) {
                resultDiv.style.display = 'none';
            }

            // Add form validation
            let isValid = true;
            inputs.forEach(input => {
                if (!input.value || input.value < 0) {
                    isValid = false;
                    input.style.borderColor = '#dc3545';
                    input.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
                }
            });

            if (!isValid) {
                e.preventDefault();
                if (loadingDiv) {
                    loadingDiv.style.display = 'none';
                }
                showNotification('Please fill all fields with valid values', 'error');
                return;
            }
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: bold;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;

        // Set background color based on type
        switch(type) {
            case 'error':
                notification.style.backgroundColor = '#dc3545';
                break;
            case 'success':
                notification.style.backgroundColor = '#28a745';
                break;
            default:
                notification.style.backgroundColor = '#667eea';
        }

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    // Add parallax effect to header
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            header.style.transform = `translateY(${rate}px)`;
        });
    }

    // Add typing effect to header title
    const headerTitle = document.querySelector('.header h1');
    if (headerTitle) {
        const text = headerTitle.textContent;
        headerTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                headerTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // Add counter animation for result values
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = current.toFixed(2);
        }, 16);
    }

    // Animate result if present
    const resultValue = document.querySelector('.result-value');
    if (resultValue && resultValue.textContent) {
        const targetValue = parseFloat(resultValue.textContent);
        if (!isNaN(targetValue)) {
            resultValue.textContent = '0.00';
            setTimeout(() => {
                animateCounter(resultValue, targetValue);
            }, 500);
        }
    }

    // Add form auto-save functionality
    const formInputs = document.querySelectorAll('input[type="number"]');
    formInputs.forEach(input => {
        // Load saved value
        const savedValue = localStorage.getItem(`ffp_${input.name}`);
        if (savedValue) {
            input.value = savedValue;
        }

        // Save value on change
        input.addEventListener('change', function() {
            localStorage.setItem(`ffp_${this.name}`, this.value);
        });
    });

    // Add clear form functionality
    const clearFormBtn = document.createElement('button');
    clearFormBtn.textContent = '🗑️ Clear Form';
    clearFormBtn.className = 'clear-btn';
    clearFormBtn.style.cssText = `
        background: #6c757d;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
        margin-top: 10px;
        transition: all 0.3s ease;
    `;

    clearFormBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear all form data?')) {
            inputs.forEach(input => {
                input.value = '';
                localStorage.removeItem(`ffp_${input.name}`);
            });
            showNotification('Form cleared successfully', 'success');
        }
    });

    // Add clear button to form if it exists
    if (predictionForm) {
        predictionForm.appendChild(clearFormBtn);
    }

    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to submit form
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            if (predictionForm) {
                predictionForm.submit();
            }
        }
        
        // Escape to clear form
        if (e.key === 'Escape') {
            inputs.forEach(input => {
                input.value = '';
            });
        }
    });

    // Add tooltips for form fields
    const tooltipData = {
        'Temperature': 'Air temperature in Celsius (typically 0-50°C)',
        'RH': 'Relative humidity percentage (0-100%)',
        'Ws': 'Wind speed in kilometers per hour (0-100 km/h)',
        'Rain': 'Rainfall amount in millimeters (0-50 mm)',
        'FFMC': 'Fine Fuel Moisture Code (0-100)',
        'DMC': 'Duff Moisture Code (0-300)',
        'ISI': 'Initial Spread Index (0-50)',
        'Classes': 'Fire danger classes (0-5)',
        'Region': 'Geographic region identifier (0-2)'
    };

    inputs.forEach(input => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipData[input.name] || 'Enter a valid value';
        tooltip.style.cssText = `
            position: absolute;
            background: #333;
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            white-space: nowrap;
            z-index: 1000;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
            top: -40px;
            left: 50%;
            transform: translateX(-50%);
        `;

        input.parentElement.style.position = 'relative';
        input.parentElement.appendChild(tooltip);

        input.addEventListener('mouseenter', function() {
            tooltip.style.opacity = '1';
        });

        input.addEventListener('mouseleave', function() {
            tooltip.style.opacity = '0';
        });
    });
});
