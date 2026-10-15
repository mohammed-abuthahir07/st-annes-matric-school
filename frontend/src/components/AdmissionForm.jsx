import React, { useState } from 'react';
import { sendAdmissionEnquiry, RECIPIENT_EMAIL } from '../services/emailService';
import { CheckCircleIcon, AlertCircleIcon, ArrowRightIcon } from './Icons';

export default function AdmissionForm({ formData, setFormData, onSuccess }) {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // { type: 'success' | 'error', message: '' }

  const classesList = [
    'Pre-KG',
    'LKG',
    'UKG',
    'Class 1',
    'Class 2',
    'Class 3',
    'Class 4',
    'Class 5',
    'Class 6',
    'Class 7',
    'Class 8',
    'Class 9',
    'Class 10',
    'Class 11',
    'Class 12'
  ];

  const validate = () => {
    const newErrors = {};

    if (!formData.studentName?.trim()) {
      newErrors.studentName = 'Student name is required.';
    }

    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required.';
    } else {
      const selectedDate = new Date(formData.dob);
      const today = new Date();
      if (selectedDate >= today) {
        newErrors.dob = 'Date of birth must be a past date.';
      }
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select a gender.';
    }

    if (!formData.classApplying) {
      newErrors.classApplying = 'Please select the class applying for.';
    }

    if (!formData.parentName?.trim()) {
      newErrors.parentName = 'Parent or guardian name is required.';
    }

    const cleanPhone = (formData.contactNumber || '').replace(/[\s-]/g, '');
    if (!cleanPhone) {
      newErrors.contactNumber = 'Contact number is required.';
    } else if (!/^[0-9]{10}$/.test(cleanPhone)) {
      newErrors.contactNumber = 'Please enter a valid 10-digit mobile number.';
    }

    if (!formData.streetAddress?.trim()) {
      newErrors.streetAddress = 'Street address is required.';
    }

    if (!formData.city?.trim()) {
      newErrors.city = 'City is required.';
    }

    if (!formData.state?.trim()) {
      newErrors.state = 'State is required.';
    }

    if (!formData.country?.trim()) {
      newErrors.country = 'Country is required.';
    }

    const cleanPin = (formData.pincode || '').replace(/\s/g, '');
    if (!cleanPin) {
      newErrors.pincode = 'Pincode is required.';
    } else if (!/^[0-9]{6}$/.test(cleanPin)) {
      newErrors.pincode = 'Please enter a valid 6-digit postal code.';
    }

    if (!formData.remarks?.trim()) {
      newErrors.remarks = 'Please provide brief remarks or academic queries.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field-level error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await sendAdmissionEnquiry(formData);
      if (result.success) {
        setSubmissionStatus({
          type: 'success',
          message: result.message,
        });
        if (onSuccess) onSuccess();
      } else {
        setSubmissionStatus({
          type: 'error',
          message: result.message,
          isConfigError: result.isConfigError,
        });
      }
    } catch (err) {
      console.error('Admission submission error:', err);
      setSubmissionStatus({
        type: 'error',
        message: 'An unexpected error occurred. Please try again or reach the school directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="admission-form" onSubmit={handleSubmit} noValidate>
      {/* Submission Status Alert */}
      {submissionStatus && (
        <div 
          className={`form-alert ${submissionStatus.type === 'success' ? 'form-alert-success' : 'form-alert-error'}`}
          role="alert"
        >
          <span className="form-alert-icon">
            {submissionStatus.type === 'success' ? (
              <CheckCircleIcon size={20} />
            ) : (
              <AlertCircleIcon size={20} />
            )}
          </span>
          <div>
            <p style={{ fontWeight: 600 }}>
              {submissionStatus.type === 'success' ? 'Application Received' : 'Submission Note'}
            </p>
            <p>{submissionStatus.message}</p>
            {submissionStatus.isConfigError && (
              <p style={{ marginTop: '0.4rem', fontSize: '0.8rem', opacity: 0.9 }}>
                Recipient Inbox: <strong>{RECIPIENT_EMAIL}</strong>
              </p>
            )}
          </div>
        </div>
      )}

      {/* Row 1: Student Name & DOB */}
      <div className="form-grid-2">
        <div className="form-group">
          <label htmlFor="studentName" className="form-label">
            Student Name <span className="req-star">*</span>
          </label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            className={`form-control ${errors.studentName ? 'has-error' : ''}`}
            placeholder="e.g. R. Ananya"
            value={formData.studentName || ''}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={Boolean(errors.studentName)}
          />
          {errors.studentName && (
            <span className="field-error-msg">
              <AlertCircleIcon size={14} /> {errors.studentName}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="dob" className="form-label">
            Date of Birth <span className="req-star">*</span>
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            className={`form-control ${errors.dob ? 'has-error' : ''}`}
            value={formData.dob || ''}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={Boolean(errors.dob)}
          />
          {errors.dob && (
            <span className="field-error-msg">
              <AlertCircleIcon size={14} /> {errors.dob}
            </span>
          )}
        </div>
      </div>

      {/* Row 2: Gender & Class Applying For */}
      <div className="form-grid-2">
        <div className="form-group">
          <label htmlFor="gender" className="form-label">
            Gender <span className="req-star">*</span>
          </label>
          <select
            id="gender"
            name="gender"
            className={`form-control ${errors.gender ? 'has-error' : ''}`}
            value={formData.gender || ''}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={Boolean(errors.gender)}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && (
            <span className="field-error-msg">
              <AlertCircleIcon size={14} /> {errors.gender}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="classApplying" className="form-label">
            Class Applying For <span className="req-star">*</span>
          </label>
          <select
            id="classApplying"
            name="classApplying"
            className={`form-control ${errors.classApplying ? 'has-error' : ''}`}
            value={formData.classApplying || ''}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={Boolean(errors.classApplying)}
          >
            <option value="">Select Class</option>
            {classesList.map((cls) => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
          {errors.classApplying && (
            <span className="field-error-msg">
              <AlertCircleIcon size={14} /> {errors.classApplying}
            </span>
          )}
        </div>
      </div>

      {/* Row 3: Parent/Guardian Name & Contact Number */}
      <div className="form-grid-2">
        <div className="form-group">
          <label htmlFor="parentName" className="form-label">
            Parent / Guardian Name <span className="req-star">*</span>
          </label>
          <input
            type="text"
            id="parentName"
            name="parentName"
            className={`form-control ${errors.parentName ? 'has-error' : ''}`}
            placeholder="e.g. S. Ramanathan"
            value={formData.parentName || ''}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={Boolean(errors.parentName)}
          />
          {errors.parentName && (
            <span className="field-error-msg">
              <AlertCircleIcon size={14} /> {errors.parentName}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="contactNumber" className="form-label">
            Contact Number <span className="req-star">*</span>
          </label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            className={`form-control ${errors.contactNumber ? 'has-error' : ''}`}
            placeholder="10-digit mobile number"
            value={formData.contactNumber || ''}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={Boolean(errors.contactNumber)}
          />
          {errors.contactNumber && (
            <span className="field-error-msg">
              <AlertCircleIcon size={14} /> {errors.contactNumber}
            </span>
          )}
        </div>
      </div>

      {/* Row 4: Street Address (Full Width) */}
      <div className="form-group full-width">
        <label htmlFor="streetAddress" className="form-label">
          Street Address <span className="req-star">*</span>
        </label>
        <input
          type="text"
          id="streetAddress"
          name="streetAddress"
          className={`form-control ${errors.streetAddress ? 'has-error' : ''}`}
          placeholder="House no., street name, area"
          value={formData.streetAddress || ''}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-required="true"
          aria-invalid={Boolean(errors.streetAddress)}
        />
        {errors.streetAddress && (
          <span className="field-error-msg">
            <AlertCircleIcon size={14} /> {errors.streetAddress}
          </span>
        )}
      </div>

      {/* Row 5: City & State */}
      <div className="form-grid-2">
        <div className="form-group">
          <label htmlFor="city" className="form-label">
            City <span className="req-star">*</span>
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className={`form-control ${errors.city ? 'has-error' : ''}`}
            placeholder="e.g. Madurai"
            value={formData.city || ''}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={Boolean(errors.city)}
          />
          {errors.city && (
            <span className="field-error-msg">
              <AlertCircleIcon size={14} /> {errors.city}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="state" className="form-label">
            State <span className="req-star">*</span>
          </label>
          <input
            type="text"
            id="state"
            name="state"
            className={`form-control ${errors.state ? 'has-error' : ''}`}
            placeholder="e.g. Tamil Nadu"
            value={formData.state || ''}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={Boolean(errors.state)}
          />
          {errors.state && (
            <span className="field-error-msg">
              <AlertCircleIcon size={14} /> {errors.state}
            </span>
          )}
        </div>
      </div>

      {/* Row 6: Country & Pincode */}
      <div className="form-grid-2">
        <div className="form-group">
          <label htmlFor="country" className="form-label">
            Country <span className="req-star">*</span>
          </label>
          <input
            type="text"
            id="country"
            name="country"
            className={`form-control ${errors.country ? 'has-error' : ''}`}
            placeholder="e.g. India"
            value={formData.country || ''}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={Boolean(errors.country)}
          />
          {errors.country && (
            <span className="field-error-msg">
              <AlertCircleIcon size={14} /> {errors.country}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="pincode" className="form-label">
            Pincode <span className="req-star">*</span>
          </label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            className={`form-control ${errors.pincode ? 'has-error' : ''}`}
            placeholder="6-digit pincode (e.g. 625016)"
            value={formData.pincode || ''}
            onChange={handleChange}
            disabled={isSubmitting}
            maxLength={6}
            aria-required="true"
            aria-invalid={Boolean(errors.pincode)}
          />
          {errors.pincode && (
            <span className="field-error-msg">
              <AlertCircleIcon size={14} /> {errors.pincode}
            </span>
          )}
        </div>
      </div>

      {/* Row 7: Remarks (Multiline) */}
      <div className="form-group full-width">
        <label htmlFor="remarks" className="form-label">
          Remarks / Additional Queries <span className="req-star">*</span>
        </label>
        <textarea
          id="remarks"
          name="remarks"
          rows={3}
          className={`form-control ${errors.remarks ? 'has-error' : ''}`}
          placeholder="Please share any specific requirements, previous school background, or queries..."
          value={formData.remarks || ''}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-required="true"
          aria-invalid={Boolean(errors.remarks)}
        />
        {errors.remarks && (
          <span className="field-error-msg">
            <AlertCircleIcon size={14} /> {errors.remarks}
          </span>
        )}
      </div>

      {/* Submit Action */}
      <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          type="submit"
          className="btn btn-primary btn-submit-enquiry"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="btn-spinner" aria-hidden="true" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <span>Submit Enquiry</span>
              <ArrowRightIcon size={18} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
