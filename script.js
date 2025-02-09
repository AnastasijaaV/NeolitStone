function toggleMenu() {
    const menu = document.querySelector('nav ul');
    menu.classList.toggle('active');  // Otvara ili zatvara meni
}

document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function() {
        const menu = document.querySelector('nav ul');
        menu.classList.remove('active');  // Zatvara meni nakon klika na link
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    
    let currentIndex = 0;

    // Funkcija za promenu slike
    function updateCarousel() {
        const offset = -currentIndex * 100;
        carousel.style.transform = `translateX(${offset}%)`;

        // Ažuriranje aktivnog indikatora
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // Sledeća slika
    nextButton.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % items.length; // Ciklično
        updateCarousel();
    });

    // Prethodna slika
    prevButton.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + items.length) % items.length; // Ciklično
        updateCarousel();
    });

    // Dugmadi za indikatore
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            currentIndex = index;
            updateCarousel();
        });
    });

    // Inicijalno ažuriranje galerije
    updateCarousel();
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const onamaSection = document.getElementById('onama');
    
    // Funkcija koja proverava kada je sekcija u vidljivom delu ekrana
    function checkVisibility() {
        const rect = onamaSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            onamaSection.classList.add('visible');
        }
    }
    
    // Pozivamo funkciju odmah nakon učitavanja stranice
    checkVisibility();

    // Dodajemo listener za skrolovanje
    window.addEventListener('scroll', checkVisibility);
});
document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('nav ul li a');  // Svi meni linkovi
    const sections = document.querySelectorAll('section');  // Sve sekcije na stranici

    // Funkcija koja proverava koja sekcija je u vidljivom delu ekrana
    function setActiveLink() {
        let currentSection = null;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                currentSection = section;
            }
        });

        menuLinks.forEach(link => {
            link.classList.remove('active');  // Uklanja "active" klasu sa svih linkova
            if (currentSection && link.getAttribute('href') === '#' + currentSection.id) {
                link.classList.add('active');  // Dodaje "active" klasu na odgovarajući link
            }
        });
    }

    // Pozivamo funkciju odmah pri učitavanju stranice
    setActiveLink();

    // Dodajemo listener za skrolovanje
    window.addEventListener('scroll', setActiveLink);

    // Dodajemo listener za klik na meni link
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Uklanjamo "active" klasu sa svih linkova
            menuLinks.forEach(link => link.classList.remove('active'));
            // Dodajemo "active" klasu na kliknuti link
            this.classList.add('active');
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const homeLink = document.getElementById('homeLink');  // ID linka "Početna"

    // Dodajemo event listener za klik na link "Početna"
    homeLink.addEventListener('click', function(e) {
        e.preventDefault();  // Sprečavamo podrazumevano ponašanje linka

        // Pomeramo stranicu na vrh
        window.scrollTo({
            top: 0,
            behavior: 'smooth'  // Glatko skrolovanje do vrha
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const kontaktLink = document.getElementById('kontaktLink');  // ID za kontakt link
    const content = document.getElementById('content');  // Glavni sadržaj

    // Funkcija koja učitava sadržaj za Kontakt stranicu
    function loadContact() {
        content.innerHTML = `
            <section id="kontakt" class="container mt-5">
                <h2>Kontakt informacije</h2>
                <div class="contact-details">
                    <p><strong>Telefon:</strong> <a href="tel:+0658478076">065/8478076</a></p>
                    <p><strong>Email:</strong> <a href="mailto:info@studenicki-kamen.com">info@studenicki-kamen.com</a></p>
                    <p><strong>Instagram:</strong> <a href="https://www.instagram.com/studenicki.kamen84/" target="_blank">studenicki.kamen84</a></p>
                </div>
                <div class="map">
                    <h3>Lokacija</h3>
                    <img src="image.png" alt="Mapa lokacije" class="location-map">
                </div>
            </section>
        `;
    }

    // Dodavanje event listener-a na klik na "Kontakt" link
    kontaktLink.addEventListener('click', function(e) {
        e.preventDefault();  // Sprečavamo podrazumevano ponašanje linka
        loadContact();  // Učitajte sadržaj za Kontakt
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const productImages = document.querySelectorAll('.product-image');

    // Funkcija koja proverava kada je slika u vidljivom delu ekrana
    function checkVisibility() {
        productImages.forEach(image => {
            const rect = image.getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                image.classList.add('visible');  // Dodajemo klasu koja pokreće animaciju
            }
        });
    }

    // Pozivamo funkciju odmah nakon učitavanja stranice
    checkVisibility();

    // Dodajemo listener za skrolovanje
    window.addEventListener('scroll', checkVisibility);
});
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const captionText = document.getElementById("caption");
    const images = document.querySelectorAll(".gallery-image"); // Corrected class
    const close = document.getElementsByClassName("close")[0];

    // Funkcija koja otvara modal i postavlja sliku
    images.forEach((img) => {
        img.addEventListener('click', function() {
            modal.style.display = "block"; // Otvori modal
            modalImg.src = this.src; // Postavi src slike u modal
            captionText.innerHTML = this.alt; // Postavi alt tekst kao opis slike
        });
    });

    // Funkcija za zatvaranje modala kada se klikne na X
    close.addEventListener('click', function() {
        modal.style.display = "none"; // Zatvori modal
    });

    // Zatvori modal ako korisnik klikne izvan slike
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none"; // Zatvori modal
        }
    });
});
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Sprečava podrazumevano ponašanje

        const targetId = this.getAttribute('href').substring(1); // Dobija ID sekcije
        const targetSection = document.getElementById(targetId);

        window.scrollTo({
            top: targetSection.offsetTop - 100, // Pomera za 100px iznad sekcije
            behavior: 'smooth'
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const welcomeSection = document.getElementById('welcome');
    
    // Funkcija koja proverava kada je sekcija u vidljivom delu ekrana
    function checkVisibility() {
        const rect = welcomeSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            welcomeSection.classList.add('visible');
        }
    }
    
    // Pozivamo funkciju odmah nakon učitavanja stranice
    checkVisibility();

    // Dodajemo listener za skrolovanje
    window.addEventListener('scroll', checkVisibility);
});
document.addEventListener('scroll', function() {
    const welcomeSection = document.getElementById('welcome');
    const scrollPosition = window.scrollY;
    const offset = scrollPosition * 0.5; // Brzina pomeranja pozadine, možete prilagoditi broj

    welcomeSection.style.backgroundPosition = `center ${offset}px`;  // Pomeranje pozadinske slike
});
document.addEventListener('scroll', function() {
    const welcomeSection = document.getElementById('welcome');
    const scrollPosition = window.scrollY;
    const offset = scrollPosition * 0.7;  // Podesi brzinu pomeranja

    // Menjaj pozadinsku poziciju na osnovu skrolovanja
    welcomeSection.style.backgroundPosition = `center ${offset}px`;
});


// Kada korisnik klikne na "Početna" link, ponovo pokreni animaciju sekcije #welcome
document.getElementById('homeLink').addEventListener('click', function(e) {
    e.preventDefault();  // Sprečava podrazumevano ponašanje (skakanje do sekcije)
    
    const welcomeSection = document.getElementById('welcome');
    
    // Ukloni klasu 'visible' (ako postoji) koja je možda već postavljena
    welcomeSection.classList.remove('visible');
    
    // Kratak timeout kako bi omogućili uklanjanje klasa pre ponovnog dodavanja
    setTimeout(() => {
        // Ponovno dodajemo klasu 'visible' koja pokreće animaciju
        welcomeSection.classList.add('visible');
        
        // Skroluj do sekcije sa glatkim pomeranjem
        window.scrollTo({
            top: welcomeSection.offsetTop - 100, // Pomera za 100px iznad sekcije
            behavior: 'smooth'  // Glatko skrolovanje
        });
    }, 1000);  // Odlaganje od 500ms kako bi efekat bio vidljiviji
});
