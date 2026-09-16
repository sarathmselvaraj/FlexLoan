/**
 * Loan & Mortgage Advisory — EMI Calculator Module
 * Realtime slider math, Chart.js Donut Visualization, & Amortization Schedule
 */

let emiChart = null;

document.addEventListener('DOMContentLoaded', () => {
  parseQueryParams();
  initEMICalculator();
});

function parseQueryParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const amount = urlParams.get('amount');
  const rate = urlParams.get('rate');
  const tenure = urlParams.get('tenure') || urlParams.get('years');

  if (amount) {
    const slider = document.getElementById('calc-amount-slider');
    const input = document.getElementById('calc-amount-input');
    if (slider) slider.value = amount;
    if (input) input.value = amount;
  }
  if (rate) {
    const slider = document.getElementById('calc-rate-slider');
    const input = document.getElementById('calc-rate-input');
    if (slider) slider.value = rate;
    if (input) input.value = rate;
  }
  if (tenure) {
    const slider = document.getElementById('calc-tenure-slider');
    const input = document.getElementById('calc-tenure-input');
    if (slider) slider.value = tenure;
    if (input) input.value = tenure;
  }
}

window.setPresetAmount = function(val) {
  const slider = document.getElementById('calc-amount-slider');
  const input = document.getElementById('calc-amount-input');
  if (slider) slider.value = val;
  if (input) input.value = val;
  calculateEMI();
};

window.setPresetRate = function(val) {
  const slider = document.getElementById('calc-rate-slider');
  const input = document.getElementById('calc-rate-input');
  if (slider) slider.value = val;
  if (input) input.value = val;
  calculateEMI();
};

window.setPresetTenure = function(val) {
  const slider = document.getElementById('calc-tenure-slider');
  const input = document.getElementById('calc-tenure-input');
  if (slider) slider.value = val;
  if (input) input.value = val;
  calculateEMI();
};

function initEMICalculator() {
  const amountSlider = document.getElementById('calc-amount-slider');
  const amountInput = document.getElementById('calc-amount-input');
  const rateSlider = document.getElementById('calc-rate-slider');
  const rateInput = document.getElementById('calc-rate-input');
  const tenureSlider = document.getElementById('calc-tenure-slider');
  const tenureInput = document.getElementById('calc-tenure-input');
  const tenureTypeSelect = document.getElementById('calc-tenure-type');

  if (!amountSlider || !amountInput) return;

  // Sync Slider and Text Input
  function syncInputs(slider, input, isFloat = false) {
    slider.addEventListener('input', (e) => {
      input.value = isFloat ? parseFloat(e.target.value).toFixed(1) : parseInt(e.target.value);
      calculateEMI();
    });

    input.addEventListener('input', (e) => {
      let val = isFloat ? parseFloat(e.target.value) : parseInt(e.target.value);
      if (isNaN(val)) val = slider.min;
      slider.value = val;
      calculateEMI();
    });
  }

  syncInputs(amountSlider, amountInput);
  syncInputs(rateSlider, rateInput, true);
  syncInputs(tenureSlider, tenureInput);

  if (tenureTypeSelect) {
    tenureTypeSelect.addEventListener('change', () => calculateEMI());
  }

  // Handle Theme Toggle for Chart colors
  window.addEventListener('themeChanged', () => {
    calculateEMI();
  });

  // Initial Calculate
  calculateEMI();
}

function calculateEMI() {
  const amount = parseFloat(document.getElementById('calc-amount-input')?.value || 100000);
  const annualRate = parseFloat(document.getElementById('calc-rate-input')?.value || 8.5);
  let tenure = parseFloat(document.getElementById('calc-tenure-input')?.value || 15);
  const tenureType = document.getElementById('calc-tenure-type')?.value || 'years';

  // Convert tenure to months
  const months = tenureType === 'years' ? tenure * 12 : tenure;
  const monthlyRate = annualRate / 12 / 100;

  // Math
  let emi = 0;
  let totalPayment = 0;
  let totalInterest = 0;

  if (monthlyRate === 0) {
    emi = amount / months;
    totalPayment = amount;
    totalInterest = 0;
  } else {
    const rateFactor = Math.pow(1 + monthlyRate, months);
    emi = (amount * monthlyRate * rateFactor) / (rateFactor - 1);
    totalPayment = emi * months;
    totalInterest = totalPayment - amount;
  }

  // Update Result Panel UI
  const formatCurr = (num) => '₹' + Math.round(num).toLocaleString('en-IN');

  const emiValEl = document.getElementById('res-monthly-emi');
  const principalValEl = document.getElementById('res-total-principal');
  const interestValEl = document.getElementById('res-total-interest');
  const payableValEl = document.getElementById('res-total-payable');

  if (emiValEl) emiValEl.textContent = formatCurr(emi);
  if (principalValEl) principalValEl.textContent = formatCurr(amount);
  if (interestValEl) interestValEl.textContent = formatCurr(totalInterest);
  if (payableValEl) payableValEl.textContent = formatCurr(totalPayment);

  // Update Chart
  updateChart(amount, totalInterest);

  // Generate Amortization Table if table container exists
  renderAmortizationSchedule(amount, monthlyRate, months, emi);
}

function updateChart(principal, interest) {
  const canvas = document.getElementById('emi-donut-chart');
  if (!canvas || typeof Chart === 'undefined') return;

  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  
  const principalColor = '#F2A65A'; // Warm gold-orange
  const interestColor = '#C9396B';  // Magenta / Rose
  const textColor = isLight ? '#1A1625' : '#FFFFFF';

  if (emiChart) {
    emiChart.data.datasets[0].data = [principal, interest];
    emiChart.options.plugins.legend.labels.color = textColor;
    emiChart.update();
  } else {
    emiChart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: ['Principal Loan Amount', 'Total Interest'],
        datasets: [{
          data: [principal, interest],
          backgroundColor: [principalColor, interestColor],
          borderColor: isLight ? '#FFFFFF' : '#1A1625',
          borderWidth: 3,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: textColor,
              font: {
                family: "'Outfit', sans-serif",
                size: 13,
                weight: '500'
              },
              padding: 16,
              usePointStyle: true
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.parsed || 0;
                return `${label}: ₹${Math.round(value).toLocaleString('en-IN')}`;
              }
            }
          }
        }
      }
    });
  }
}

function renderAmortizationSchedule(principal, monthlyRate, months, emi) {
  const tbody = document.getElementById('amortization-tbody');
  if (!tbody) return;

  let balance = principal;
  let html = '';

  // Limit display to first 24 months + summary or max 60 to prevent DOM overflow, with expand option
  const maxRows = Math.min(months, 36);

  for (let i = 1; i <= maxRows; i++) {
    const interestPaid = balance * monthlyRate;
    const principalPaid = emi - interestPaid;
    balance = Math.max(0, balance - principalPaid);

    html += `
      <tr class="border-b border-white/5 hover:bg-white/5 transition-colors">
        <td class="py-3 px-4 text-center font-medium">${i}</td>
        <td class="py-3 px-4 text-right">₹${Math.round(balance + principalPaid).toLocaleString('en-IN')}</td>
        <td class="py-3 px-4 text-right">₹${Math.round(emi).toLocaleString('en-IN')}</td>
        <td class="py-3 px-4 text-right text-emerald-400 font-medium">₹${Math.round(principalPaid).toLocaleString('en-IN')}</td>
        <td class="py-3 px-4 text-right text-rose-400 font-medium">₹${Math.round(interestPaid).toLocaleString('en-IN')}</td>
        <td class="py-3 px-4 text-right font-medium">₹${Math.round(balance).toLocaleString('en-IN')}</td>
      </tr>
    `;
  }

  tbody.innerHTML = html;
}
