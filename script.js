const menuToggle = document.querySelector('#menuToggle');
const nav = document.querySelector('#nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  nav.addEventListener('click', event => {
    if (event.target.closest('a')) {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open menu');
    }
  });
}

document.querySelectorAll('.current-year').forEach(element => {
  element.textContent = new Date().getFullYear();
});

const enquiryForm = document.querySelector('#enquiryForm');
if (enquiryForm) {
  const params = new URLSearchParams(window.location.search);
  const item = params.get('item');
  const type = params.get('type');
  const message = document.querySelector('#fMsg');
  const select = document.querySelector('#fType');
  const nameField = document.querySelector('#fName');
  const phone = document.querySelector('#fPhone');
  const phoneDigits = phone => {
    phone.value = phone.value.replace(/\D/g, '').slice(0, 10);
    phone.setCustomValidity(phone.value && !/^\d{10}$/.test(phone.value) ? 'Enter exactly 10 digits, without a country code.' : '');
  };

  phone.addEventListener('input', () => phoneDigits(phone));

  if (window.location.hash === '#fName') {
    requestAnimationFrame(() => nameField.focus({ preventScroll: true }));
  }

  if (item && message) message.value = `I'm interested in: ${item}`;
  if (type && select) {
    const option = [...select.options].find(entry => entry.text.toLowerCase() === type.toLowerCase());
    if (option) select.value = option.value;
    else if (message) message.value = `I'm interested in: ${type}`;
  }

  enquiryForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = document.querySelector('#fName');
    const note = document.querySelector('#formNote');

    phoneDigits(phone);
    if (!name.value.trim() || !phone.value.trim()) {
      note.textContent = 'Please enter your name and phone number so we can reply.';
      return;
    }
    if (!/^\d{10}$/.test(phone.value)) {
      note.textContent = 'Please enter a valid 10-digit mobile number.';
      phone.reportValidity();
      return;
    }

    note.textContent = '';
    const text = [
      'Hello LG Gems & Jewellery,',
      `Name: ${name.value.trim()}`,
      `Phone: ${phone.value.trim()}`,
      `Looking for: ${select.value}`,
      `Details: ${message.value.trim() || '-'}`
    ].join('\n');

    window.open(`https://wa.me/919929793092?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  });
}

window.addEventListener('scroll', () => {
  const header = document.querySelector('#header');
  if (header) header.style.boxShadow = window.scrollY > 10 ? '0 6px 24px rgba(14,59,58,.12)' : 'none';
}, { passive: true });
