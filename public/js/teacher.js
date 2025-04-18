// public/js/teacher.js
import { supabase } from './supabase.js';

const logoutBtn = document.getElementById('logout-btn');
const tbody     = document.querySelector('#scores-table tbody');
const loader    = document.getElementById('loader');

// Wire up logout to simply clear localStorage and go back
logoutBtn.addEventListener('click', async () => {
  localStorage.clear();
  window.location.href = 'index.html';
});

async function init() {
  // 1) Fetch student profiles
  const { data: profiles, error: pErr } = await supabase
    .from('profiles')
    .select('id, username')
    .eq('role', 'student');
  if (pErr) {
    console.error('Error loading profiles:', pErr);
    loader.style.display = 'none';
    return;
  }

  // 2) Fetch all scores
  const { data: scores, error: sErr } = await supabase
    .from('scores')
    .select('user_id, comp, score, created_at')
    .order('created_at', { ascending: false });
  if (sErr) {
    console.error('Error loading scores:', sErr);
    loader.style.display = 'none';
    return;
  }

  // 3) Group scores by user_id
  const scoresByUser = {};
  profiles.forEach(p => { scoresByUser[p.id] = []; });
  scores.forEach(s => {
    if (scoresByUser[s.user_id]) {
      scoresByUser[s.user_id].push(s);
    }
  });

  // 4) Render rows
  tbody.innerHTML = '';
  profiles.forEach(p => {
    const list = scoresByUser[p.id];
    if (list.length) {
      list.forEach(s => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${p.username}</td>
          <td>${s.comp}</td>
          <td>${s.score}</td>
          <td>${new Date(s.created_at).toLocaleString()}</td>
        `;
        tbody.append(tr);
      });
    } else {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${p.username}</td>
        <td colspan="3" style="text-align:center;font-style:italic;">
          No scores yet
        </td>
      `;
      tbody.append(tr);
    }
  });

  // 5) Hide the loader
  loader.style.display = 'none';
}

init();
