// navbar
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 0);
});

// Get the dropdown menu element
const dropdownMenu = document.querySelector('.portfolio-options');

let timeoutId;

// Add event listener for mouseleave on the parent li element
dropdownMenu.parentNode.addEventListener('mouseleave', () => {
  // Clear the previous timeout if any
  clearTimeout(timeoutId);
  
  // Delay hiding the dropdown menu to allow moving the mouse into it
  timeoutId = setTimeout(() => {
    dropdownMenu.style.display = 'none';
  }, 1000); // Adjust the delay duration as needed (in milliseconds)
});

// Add event listener for mouseenter on the parent li element
dropdownMenu.parentNode.addEventListener('mouseenter', () => {
  // Clear the previous timeout if any
  clearTimeout(timeoutId);
  
  // Show the dropdown menu with the desired margin-top
  dropdownMenu.style.display = 'flex';
});


// homepage
let words = document.querySelectorAll('.word');
words.forEach((word) => {
    let letters = word.textContent.split('');
    word.textContent = '';
    letters.forEach((letter) => {
        let span = document.createElement('span');
        span.textContent = letter;
        span.className = 'letter';
        word.appendChild(span);
    });
});

let currentWordIndex = 0;
let maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = '1';

let changeText = () => {
    let currentWord = words[currentWordIndex];
    let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

    Array.from(currentWord.children).forEach((letter, i) => {
        setTimeout(() => {
            letter.className = 'letter out';
        }, i * 80);
    });

    nextWord.style.opacity = '1';
    Array.from(nextWord.children).forEach((letter, i) => {
        letter.className = 'letter behind';
        setTimeout(() => {
            letter.className = 'letter in';
        }, 340 + i * 80);
    });

    currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

changeText();
setInterval(changeText, 3000);

const observers = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Reset skill bar animations
      const skillBars = entry.target.querySelectorAll(".skill-bar .bar span");
      skillBars.forEach((bar) => {
        bar.style.animation = "none";
        void bar.offsetWidth; // Trigger reflow
        bar.style.animation = null;
      });

      // Reset skill circle animations
      const circles = entry.target.querySelectorAll(".circle");
      circles.forEach((elem) => {
        let dots = elem.getAttribute("data-dots");
        let marked = elem.getAttribute("data-percent");
        let percent = Math.floor((dots * marked) / 100);
        let points = "";
        let rotate = 360 / dots;

        for (let i = 0; i < dots; i++) {
          points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
        }
        elem.innerHTML = points;

        const pointsMarked = elem.querySelectorAll(".points");
        for (let i = 0; i < percent; i++) {
          pointsMarked[i].classList.add("marked");
        }
      });
    }
  });
});

const skillsSection = document.querySelector("#skills");
observers.observe(skillsSection);






// navmenu dropdown
    let menuLi = document.querySelectorAll('header ul li a');
    let section = document.querySelectorAll('section');

    function activeMenu() {
      let length = section.length;
      while (--length && window.scrollY + 97 < section[length].offsetTop) {}
      menuLi.forEach(sec => sec.classList.remove('active'));
      menuLi[length].classList.add('active');
    }

    activeMenu();
    window.addEventListener("scroll", activeMenu);

    // menu icon
    let menuIcon = document.querySelector("#menu-icon");
    let navList = document.querySelector(".navlist");

    menuIcon.addEventListener("click", toggleMenu);

    function toggleMenu() {
      menuIcon.classList.toggle('bx-x');
      navList.classList.toggle('open');
    }

    // Close the menu when a menu item is clicked
    let menuItems = document.querySelectorAll('.navlist a');
    menuItems.forEach(item => {
      item.addEventListener("click", closeMenu);
    });

    function closeMenu() {
      menuIcon.classList.remove('bx-x');
      navList.classList.remove('open');
    }

    // Close the menu when scrolling
    window.addEventListener("scroll", closeMenuOnScroll);

    function closeMenuOnScroll() {
      if (navList.classList.contains('open')) {
        menuIcon.classList.remove('bx-x');
        navList.classList.remove('open');
      }
    }

// Footer JavaScript
const footerColumns = document.querySelectorAll(".footer-column");

footerColumns.forEach((column) => {
  const heading = column.querySelector("h3");
  const list = column.querySelector("ul");

  heading.addEventListener("click", () => {
    column.classList.toggle("open");
  });
});

// paralax
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show-items");
    } else {
      entry.target.classList.remove("show-items");
    }
  });
});

const scrollScale = document.querySelectorAll(".scroll-scale");
scrollScale.forEach((element) => observer.observe(element));

const scrollBottom = document.querySelectorAll(".scroll-bottom");
scrollBottom.forEach((element) => observer.observe(element));

const scrollTop = document.querySelectorAll(".scroll-top");
scrollTop.forEach((element) => observer.observe(element));


// redirect the user to index.html after form submission
function submitForm(event) {
  event.preventDefault();
  const form = event.target;
  fetch(form.action, {
    method: form.method,
    body: new FormData(form),
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      alert("Thanks for your submission!");
      form.reset(); // Reset the form
    }
  }).catch(error => {
    alert("Oops! There was a problem submitting your form")
  });
}