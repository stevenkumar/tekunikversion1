const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

/**
 * Sends an email notification to the admin with form submission data.
 * @param {string} subject - Email subject line
 * @param {object} data - Form data object
 * @param {string} formType - Type of form (e.g., "Contact", "Web Project", "Mobile Project")
 */
const sendEmail = async (subject, data, formType) => {
    // Build HTML rows from form data
    const rows = Object.entries(data)
        .filter(([key]) => !['_id', '__v', 'createdAt', 'updatedAt'].includes(key))
        .map(([key, value]) => {
            const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
            const displayValue = Array.isArray(value) ? value.join(', ') : (value || '—');
            return `<tr><td style="padding:10px 14px;border:1px solid #e2e8f0;font-weight:600;color:#475569;background:#f8fafc;width:35%">${label}</td><td style="padding:10px 14px;border:1px solid #e2e8f0;color:#1e293b">${displayValue}</td></tr>`;
        })
        .join('');

    const html = `
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0">
      <div style="background:linear-gradient(135deg,#0d9488,#14b8a6);padding:28px 32px;color:white">
        <h1 style="margin:0;font-size:22px;font-weight:700">📬 New ${formType} Submission</h1>
        <p style="margin:8px 0 0;opacity:0.9;font-size:14px">Received on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
      </div>
      <div style="padding:24px 32px">
        <table style="width:100%;border-collapse:collapse;border-radius:8px;overflow:hidden">
          ${rows}
        </table>
      </div>
      <div style="background:#f1f5f9;padding:16px 32px;text-align:center;color:#94a3b8;font-size:12px">
        Tekunik — Automated Form Notification
      </div>
    </div>
  `;

    const mailOptions = {
        from: `"Tekunik Forms" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `[Tekunik] ${subject}`,
        html,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
