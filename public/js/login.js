// public/js/login.js
import { supabase } from './supabase.js'

const form    = document.getElementById('login-form')
const message = document.getElementById('message')

form.addEventListener('submit', async e => {
  e.preventDefault()

  const selectedRole = document.getElementById('role').value   // "student" or "teacher"
  const email        = document.getElementById('email').value.trim()
  const password     = document.getElementById('password').value.trim()

  message.textContent = ''

  // 1) Sign in
  const { data: { user }, error: signInError } =
    await supabase.auth.signInWithPassword({ email, password })
  if (signInError || !user) {
    message.textContent = signInError?.message || 'Login failed'
    return
  }

  // 2) Load their profile row
  const { data: profile, error: profileError } =
    await supabase
      .from('profiles')
      .select('username, role')
      .eq('id', user.id)
      .single()
  if (profileError || !profile) {
    message.textContent = profileError?.message || 'Profile not found'
    return
  }

  // Normalize role for comparison
  const storedRole = profile.role.toLowerCase()
  if (storedRole !== selectedRole) {
    message.textContent = `Your account is "${profile.role}", not "${selectedRole}".`
    return
  }

  // 3) Persist for teacher.js guard
  localStorage.setItem('role', storedRole)
  localStorage.setItem('username', profile.username)

  // 4) Redirect
  window.location.href =
    storedRole === 'teacher'
      ? 'teacher_dashboard.html'
      : 'student_dashboard.html'
})
