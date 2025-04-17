// assets/js/teacher.js
import { supabase } from './supabase.js'

document.addEventListener('DOMContentLoaded', async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return (location.href = 'index.html')

  // ensure teacher
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  if (profile.role !== 'teacher') return (location.href = 'student_dashboard.html')

  document.getElementById('logout').onclick = async () => {
    await supabase.auth.signOut()
    location.href = 'index.html'
  }

  const { data: students } = await supabase
    .from('profiles')
    .select('id,username')
    .eq('role','student')

  const table = document.getElementById('scores-table')
  for (let s of students) {
    const { data: scores } = await supabase
      .from('scores')
      .select('grade,comprehension_id,score')
      .eq('user_id', s.id)
    const div = document.createElement('div')
    div.innerHTML = `<h3>${s.username}</h3>` +
      scores.map(r=>
        `<p>Grade ${r.grade} – Comp ${r.comprehension_id}: ${r.score}%</p>`
      ).join('')
    table.appendChild(div)
  }
})
