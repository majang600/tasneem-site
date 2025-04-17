// public/js/register.js
import { supabase } from './supabase.js'

const form = document.getElementById('register-form')
form.addEventListener('submit', async e => {
  e.preventDefault()

  const username = document.getElementById('username').value.trim()
  const email    = document.getElementById('email').value.trim()
  const password = document.getElementById('password').value

  // sign up in Supabase, storing full_name & role metadata
  const { user, error } = await supabase.auth.signUp(
    { email, password },
    { data: { full_name: username, role: 'student' } }
  )

  if (error) {
    alert('❌ ' + error.message)
  } else {
    alert('✅ Registration successful – please check your email to confirm.')
    window.location.href = 'login.html'
  }
})
