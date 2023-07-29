 

gsap.from('.headline', {
    opacity: 0,
    y: 50,
    duration: 1.5,
    ease: 'power4.out',
});

// Select the about-content element
const aboutContent = document.querySelector('.about-content');

// Set initial opacity and translateY values
gsap.set(aboutContent, { opacity: 0, y: 50 });

// Create the scroll-triggered animation
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.create({
  trigger: aboutContent,
  start: 'top 80%',
  end: 'bottom 80%',
  onEnter: () => {
    gsap.to(aboutContent, { opacity: 1, y: 0, duration: 1 });
  },
  onEnterBack: () => {
    gsap.to(aboutContent, { opacity: 1, y: 0, duration: 1 });
  },
});




 // Smooth scroll function
 function scrollToSection(element) {
  window.scrollTo({
    behavior: 'smooth',
    top: element.offsetTop
  });
}

// Add click event listener to the "ABOUT" link
document.getElementById('about').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent default link behavior

  var aboutContent = document.getElementById('about-content');
  scrollToSection(aboutContent);
});
////
//BLOB START///
const blob = document.getElementById("blob");
let posX = 0;
let posY = 0;
let isAboutHovered = false;
let isTalkHovered = false;
let isAboutClicked = false;
let isAboutContentHovered = false;

document.body.addEventListener("mousemove", (event) => {
  const { clientX, clientY } = event;
  const scrollX = window.scrollX || window.pageXOffset;
  const scrollY = window.scrollY || window.pageYOffset;
  posX = clientX + scrollX;
  posY = clientY + scrollY;
});

function updateBlobFilter() {
  let blurValue = "9.4rem";
  if (isAboutHovered || isTalkHovered || isAboutContentHovered) {
    blurValue = "5rem";
  }

  // Adjust blur value for "about-content" hover
  if (isAboutContentHovered) {
    blurValue = "12.4rem";
  }

  blob.style.filter = `blur(${blurValue})`;
  blob.style.transition = "filter 1.3s";
}

function updateBlobPosition() {
  if (!isMobile) {
    const targetX = posX;
    const targetY = posY;
    const currentX = parseFloat(blob.style.left) || 0;
    const currentY = parseFloat(blob.style.top) || 0;
    const deltaX = targetX - currentX;
    const deltaY = targetY - currentY;
    const easingFactor = 0.1; // Adjust this value to control the delay/speed

    blob.style.left = `${currentX + deltaX * easingFactor}px`;
    blob.style.top = `${currentY + deltaY * easingFactor}px`;

    requestAnimationFrame(updateBlobPosition);
  }
}

// Mobile detection using window width
const isMobile = window.innerWidth < 768;

// Helper function to debounce a function
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

document.getElementById("about").addEventListener("mouseenter", () => {
  if (!isMobile && !isAboutClicked) {
    isAboutHovered = true;
    updateBlobFilter();
  }
});

document.getElementById("about").addEventListener("mouseleave", () => {
  if (!isMobile && !isTalkHovered && !isAboutClicked) {
    isAboutHovered = false;
    updateBlobFilter();
  }
});

document.getElementById("work").addEventListener("mouseenter", () => {
  if (!isMobile && !isAboutClicked) {
    isAboutHovered = true;
    updateBlobFilter();
  }
});

document.getElementById("work").addEventListener("mouseleave", () => {
  if (!isMobile && !isTalkHovered && !isAboutClicked) {
    isAboutHovered = false;
    updateBlobFilter();
  }
});

document.getElementById("talk").addEventListener("mouseenter", () => {
  if (!isMobile && !isAboutClicked) {
    isTalkHovered = true;
    updateBlobFilter();
  }
});

document.getElementById("talk").addEventListener("mouseleave", () => {
  if (!isMobile && !isAboutHovered && !isAboutClicked) {
    isTalkHovered = false;
    updateBlobFilter();
  }
});

document.getElementById("about-content").addEventListener("mouseenter", () => {
  if (!isMobile && !isAboutClicked) {
    isAboutContentHovered = true;
    updateBlobFilter();
  }
});

document.getElementById("about-content").addEventListener("mouseleave", () => {
  if (!isMobile && !isAboutHovered && !isAboutClicked) {
    isAboutContentHovered = false;
    updateBlobFilter();
  }
});

// Add click event listener to set the aboutClicked flag to true
document.getElementById("about").addEventListener("click", () => {
  isAboutClicked = true;
});

// Add click event listener to reset the blob filter on document click
document.addEventListener("click", () => {
  isAboutClicked = false;
  updateBlobFilter();
});

if (!isMobile) {
  updateBlobPosition();
}

//END OF BLOB//
///work

// Import GSAP and ScrollTrigger libraries if you haven't already

// Select the cards
const cards = document.querySelectorAll('.card');

// Animate the cards on scroll with scrollTrigger
cards.forEach((card, index) => {
  gsap.from(card, {
    opacity: 0,
    y: 100,
    duration: 1,
    delay: index * 0.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: card,
      start: 'top 90%', // Adjust the scroll trigger start position as needed
      end: 'bottom 90%', // Adjust the scroll trigger end position as needed
      scrub: 1, // This smooths the animation during scrolling
    },
  });
});

////////
 // GSAP animation function to follow the cursor on the Y-axis
 function followCursor() {
  const border = document.querySelector('.about-content .border');
  const aboutContent = document.getElementById('about-content');
  
  // Get the height of the border and the container
  const borderHeight = border.offsetHeight;
  const contentHeight = aboutContent.offsetHeight;
  
  // Calculate the maximum Y position for the border
  const maxY = contentHeight - borderHeight;
  
  // Listen for mousemove event on the container
  aboutContent.addEventListener('mousemove', (e) => {
    // Calculate the new Y position for the border based on the mouse cursor's Y position
    let newY = e.clientY - aboutContent.getBoundingClientRect().top - borderHeight / 2;
    
    // Ensure the border stays within the container's boundaries
    newY = Math.max(0, Math.min(newY, maxY));
    
    // Apply the new Y position using GSAP
    gsap.to(border, { y: newY });
  });
}

// Call the function to initialize the cursor-following animation
followCursor();