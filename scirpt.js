document.addEventListener('DOMContentLoaded', function () {
  var portfolioContainer = document.querySelector('.section-portfolio');
  var portfolioItems = Array.from(portfolioContainer.getElementsByClassName('portfolio-box'));

  function sortPortfolioItems(category) {
    portfolioItems.forEach(function (item) {
      var itemCategories = item.dataset.ref.split(' ');
      if (category === '*' || itemCategories.includes(category)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  // Filter items on button click
  var filterButtons = document.querySelectorAll('.filter-buttons button');
  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var category = this.dataset.filter;
      sortPortfolioItems(category);

      // Remove active class from all buttons
      filterButtons.forEach(function (btn) {
        btn.classList.remove('active');
      });

      // Add active class to the clicked button
      this.classList.add('active');
    });
  });

  // Update portfolio sorting on navbar link click
  var portfolioNavLink = document.querySelector('.navbar li a[href="#portfolio"]');
  var portfolioOptions = document.querySelector('.portfolio-options');
  var portfolioOptionLinks = portfolioOptions.querySelectorAll('li a');
  portfolioOptionLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      var category = this.dataset.filter;
      sortPortfolioItems(category);

      // Remove active class from all portfolio option links
      portfolioOptionLinks.forEach(function (optionLink) {
        optionLink.classList.remove('active');
      });

      // Add active class to the clicked portfolio option link
      this.classList.add('active');

      // Scroll to the portfolio section
      var portfolioSection = document.getElementById('portfolio');
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Show portfolio options on navbar link hover
  portfolioNavLink.addEventListener('mouseover', function () {
    portfolioOptions.style.display = 'block';
  });

  // Hide portfolio options on navbar link mouseout
  portfolioNavLink.addEventListener('mouseout', function () {
    portfolioOptions.style.display = 'none';
  });

  // Show all items initially
  sortPortfolioItems('*');

});
