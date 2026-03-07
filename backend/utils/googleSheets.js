/**
 * Sends form submission data to Google Sheets via Apps Script Webhook.
 * @param {string} formType - "Contact", "Web Project", or "Mobile Project"
 * @param {object} data - The form data
 */
const syncToGoogleSheets = async (formType, data) => {
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

    if (!webhookUrl) {
        console.warn('⚠️ GOOGLE_SHEET_WEBHOOK_URL not set in .env. Skipping Google Sheets sync.');
        return;
    }

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                formType,
                data
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log(`✅ Synced to Google Sheets: ${formType}`);
    } catch (error) {
        console.error(`❌ Failed to sync to Google Sheets (${formType}):`, error.message);
    }
};

module.exports = syncToGoogleSheets;
