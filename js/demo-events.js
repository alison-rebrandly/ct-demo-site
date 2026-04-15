/**
 * CT Demo Site — Event Helpers
 *
 * This file contains the custom conversion event calls that will fire
 * when users interact with key elements on the demo site.
 *
 * IMPORTANT: The actual Rebrandly CT snippet must be loaded in the <head>
 * of each page BEFORE these events will work. Alison will provide the snippet.
 *
 * Until the snippet is added, these functions log to the console so you can
 * verify they fire at the right time.
 */

// ── Utility: safe wrapper around the CT SDK ──
function trackEvent(eventName, properties) {
  console.log('[CT Demo] Event:', eventName, properties || {});

  // Once the Rebrandly CT snippet is loaded, replace the console.log above
  // with the actual SDK call. Example (uncomment when ready):
  //
  // if (typeof rbly !== 'undefined' && rbly.track) {
  //   rbly.track(eventName, properties);
  // }
}

// ── Page View (auto-fires on every page) ──
document.addEventListener('DOMContentLoaded', function () {
  trackEvent('page_view', {
    page: document.title,
    path: window.location.pathname,
    referrer: document.referrer
  });
});

// ── CTA Button Clicks ──
document.querySelectorAll('[data-ct-event]').forEach(function (el) {
  el.addEventListener('click', function () {
    var eventName = el.getAttribute('data-ct-event');
    var eventProps = {};

    // Pull optional properties from data attributes
    if (el.getAttribute('data-ct-plan'))    eventProps.plan = el.getAttribute('data-ct-plan');
    if (el.getAttribute('data-ct-value'))   eventProps.value = parseFloat(el.getAttribute('data-ct-value'));
    if (el.getAttribute('data-ct-cta'))     eventProps.cta_location = el.getAttribute('data-ct-cta');

    trackEvent(eventName, eventProps);
  });
});

// ── Signup Form Submission ──
var signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var formData = new FormData(signupForm);
    trackEvent('signup_completed', {
      plan: formData.get('plan') || 'free',
      company_size: formData.get('company_size') || '',
    });

    // Redirect to thank-you page after tracking
    window.location.href = 'thankyou.html';
  });
}
