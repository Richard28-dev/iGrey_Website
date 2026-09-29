/* ==========================================================================
   iGREY HOLDINGS — PRIVATE ENQUIRY FORM CONTROLLER
   ========================================================================== */

export function initEnquiryForm() {
  const form = document.querySelector('#enquiry-form');
  const successState = document.querySelector('#enquiry-success');
  if (!form) return;

  // Floating label trigger on input change
  form.querySelectorAll('.form-input-underline').forEach((input) => {
    input.addEventListener('input', () => {
      if (input.value.trim() !== '') {
        input.setAttribute('data-has-value', 'true');
      } else {
        input.removeAttribute('data-has-value');
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Check validity
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Transmitting to Senior Desk...';
    }

    // Simulate front-end submission to private client desk
    setTimeout(() => {
      form.style.display = 'none';
      if (successState) {
        successState.style.display = 'block';
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    }, 800);
  });

  // Reset form trigger
  const resetBtn = document.querySelector('#enquiry-reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      form.style.display = 'block';
      if (successState) {
        successState.style.display = 'none';
      }
    });
  }
}
