// Token Inspector Zero-CDN ES Module Client

const state = {
  currentTab: 'timeline',
  requests: [],
  selectedRequest: null,
};

function initTabs() {
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = `view-${tab.dataset.tab}`;
      const panel = document.getElementById(targetId);
      if (panel) panel.classList.add('active');
      state.currentTab = tab.dataset.tab;
    });
  });
}

async function loadHistory() {
  try {
    const res = await fetch('/_inspector/api/history?limit=50');
    if (res.ok) {
      const data = await res.json();
      state.requests = data.items || [];
      renderTimeline();
    }
  } catch (err) {
    console.error('Failed to load history:', err);
  }
}

function renderTimeline() {
  const tbody = document.getElementById('requests-tbody');
  const countLabel = document.getElementById('total-count');
  if (!tbody) return;

  if (countLabel) countLabel.textContent = `Total: ${state.requests.length} requests`;

  if (state.requests.length === 0) {
    tbody.innerHTML = '<tr class="empty-row"><td colspan="7">Waiting for incoming API requests...</td></tr>';
    return;
  }

  tbody.innerHTML = state.requests.map(req => `
    <tr data-id="${req.id}">
      <td><code>${req.id}</code></td>
      <td>${new Date(req.timestamp).toLocaleTimeString()}</td>
      <td><span class="badge">${req.model}</span></td>
      <td>${req.prompt_tokens} / ${req.completion_tokens}</td>
      <td>$${Number(req.estimated_cost_usd).toFixed(6)}</td>
      <td>${req.duration_ms} ms</td>
      <td><button class="btn btn-secondary btn-inspect" data-id="${req.id}">Inspect</button></td>
    </tr>
  `).join('');

  tbody.querySelectorAll('.btn-inspect').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      inspectRequest(id);
    });
  });
}

function inspectRequest(id) {
  const req = state.requests.find(r => r.id === id);
  if (!req) return;
  state.selectedRequest = req;

  const aside = document.getElementById('aside-detail-pane');
  if (!aside) return;

  aside.innerHTML = `
    <div class="detail-section">
      <h4>${req.id} (${req.model})</h4>
      <p><strong>Total Tokens:</strong> ${req.total_tokens} (Prompt: ${req.prompt_tokens}, Comp: ${req.completion_tokens})</p>
      <p><strong>Saturation:</strong> ${req.saturation_pct}% of ${req.context_ceiling}</p>
      <p><strong>Cost:</strong> $${req.estimated_cost_usd}</p>
    </div>
    <div class="detail-tokens">
      <h4>Completion Tokens Detail:</h4>
      <div class="chips-container">
        ${(req.completion_tokens_detail || []).map((t, idx) => `
          <span class="token-chip token-hue-${idx % 6}" title="ID: ${t.token_id} | ${t.raw_bytes}">${escapeHtml(t.text)}</span>
        `).join('')}
      </div>
    </div>
  `;
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function initSSE() {
  const statusBadge = document.getElementById('connection-status');
  const evtSource = new EventSource('/_inspector/api/events');

  evtSource.onopen = () => {
    if (statusBadge) {
      statusBadge.textContent = '● Live SSE';
      statusBadge.style.backgroundColor = '#064e3b';
    }
  };

  evtSource.onerror = () => {
    if (statusBadge) {
      statusBadge.textContent = '○ Reconnecting';
      statusBadge.style.backgroundColor = '#7f1d1d';
    }
  };

  evtSource.addEventListener('request_captured', (e) => {
    try {
      const data = JSON.parse(e.data);
      console.log('Request captured event:', data);
      loadHistory();
    } catch (_) {}
  });

  evtSource.addEventListener('stream_completed', (e) => {
    try {
      const data = JSON.parse(e.data);
      console.log('Stream completed event:', data);
      loadHistory();
    } catch (_) {}
  });
}

// Budget simulation runner
function initBudgetRunner() {
  const btn = document.getElementById('btn-run-budget');
  if (!btn) return;

  btn.addEventListener('click', async () => {
    const ceilingInput = document.getElementById('budget-ceiling');
    const payloadInput = document.getElementById('budget-payload');
    const output = document.getElementById('budget-diff-output');

    let messages = [];
    try {
      messages = JSON.parse(payloadInput.value || '[]');
    } catch {
      messages = [{ role: 'user', content: payloadInput.value || '' }];
    }

    const payload = {
      messages: messages.map(m => ({ role: m.role || 'user', content: m.content || '', priority: m.priority || 4 })),
      max_tokens: parseInt(ceilingInput.value || '1000', 10),
      model: 'gpt-4o',
    };

    const res = await fetch('/_inspector/api/budget/simulate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      output.innerHTML = `
        <div class="result-box">
          <p><strong>Satisfied:</strong> ${data.is_budget_satisfied}</p>
          <p><strong>Tokens Saved:</strong> ${data.diff.tokens_saved}</p>
          <p><strong>Final Tokens:</strong> ${data.diff.truncated_tokens}</p>
        </div>
      `;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  loadHistory();
  initSSE();
  initBudgetRunner();
});
