document.addEventListener('DOMContentLoaded', function() {
    // Flashcard functionality
    const flashcard = document.getElementById('flashcard');
    const flipCardBtn = document.getElementById('flip-card-btn');
    const newCardBtn = document.getElementById('new-card-btn');
    const saveCardBtn = document.getElementById('save-card-btn');
    const frontText = document.getElementById('front-text');
    const backText = document.getElementById('back-text');
    const savedCardsList = document.getElementById('saved-cards-list');
    const easyBtn = document.getElementById('easy-btn');
    const mediumBtn = document.getElementById('medium-btn');
    const hardBtn = document.getElementById('hard-btn');
    
    let savedCards = JSON.parse(localStorage.getItem('flashcards')) || [];
    
    // Flip card
    flipCardBtn.addEventListener('click', function() {
        flashcard.classList.toggle('flipped');
    });
    
    // New card
    newCardBtn.addEventListener('click', function() {
        frontText.value = '';
        backText.value = '';
        if (flashcard.classList.contains('flipped')) {
            flashcard.classList.remove('flipped');
        }
    });
    
    // Save card
    saveCardBtn.addEventListener('click', function() {
        if (frontText.value.trim() === '' || backText.value.trim() === '') {
            alert('Please enter both front and back text');
            return;
        }
        
        const newCard = {
            front: frontText.value,
            back: backText.value,
            id: Date.now()
        };
        
        savedCards.push(newCard);
        localStorage.setItem('flashcards', JSON.stringify(savedCards));
        renderSavedCards();
        
        // Clear inputs
        frontText.value = '';
        backText.value = '';
        if (flashcard.classList.contains('flipped')) {
            flashcard.classList.remove('flipped');
        }
        
        alert('Card saved successfully!');
    });
    
    // Difficulty buttons
    easyBtn.addEventListener('click', function() {
        alert('Marked as Easy - Will show again in 3 days');
    });
    
    mediumBtn.addEventListener('click', function() {
        alert('Marked as Medium - Will show again tomorrow');
    });
    
    hardBtn.addEventListener('click', function() {
        alert('Marked as Hard - Will show again in 1 hour');
    });
    
    // Render saved cards
    function renderSavedCards() {
        savedCardsList.innerHTML = '';
        
        if (savedCards.length === 0) {
            savedCardsList.innerHTML = '<li>No saved cards yet. Create your first card!</li>';
            return;
        }
        
        savedCards.forEach(card => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${card.front} → ${card.back}</span>
                <button class="delete-btn" data-id="${card.id}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            savedCardsList.appendChild(li);
        });
        
        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                savedCards = savedCards.filter(card => card.id !== id);
                localStorage.setItem('flashcards', JSON.stringify(savedCards));
                renderSavedCards();
            });
        });
    }
    
    // Initial render
    renderSavedCards();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.feature-card, .testimonial, .pricing-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animation
    document.querySelectorAll('.feature-card, .testimonial, .pricing-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});