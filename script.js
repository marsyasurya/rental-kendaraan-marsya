document.addEventListener("DOMContentLoaded", function () {
  // -- highlight aktif di navbar
  const links = document.querySelectorAll('.menu a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // -- filter & pencarian (hanya jika ada vehicle cards di halaman)
  const searchInput = document.getElementById('searchInput');
  const filterSelect = document.getElementById('filterSelect');
  const vehicleCards = document.querySelectorAll('.vehicle-card');

  if (vehicleCards.length > 0) {
    function filterVehicles() {
      const term = (searchInput && searchInput.value) ? searchInput.value.toLowerCase() : '';
      const type = (filterSelect && filterSelect.value) ? filterSelect.value : 'all';

      vehicleCards.forEach(card => {
        const name = (card.dataset.name || '').toLowerCase();
        const ctype = (card.dataset.type || '').toLowerCase();
        const matchesSearch = name.includes(term);
        const matchesType = type === 'all' || ctype === type;

        if (matchesSearch && matchesType) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    }

    if (searchInput) searchInput.addEventListener('input', filterVehicles);
    if (filterSelect) filterSelect.addEventListener('change', filterVehicles);

    // initial render
    filterVehicles();

    // buka modal detail saat klik kartu
    vehicleCards.forEach(card => {
      card.addEventListener('click', () => {
        const item = {
          name: card.dataset.name || '',
          type: card.dataset.type || '',
          price: card.dataset.price || '',
          desc: card.dataset.desc || '',
          src: card.querySelector('img') ? card.querySelector('img').src : ''
        };
        openModal(item);
      });
    });
  }

  // -- modal
  function openModal(item) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close">&times;</span>
        <img src="${item.src}" alt="${item.name}">
        <h2>${item.name}</h2>
        <p style="color:#555">${item.desc}</p>
        <p><strong>Jenis:</strong> ${item.type}</p>
        ${item.price ? `<p><strong>Harga:</strong> Rp ${parseInt(item.price).toLocaleString('id-ID')} / hari</p>` : ''}
        <button class="btn rent-btn" style="margin-top:12px">Sewa Sekarang</button>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.close').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });

    const rentBtn = modal.querySelector('.rent-btn');
    rentBtn.addEventListener('click', () => {
      alert(`Booking (demo): ${item.name}\nTerima kasih!`);
      modal.remove();
    });
  }
});
