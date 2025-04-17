// public/student.js
import { supabase } from './supabase.js';

const form    = document.getElementById('login-form');
const message = document.getElementById('message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  message.textContent = '';

  const email    = form.email.value;
  const password = form.password.value;

  const { data: user, error } = await supabase.auth.signInWithPassword({
    email, password
  });

  if (error) {
    message.textContent = error.message;
  } else {
    // store user info if you like, then go to dashboard
    window.location.href = 'student_dashboard.html';
  }
});
