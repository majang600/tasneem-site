// public/js/login.js
import { supabase } from './supabase.js'

const form = document.getElementById('login-form')
form.addEventListener('submit', async e => {
  e.preventDefault()

  const email    = document.getElementById('email').value.trim()
  const password = document.getElementById('password').value

  const { user, error } = await supabase.auth.signIn({ email, password })

  if (error) {
    alert('❌ ' + error.message)
  } else {
    // redirect based on role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile.role === 'teacher') {
      window.location.href = 'assets/teacher_dashboard.html'
    } else {
      window.location.href = 'assets/student_dashboard.html'
    }
  }
})
