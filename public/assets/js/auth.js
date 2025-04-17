// assets/js/auth.js
import { supabase } from './supabase.js'

// — LOGIN —
const loginForm = document.getElementById('login-form')
if (loginForm) {
  loginForm.addEventListener('submit', async e => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return alert(error.message)

    // fetch user role from profiles table
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single()

    window.location.href =
      profile.role === 'teacher'
        ? 'teacher_dashboard.html'
        : 'student_dashboard.html'
  })
}

// — REGISTER —
const registerForm = document.getElementById('register-form')
if (registerForm) {
  registerForm.addEventListener('submit', async e => {
    e.preventDefault()
    const username = e.target.username.value
    const role     = e.target.role.value
    const email    = e.target.email.value
    const password = e.target.password.value

    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) return alert(error.message)

    // insert into profiles
    const { error: profErr } = await supabase
      .from('profiles')
      .insert([{ id: data.user.id, username, role }])
    if (profErr) alert(profErr.message)
    else window.location.href = 'index.html'
  })
}
