/**
 * Loan & Mortgage Advisory — Blog Filter & Search Module
 */

document.addEventListener('DOMContentLoaded', () => {
  initBlogFilter();
});

function initBlogFilter() {
  const searchInput = document.getElementById('blog-search-input');
  const categoryBtns = document.querySelectorAll('[data-blog-cat]');
  const blogCards = document.querySelectorAll('[data-blog-card]');

  if (!blogCards.length) return;

  let activeCategory = 'all';
  let searchQuery = '';

  function filterPosts() {
    blogCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category') || '';
      const cardTitle = card.querySelector('.blog-title')?.textContent.toLowerCase() || '';
      const cardExcerpt = card.querySelector('.blog-excerpt')?.textContent.toLowerCase() || '';

      const matchesCat = activeCategory === 'all' || cardCategory === activeCategory;
      const matchesSearch = searchQuery === '' || cardTitle.includes(searchQuery) || cardExcerpt.includes(searchQuery);

      if (matchesCat && matchesSearch) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-blog-cat');
      filterPosts();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      filterPosts();
    });
  }
}
