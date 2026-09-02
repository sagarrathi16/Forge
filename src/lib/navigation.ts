/**
 * Smoothly scrolls to the waitlist section, triggers a pulse animation on the form,
 * and auto-focuses the email input field.
 */
export function animateScrollToWaitlist(e?: React.MouseEvent) {
  if (e) e.preventDefault();

  if (typeof window === 'undefined') return;

  const waitlistSection = document.getElementById('waitlist');
  const waitlistForm = document.getElementById('waitlistForm');
  const emailInput = document.getElementById('email') as HTMLInputElement | null;

  if (waitlistSection) {
    waitlistSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    window.history.pushState(null, '', '/#waitlist');

    if (waitlistForm) {
      waitlistForm.classList.remove('pulse-highlight');
      // Force DOM reflow to re-trigger CSS animation
      void waitlistForm.offsetWidth;
      waitlistForm.classList.add('pulse-highlight');
    }

    setTimeout(() => {
      emailInput?.focus();
    }, 550);
  } else {
    // If on a page other than '/', redirect to '/#waitlist'
    window.location.href = '/#waitlist';
  }
}

