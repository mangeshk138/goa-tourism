(() => {
  'use strict';
  document.getElementById('year').textContent = new Date().getFullYear();
  const filterButtons = document.querySelectorAll('[data-filter]');
  const destinations = document.querySelectorAll('.destination-item');
  filterButtons.forEach(button => button.addEventListener('click', () => {
    filterButtons.forEach(item => {
      item.classList.toggle('active', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });
    let count = 0;
    destinations.forEach(item => {
      item.hidden = button.dataset.filter !== 'all' && item.dataset.category !== button.dataset.filter;
      if (!item.hidden) count++;
    });
    document.getElementById('filter-status').textContent = `${count} ${count === 1 ? 'destination' : 'destinations'} shown.`;
  }));
  const tripDays = {
    coast: { title: 'Ease into the coast', description: 'Settle in, stroll along Anjuna Beach, and leave the evening open for a relaxed coastal dinner.' },
    heritage: { title: 'Color, cafés & old stories', description: 'Spend a gentle day exploring Fontainhas in Panaji. Pause for a café break and enjoy the neighborhood’s colorful architecture.' },
    fort: { title: 'Sea views & a little history', description: 'Explore Fort Aguada in Sinquerim, then make time to enjoy the nearby coast. Check current opening hours before setting out.' },
    south: { title: 'Take the slower road south', description: 'Make time for a change of scenery around Agonda. If you are staying in the north, consider an overnight stay to keep the travel comfortable.' },
    food: { title: 'A taste of local life', description: 'Seek out a neighborhood bakery, try Goan flavors at a local restaurant, and enjoy an unhurried afternoon.' },
    rest: { title: 'A day with no hurry', description: 'Stay close to your base. Read by the coast, enjoy a long lunch, and keep the day free for whatever catches your eye.' }
  };
  const routes = { mix: ['coast', 'heritage', 'fort', 'food', 'south'], beach: ['coast', 'rest', 'fort', 'south', 'food'], culture: ['heritage', 'fort', 'food', 'coast', 'rest'] };
  const moods = { mix: 'A little of everything', beach: 'Beaches & slow days', culture: 'Culture & heritage' };
  const itinerary = document.getElementById('itinerary');
  const scrollBehavior = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
  document.getElementById('trip-form').addEventListener('submit', event => {
    event.preventDefault();
    const style = document.getElementById('trip-style').value;
    const days = Number(document.getElementById('trip-days').value);
    document.getElementById('itinerary-title').textContent = `${days} days of ${moods[style].toLowerCase()}`;
    const list = document.getElementById('itinerary-days');
    list.replaceChildren();
    routes[style].slice(0, days).forEach((key, index) => {
      const day = tripDays[key];
      const item = document.createElement('li'); item.className = 'col-md-6 col-lg-4';
      const card = document.createElement('div'); card.className = 'day-card';
      const label = document.createElement('span'); label.textContent = `DAY ${String(index + 1).padStart(2, '0')}`;
      const title = document.createElement('h4'); title.textContent = day.title;
      const description = document.createElement('p'); description.textContent = day.description;
      card.append(label, title, description); item.append(card); list.append(item);
    });
    itinerary.hidden = false;
    itinerary.focus({ preventScroll: true });
    itinerary.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
  });
  document.getElementById('close-itinerary').addEventListener('click', () => {
    itinerary.hidden = true;
    document.querySelector('#trip-form button').focus({ preventScroll: true });
    document.getElementById('plan').scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
  });
  const places = {
    anjuna: { title: 'Anjuna Beach', description: 'A stretch of North Goa’s coast with sandy shores, beach shacks, and a relaxed seaside atmosphere. Take your time and enjoy the changing colors of the Arabian Sea.', tip: 'Build in a beach walk and a leisurely meal. Follow the lifeguards’ guidance and leave the beach as clean as you found it.', mood: 'beach' },
    fontainhas: { title: 'Fontainhas', description: 'Discover Panaji’s colorful heritage quarter, where winding lanes and Portuguese-influenced houses invite you to explore on foot. Look out for traditional details and local cafés as you wander.', tip: 'This is a living neighborhood. Walk quietly, respect private homes, and ask residents before taking their photographs.', mood: 'culture' },
    aguada: { title: 'Fort Aguada', description: 'Overlooking the Arabian Sea near Sinquerim, Fort Aguada brings together coastal views and Goa’s Portuguese-era history. Its lighthouse and laterite walls make an atmospheric stop on a sightseeing day.', tip: 'Bring a hat and water for the exposed courtyard. Verify current access and opening hours before your visit.', mood: 'culture' }
  };
  let selectedMood = 'mix';
  const placeModal = document.getElementById('destination-modal');
  placeModal.addEventListener('show.bs.modal', event => {
    const place = places[event.relatedTarget?.dataset.place];
    if (!place) return;
    document.getElementById('destination-title').textContent = place.title;
    document.getElementById('destination-description').textContent = place.description;
    document.getElementById('destination-tip').textContent = place.tip;
    selectedMood = place.mood;
  });
  document.getElementById('destination-plan').addEventListener('click', () => {
    document.getElementById('trip-style').value = selectedMood;
    placeModal.addEventListener('hidden.bs.modal', () => {
      document.getElementById('trip-style').focus({ preventScroll: true });
      document.getElementById('plan').scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
    }, { once: true });
    bootstrap.Modal.getInstance(placeModal).hide();
  });
  const menu = document.getElementById('mainNav');
  menu.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', () => {
    if (menu.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(menu).hide();
  }));
})();
