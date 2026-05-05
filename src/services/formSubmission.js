/**
 * Form Submission Service
 * Handles registration form submissions to Google Apps Script
 */

const VITE_GOOGLE_APPS_SCRIPT_FORM_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_FORM_URL;

/**
 * Submit registration form to Google Apps Script
 * @param {Object} formData - Registration form data
 * @returns {Promise<Object>} Response from server
 */
export const submitRegistration = async (formData) => {
    if (!VITE_GOOGLE_APPS_SCRIPT_FORM_URL) {
        console.error('Google Apps Script Form URL not configured');
        throw new Error('Form submission service not configured. Please contact administrator.');
    }

    try {
        const response = await fetch(VITE_GOOGLE_APPS_SCRIPT_FORM_URL, {
            method: 'POST',
            headers: {
                // Use text/plain to avoid CORS preflight (OPTIONS) request which GAS doesn't handle
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify(formData),
            // mode: 'cors' is default, explicit is fine
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || 'Submission failed');
        }

        return result;
    } catch (error) {
        console.error('Error submitting form:', error);
        throw error;
    }
};

/**
 * Validate form data before submission
 * @param {Object} formData - Form data to validate
 * @returns {Object} Validation result
 */
export const validateFormData = (formData) => {
    const errors = {};

    if (!formData.name || formData.name.trim().length < 2) {
        errors.name = 'Họ tên phải có ít nhất 2 ký tự';
    }

    if (!formData.phone || !/^[0-9]{10}$/.test(formData.phone)) {
        errors.phone = 'Số điện thoại phải có 10 chữ số';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};
