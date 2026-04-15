/**
 * CT Demo Site — Conversion Event Tracking
 *
 * Only conversion event: signup with plan selection.
 * Uses the Rebrandly CT SDK loaded via script tag in <head>.
 */

// ── Signup Form Submission ──
var signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var formData = new FormData(signupForm);
    var plan = formData.get('plan') || 'free';

    var planPrices = { free: 0, pro: 12, enterprise: 29 };

    var payload = {
      eventName: 'signup',
      revenue: planPrices[plan] || 0,
      currency: 'USD',
      properties: {
        plan: plan
      }
    };

    console.log('[CT Demo] trackConversion:', payload);

    if (typeof trackConversion === 'function') {
      trackConversion(payload);
    }

    // Redirect to thank-you page
    window.location.href = 'thankyou.html';
  });
}
