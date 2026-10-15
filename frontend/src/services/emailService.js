import emailjs from '@emailjs/browser';

/**
 * Service to handle admission form submission via EmailJS (browser-compatible).
 * Configured recipient: softwarebilling067@gmail.com
 */

export const RECIPIENT_EMAIL = 'softwarebilling067@gmail.com';

export const isEmailServiceConfigured = () => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  console.log('EmailJS config check:', {
    serviceIdPresent: Boolean(serviceId),
    templateIdPresent: Boolean(templateId),
    publicKeyPresent: Boolean(publicKey),
    serviceIdIsPlaceholder: serviceId?.includes('your_') ?? false,
    templateIdIsPlaceholder: templateId?.includes('your_') ?? false,
    publicKeyIsPlaceholder: publicKey?.includes('your_') ?? false,
  });

  return Boolean(
    serviceId &&
    templateId &&
    publicKey &&
    !serviceId.includes('your_') &&
    !templateId.includes('your_') &&
    !publicKey.includes('your_')
  );
};

export async function sendAdmissionEnquiry(formData) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!isEmailServiceConfigured()) {
    // Return honest descriptive failure without simulating fake success
    return {
      success: false,
      isConfigError: true,
      message: `EmailJS is not yet configured. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your frontend .env file to route inquiries to ${RECIPIENT_EMAIL}.`,
    };
  }

  // Format template parameters matching form fields
  const templateParams = {
    to_email: RECIPIENT_EMAIL,
    student_name: formData.studentName,
    dob: formData.dob,
    gender: formData.gender,
    class_applying: formData.classApplying,
    parent_name: formData.parentName,
    contact_number: formData.contactNumber,
    street_address: formData.streetAddress,
    city: formData.city,
    state: formData.state,
    country: formData.country,
    pincode: formData.pincode,
    remarks: formData.remarks,
    submitted_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  };

  try {
    const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
    if (response.status === 200 || response.text === 'OK') {
      return {
        success: true,
        message: 'Your admission enquiry has been submitted successfully! Our admissions office will get in touch with you shortly.',
      };
    }
    return {
      success: false,
      message: `Submission returned status ${response.status}. Please check your connection and try again.`,
    };
  } catch (error) {
    console.error('EmailJS submission error:', error);
    return {
      success: false,
      message: error?.text || error?.message || 'Failed to submit admission enquiry. Please verify your internet connection or contact the school office directly.',
    };
  }
}
