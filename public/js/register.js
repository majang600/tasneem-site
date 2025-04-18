import { supabase } from './supabase.js'

const form    = document.getElementById('register-form')
const message = document.getElementById('message')

form.addEventListener('submit', async e => {
  e.preventDefault()
  const username = form.username.value.trim()
  const email    = form.email.value.trim()
  const password = form.password.value.trim()
  const role     = form.role.value    // "student" or "teacher"

  // Sign up, storing username & role in user_metadata
  const { data: { user }, error: signUpError } = 
    await supabase.auth.signUp({
      email,
      password
    }, {
      data: { username, role }
    })

  if (signUpError) {
    message.textContent = signUpError.message
    return
  }

  // Once the user record exists, insert into your profiles table
  // (this is what login.js later expects)
  if (user) {
    const { error: insertError } = await supabase
      .from('profiles')
      .insert({ id: user.id, username, role })

    if (insertError) {
      message.textContent = insertError.message
      return
    }
  }

  // Redirect immediately if auto‑confirmed, otherwise wait for email link
  if (user && user.confirmation_sent_at === null) {
    window.location.href = role === 'teacher'
      ? 'teacher_dashboard.html'
      : 'student_dashboard.html'
  } else {
    message.textContent = 'Check your email to confirm your account'
    supabase.auth.onAuthStateChange((event, session) => {
      if (session && event === 'SIGNED_IN') {
        window.location.href = role === 'teacher'
          ? 'teacher_dashboard.html'
          : 'student_dashboard.html'
      }
    })
  }
})
