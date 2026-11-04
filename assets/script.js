console.log("JS file is connected and running!");

// "copy" button next to the e-mail address
document.querySelectorAll('.copy-email').forEach(btn => {
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(btn.dataset.email).then(() => {
      btn.textContent = 'copied!';
      setTimeout(() => { btn.textContent = 'copy'; }, 2000);
    });
  });
});

// Handle Form Submission

// Stop the form to reload success blank page
const contactForm = document.querySelector('.contact-form');

// only run if the form exists on this page (otherwise the whole script stops here)
if (contactForm) contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); // THIS stops the default submission
    console.log("Form submission prevented!");

     //This grabs the contact data
    const name = contactForm.querySelector('input[name="name"]').value;
    const email = contactForm.querySelector('input[name="contact"]').value;
    const message = contactForm.querySelector('textarea[name="message"]').value;
    console.log(name, email, message);

     // prepare data to send
    const formData = new FormData();
    formData.append('name', name);
    formData.append('contact', email);
    formData.append('message', message);
    formData.append('submit', 'submit'); // optional, if your PHP checks for it

     // send to PHP
    fetch('/assets/contactform.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())  
    .then(data => {
    console.log("PHP responded:", data); // see what PHP says
    // show a success message in your HTML
    const feedback = document.querySelector('.form-feedback');
    feedback.style.display = 'block';

    // contactform.php answers "Success" only when the e-mail really went out
    if (data.trim() === "Success") {
        feedback.textContent = "Thanks for getting in touch! We will get back to you soon.";
        contactForm.reset();
    } else {
        feedback.textContent = "Sorry, your message could not be sent. Please write to contact@albumlab.org";
    }
    })
    .catch(error => {
        console.error('Damm something is not working, sorry', error);
        const feedback = document.querySelector('.form-feedback');
        feedback.textContent = "Sorry, your message could not be sent. Please write to contact@albumlab.org";
        feedback.style.display = 'block';
    });

});




// Loop through every month card
document.querySelectorAll('.sequence-card').forEach(card => {
  
  // Find buttons inside this card
  const btn_module = card.querySelector('.module-btn');
  const btn_action = card.querySelector('.action-btn');
 

  // Find modals inside this card
  const modal_module = card.querySelector('.modal.module');
  const modal_action = card.querySelector('.modal.action');

  // Open module modal
  if (btn_module && modal_module) {
    btn_module.addEventListener('click', () => {
      modal_module.showModal();
    });
  }

  // Open action modal
  if (btn_action && modal_action) {
    btn_action.addEventListener('click', () => {
      modal_action.showModal();
    });
  }

  // Close buttons for modals in this card
  card.querySelectorAll('.close-modal-btn').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      closeBtn.closest('dialog').close();
    });
  });
});


const modal = document.querySelector('.contact-form-modal');
const openModal = document.querySelector('.open-contact');
const closeModal = document.querySelector('.close-contact');

if (modal && openModal && closeModal) {
  openModal.addEventListener("click", ()=> {
    modal.showModal();
  });
  closeModal.addEventListener("click", ()=> {
    modal.close();
  });
}


