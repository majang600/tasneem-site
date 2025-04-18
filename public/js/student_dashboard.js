// public/js/student_dashboard.js

import { supabase } from './supabase.js';

const studentNameEl = document.getElementById('student-name');
const logoutBtn = document.getElementById('logout-btn');
const gradeBtns = document.querySelectorAll('.grade-btn');

async function init() {
  // Check for active session
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return window.location.href = 'index.html';

  // Display student name (assuming you stored it in user_metadata)
  const { data: { user } } = await supabase.auth.getUser();
  studentNameEl.textContent = user.user_metadata.username || user.email;

  // Set up logout
  logoutBtn.addEventListener('click', async () => {
    await supabase.auth.signOut();
    window.location.href = 'index.html';
  });

  // Grade buttons navigation
  gradeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const grade = btn.dataset.grade;
      window.location.href = `grade-${grade}.html`;
    });
  });
}

init();
