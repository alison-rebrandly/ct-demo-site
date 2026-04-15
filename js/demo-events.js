/**
 * CT Demo Site — Conversion Event Tracking
 *
 * Uses the Rebrandly Conversion Tracking SDK loaded via:
 * <script src="https://cdn.test.rebrandly.com/sdk/v1/rbly.min.js" data-api-key="...">
 *
 * SDK method: trackConversion({ eventName, revenue, currency, properties })
 */

// ── Safe wrapper around the CT SDK ──
function trackEvent(eventName, opts) {
  opts = opts || {};
  var payload = {
    eventName: eventName,
    properties: opts.properties || {}
  };
  if (opts.revenue !== undefined) payload.revenue = opts.revenue;
  if (opts.currency) payload.currency = opts.currency;

  console.log('[CT Demo] trackConversion:', payload);

  if (typeof trackConversion === 'function') {
    trackConversion(payload);
  }
}

// ── Page View (auto-fires on every page) ──
document.addEventListener('DOMContentLoaded', function () {
  trackEvent('page_view', {
    properties: {
      page: document.title,
      path: window.location.pathname,
      referrer: document.referrer
    }
  });
});

// ── CTA Button Clicks ──
document.querySelectorAll('[data-ct-event]').forEach(function (el) {
  el.addEventListener('click', function () {
    var eventName = el.getAttribute('data-ct-event');
    var props = {};

    if (el.getAttribute('data-ct-plan'))  props.plan = el.getAttribute('data-ct-plan');
    if (el.getAttribute('data-ct-cta'))   props.cta_location = el.getAttribute('data-ct-cta');

    var opts = { properties: props };

    // If there's a dollar value (pricing cards), include revenue
    if (el.getAttribute('data-ct-value')) {
      opts.revenue = parseFloat(el.getAttribute('data-ct-value'));
      opts.currency = 'USD';
    }

    trackEvent(eventName, opts);
  });
});

// ── Signup Form Submission ──
var signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var formData = new FormData(signupForm);
    var plan = formData.get('plan') || 'starter';

    // Map plan to revenue value
    var planPrices = { starter: 0, professional: 79, enterprise: 249 };
    var revenue = planPrices[plan] || 0;

    trackEvent('signup_completed', {
      revenue: revenue,
      currency: 'USD',
      properties: {
        plan: plan,
        company_size: formData.get('company_size') || '',
        company: formData.get('company') || ''
      }
    });

    // Redirect to thank-you page after tracking
    window.location.href = 'thankyou.html';
  });
}
