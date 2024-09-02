 // Swiper initialization
    var swiper = new Swiper(".mySwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      pagination: {
        el: ".swiper-pagination",
      },
    });

  // FAQ accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
        question.classList.toggle('active');
        const answer = question.nextElementSibling;
        answer.classList.toggle('show');
      });
    });
    // Calendar functionality
    const calendarDays = document.getElementById('calendar-days');
    const currentMonthEl = document.getElementById('current-month');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');

    let currentDate = new Date();

    function generateCalendar(year, month) {
      calendarDays.innerHTML = '';
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstDay = new Date(year, month, 1).getDay();

      currentMonthEl.textContent = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });

      for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('calendar-day');
        calendarDays.appendChild(emptyDay);
      }

      for (let day = 1; day <= daysInMonth; day++) {
        const dayEl = document.createElement('div');
        dayEl.classList.add('calendar-day');
        dayEl.textContent = day;

        if (year === currentDate.getFullYear() && month === currentDate.getMonth() && day === currentDate.getDate()) {
          dayEl.classList.add('current');
        }

        calendarDays.appendChild(dayEl);
      }
    }

    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());

    prevMonthBtn.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    });

    nextMonthBtn.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    });

    // Chat widget functionality
    const chatWidget = document.getElementById('chat-widget');
    const chatHeader = document.getElementById('chat-header');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input').querySelector('input');
    const chatSendBtn = document.getElementById('chat-input').querySelector('button');

    let isChatOpen = false;

    chatHeader.addEventListener('click', () => {
      isChatOpen = !isChatOpen;
      chatWidget.style.height = isChatOpen ? '400px' : '40px';
    });

    chatSendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });

    function sendMessage() {
      const message = chatInput.value.trim();
      if (message) {
        const messageEl = document.createElement('p');
        messageEl.textContent = `Vous: ${message}`;
        chatMessages.appendChild(messageEl);
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Simulate a response from the chatbot
        setTimeout(() => {
          const responseEl = document.createElement('p');
          responseEl.textContent = "Assistant: Merci pour votre message. Un de nos conseillers vous répondra dans les plus brefs délais.";
          chatMessages.appendChild(responseEl);
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
      }
    }

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('show');
    });

    document.querySelectorAll('nav ul li a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('show');
      });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });

    // Rating functionality
    const ratingForm = document.createElement('div');
    ratingForm.classList.add('rating-form');
    ratingForm.innerHTML = `
      <h3>Évaluez notre service</h3>
      <div class="rating-stars">
        <i class="far fa-star" data-rating="1"></i>
        <i class="far fa-star" data-rating="2"></i>
        <i class="far fa-star" data-rating="3"></i>
        <i class="far fa-star" data-rating="4"></i>
        <i class="far fa-star" data-rating="5"></i>
      </div>
      <div class="rating-comment">
        <textarea placeholder="Laissez un commentaire..."></textarea>
      </div>
      <button class="rating-submit">Soumettre</button>
    `;

    document.querySelector('#temoignages .container').appendChild(ratingForm);

    const stars = ratingForm.querySelectorAll('.rating-stars i');
    let currentRating = 0;

    stars.forEach(star => {
      star.addEventListener('mouseover', () => {
        const rating = star.dataset.rating;
        highlightStars(rating);
      });

      star.addEventListener('mouseout', () => {
        highlightStars(currentRating);
      });

      star.addEventListener('click', () => {
        currentRating = star.dataset.rating;
        highlightStars(currentRating);
      });
    });

    function highlightStars(rating) {
      stars.forEach(star => {
        if (star.dataset.rating <= rating) {
          star.classList.remove('far');
          star.classList.add('fas');
        } else {
          star.classList.remove('fas');
          star.classList.add('far');
        }
      });
    }

    const submitRating = ratingForm.querySelector('.rating-submit');
    submitRating.addEventListener('click', () => {
      const comment = ratingForm.querySelector('textarea').value;
      if (currentRating > 0) {
        alert(`Merci pour votre évaluation de ${currentRating} étoiles et votre commentaire : "${comment}"`);
        // Here you would typically send this data to your server
      } else {
        alert('Veuillez sélectionner une note avant de soumettre.');
      }
    });