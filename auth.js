document.addEventListener('DOMContentLoaded', () => {
  // =========================================
  // 1. UPDATED DOM Elements (Added Login elements)
  // =========================================
  const signupBtn = document.querySelector('.btn-primary');
  const hiwHostCta = document.getElementById('hiwHostCta');
  const loginBtn = document.querySelector('.btn-secondary'); // New: Assuming you have a .btn-login element
  const signupModal = document.getElementById('signupModal'); // Renamed from 'modal' for clarity
  const loginModal = document.getElementById('loginModal'); // New: Assuming you have a login modal with this ID

  const closeSignupBtn = signupModal.querySelector('.close-btn'); // Renamed
  const closeLoginBtn = loginModal ? loginModal.querySelector('.close-btn') : null; // New: Login close button

  const roleSelectView = document.getElementById('roleSelectionView');
  const formView = document.getElementById('registrationFormView');
  const roleSelectButtons = signupModal.querySelectorAll('.select-role-btn');
  const backBtn = document.getElementById('backToRoles');
  const formTitle = document.getElementById('formTitle');
  const driverForm = document.getElementById('driverForm');
  const hostForm = document.getElementById('hostForm');

  // New: Modal switching links
  const openLoginFromSignup = document.getElementById('openLoginFromSignup');
  const openSignupFromLogin = document.getElementById('openSignupFromLogin');

  // --- General View Switching Utility ---
  function showView(modalElement, viewId) {
    // Only target views within the given modal
    const views = modalElement.querySelectorAll('.modal-view');
    views.forEach(view => view.classList.remove('active-view'));
    modalElement.querySelector(`#${viewId}`).classList.add('active-view');
  }

  // --- Core Modal Control Functions ---

  function resetSignupModal() {
    showView(signupModal, 'roleSelectionView');
    driverForm.classList.remove('active-form');
    hostForm.classList.remove('active-form');
  }

  function closeAllModals() {
    signupModal.style.display = 'none';
    if (loginModal) loginModal.style.display = 'none';
    // Always reset signup state on close
    resetSignupModal();
  }

  function openSignupModal() {
    closeAllModals();
    signupModal.style.display = 'flex';
    resetSignupModal(); // Redundant but safe
  }

  function openLoginModal() {
    closeAllModals();
    if (loginModal) loginModal.style.display = 'flex';
  }


  // 🟢 NEW FUNCTION: Opens Signup Modal directly to Host Form 🟢
  function openHostRegistration() {
    closeAllModals();
    signupModal.style.display = 'flex';

    // 1. Switch to the form view
    showView(signupModal, 'registrationFormView');

    // 2. Set the title and activate the host form
    formTitle.textContent = "Host Registration";
    hostForm.classList.add('active-form');
    driverForm.classList.remove('active-form');
  }



  // =========================================
  // 2. Button Listeners
  // =========================================

  // Signup Button
  signupBtn.addEventListener('click', openSignupModal);

  // 🟢 HIW Register as Host Button (goes directly to form) 🟢
  if (hiwHostCta) {
    hiwHostCta.addEventListener('click', (e) => {
      e.preventDefault();
      openHostRegistration();
    });
  }

  // Login Button (New functionality)
  if (loginBtn) {
    loginBtn.addEventListener('click', openLoginModal);
  }

  // Close Buttons
  closeSignupBtn.addEventListener('click', closeAllModals);
  if (closeLoginBtn) {
    closeLoginBtn.addEventListener('click', closeAllModals);
  }

  // Close on backdrop click
  signupModal.addEventListener('click', (e) => {
    if (e.target === signupModal) {
      closeAllModals();
    }
  });
  if (loginModal) {
    loginModal.addEventListener('click', (e) => {
      if (e.target === loginModal) {
        closeAllModals();
      }
    });
  }

  // =========================================
  // 3. Role/View Switching Logic
  // =========================================

  // Role Selection Handler (Updated to use showView)
  roleSelectButtons.forEach(button => {
    button.addEventListener('click', () => {
      const roleCard = button.closest('.role-card');
      const role = roleCard.dataset.role;

      showView(signupModal, 'registrationFormView'); // Pass signupModal as context

      // Set Form Title and show correct form
      if (role === 'driver') {
        formTitle.textContent = "Driver Registration";
        driverForm.classList.add('active-form');
        hostForm.classList.remove('active-form');
      } else if (role === 'host') {
        formTitle.textContent = "Host Registration";
        hostForm.classList.add('active-form');
        driverForm.classList.remove('active-form');
      }
    });
  });

  // Back Button Handler (Updated to use showView)
  backBtn.addEventListener('click', () => {
    showView(signupModal, 'roleSelectionView'); // Pass signupModal as context
    driverForm.classList.remove('active-form');
    hostForm.classList.remove('active-form');
  });

  // New: Modal Switching Handlers
  if (openLoginFromSignup) {
    openLoginFromSignup.addEventListener('click', (e) => {
      e.preventDefault();
      openLoginModal();
    });
  }

  if (openSignupFromLogin) {
    openSignupFromLogin.addEventListener('click', (e) => {
      e.preventDefault();
      openSignupModal();
    });
  }

  // --- Form Submission (Example only) ---
  // (Submission handlers remain the same)
  driverForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Driver registration simulated!');
    closeAllModals();
  });

  hostForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Host registration simulated!');
    closeAllModals();
  });
});