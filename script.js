// Shared interactions for the academic portfolio website.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? '×' : '☰';
  });

  // Academic planner: array of task objects, DOM updates, filters, and localStorage.
  const taskForm = document.querySelector('#task-form');
  if (taskForm) {
    const input = document.querySelector('#task-input');
    const list = document.querySelector('#task-list');
    const empty = document.querySelector('#empty-state');
    const count = document.querySelector('#remaining-count');
    const clear = document.querySelector('#clear-completed');
    const filters = [...document.querySelectorAll('[data-filter]')];
    let currentFilter = 'all';
    let tasks = [];
    try { tasks = JSON.parse(localStorage.getItem('josephAcademicTasks') || '[]'); if (!Array.isArray(tasks)) tasks = []; } catch { tasks = []; }
    const save = () => { try { localStorage.setItem('josephAcademicTasks', JSON.stringify(tasks)); } catch {} };
    const render = () => {
      list.replaceChildren();
      const shown = tasks.filter(task => currentFilter === 'all' || (currentFilter === 'active' && !task.completed) || (currentFilter === 'completed' && task.completed));
      shown.forEach(task => {
        const li = document.createElement('li'); li.className = `task-item${task.completed ? ' completed' : ''}`;
        const checkbox = document.createElement('input'); checkbox.type = 'checkbox'; checkbox.checked = task.completed; checkbox.setAttribute('aria-label', `Mark ${task.text} completed`);
        checkbox.addEventListener('change', () => { task.completed = checkbox.checked; save(); render(); });
        const text = document.createElement('span'); text.className = 'task-text'; text.textContent = task.text;
        const del = document.createElement('button'); del.className = 'delete-task'; del.type = 'button'; del.textContent = 'Delete'; del.setAttribute('aria-label', `Delete ${task.text}`);
        del.addEventListener('click', () => { tasks = tasks.filter(item => item.id !== task.id); save(); render(); });
        li.append(checkbox, text, del); list.append(li);
      });
      count.textContent = tasks.filter(task => !task.completed).length;
      empty.hidden = shown.length > 0;
      empty.textContent = tasks.length === 0 ? 'No tasks yet. Add your first study task above.' : 'No tasks match this filter.';
      clear.hidden = !tasks.some(task => task.completed);
    };
    taskForm.addEventListener('submit', event => {
      event.preventDefault(); const text = input.value.trim(); if (!text) { input.focus(); return; }
      tasks.unshift({ id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, text, completed: false });
      save(); input.value = ''; currentFilter = 'all'; filters.forEach(button => button.classList.toggle('active', button.dataset.filter === 'all')); render(); input.focus();
    });
    filters.forEach(button => button.addEventListener('click', () => { currentFilter = button.dataset.filter; filters.forEach(item => item.classList.toggle('active', item === button)); render(); }));
    clear.addEventListener('click', () => { tasks = tasks.filter(task => !task.completed); save(); render(); });
    render();
  }

  // Contact form validation: required fields, email format, and digits-only phone.
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    const fields = ['name', 'email', 'phone', 'message'];
    const feedback = document.querySelector('#form-feedback');
    contactForm.addEventListener('submit', event => {
      event.preventDefault(); let valid = true;
      fields.forEach(field => {
        const input = contactForm.elements[field]; const error = document.querySelector(`#${field}-error`);
        input.classList.remove('invalid'); error.textContent = '';
        let message = '';
        if (!input.value.trim()) message = 'This field is required.';
        else if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) message = 'Enter a valid email address.';
        else if (field === 'phone' && !/^\d+$/.test(input.value.trim())) message = 'Use digits only, without spaces or symbols.';
        if (message) { valid = false; input.classList.add('invalid'); error.textContent = message; }
      });
      feedback.className = `form-feedback ${valid ? 'success' : 'error'}`;
      feedback.textContent = valid ? 'Validation successful. This demo does not send the message to an inbox.' : 'Please correct the highlighted fields and try again.';
      if (!valid) contactForm.querySelector('.invalid')?.focus();
    });
    fields.forEach(field => contactForm.elements[field].addEventListener('input', () => {
      contactForm.elements[field].classList.remove('invalid'); document.querySelector(`#${field}-error`).textContent = '';
    }));
  }
});
