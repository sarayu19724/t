var answers = { photo: false, q1: null, q2: null, name: '', phone: '' };

/* ── NAVIGATION ── */
function goTo(id) {
  document.querySelectorAll('.screen').forEach(function(s) {
    s.classList.remove('active');
  });
  var el = document.getElementById(id);
  el.classList.add('active');
  // Re-trigger animation
  el.style.animation = 'none';
  el.offsetHeight; // reflow
  el.style.animation = '';
}

/* ── PHOTO UPLOAD ── */
function handlePhoto(input) {
  var file = input.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    var preview     = document.getElementById('photo-preview');
    var placeholder = document.getElementById('photo-placeholder');
    var zone        = document.getElementById('photo-zone');
    preview.src            = e.target.result;
    preview.style.display  = 'block';
    placeholder.style.display = 'none';
    zone.classList.add('has-photo');
    answers.photo = true;
    var btn = document.getElementById('btn-photo-next');
    btn.disabled      = false;
    btn.style.opacity = '1';
  };
  reader.readAsDataURL(file);
}

function skipPhoto() {
  answers.photo = false;
  goTo('s2');
}

function nextFromPhoto() {
  if (answers.photo) goTo('s2');
}

/* ── OPTION SELECTION ── */
function selectOpt(el, q) {
  var grid = el.parentElement;
  grid.querySelectorAll('.opt-card').forEach(function(c) {
    c.classList.remove('selected');
  });
  el.classList.add('selected');
  answers[q] = el.dataset.val;
  var btnId = q === 'q1' ? 'btn-q1-next' : 'btn-q2-next';
  var btn   = document.getElementById(btnId);
  if (btn) {
    btn.disabled      = false;
    btn.style.opacity = '1';
  }
}

/* ── FORM VALIDATION ── */
function checkForm() {
  var n   = document.getElementById('inp-name').value.trim();
  var p   = document.getElementById('inp-phone').value.trim();
  var c   = document.getElementById('consent').checked;
  var btn = document.getElementById('btn-submit');
  if (n && p && c) {
    btn.disabled      = false;
    btn.style.opacity = '1';
  } else {
    btn.disabled      = true;
    btn.style.opacity = '0.4';
  }
}

function submitForm() {
  var n   = document.getElementById('inp-name').value.trim();
  var p   = document.getElementById('inp-phone').value.trim();
  var c   = document.getElementById('consent').checked;
  var err = document.getElementById('form-error');
  if (!n || !p || !c) {
    err.classList.add('show');
    return;
  }
  err.classList.remove('show');
  answers.name  = n;
  answers.phone = p;
  goTo('s5');
  runAnalysis();
}

/* ── ANALYSIS ANIMATION ── */
function runAnalysis() {
  var steps  = ['al1', 'al2', 'al3', 'al4'];
  var delays = [600, 1200, 1900, 2600];
  delays.forEach(function(d, i) {
    setTimeout(function() {
      var el = document.getElementById(steps[i]);
      el.classList.remove('pending');
      el.querySelector('.check').style.opacity = '1';
    }, d);
  });
  setTimeout(showResults, 3400);
}

/* ── SKIN DATA ── */
var skinData = {
  acne: {
    type: 'Oily / Acne-Prone',
    score: 64,
    concerns: ['Active Breakouts', 'Excess Sebum', 'Enlarged Pores'],
    services: [
      { name: 'Deep Pore Cleanse Facial', desc: 'Salicylic extraction + clay mask', price: '₹1,499' },
      { name: 'LED Blue Light Therapy',   desc: 'Kills acne bacteria, reduces inflammation', price: '₹999' },
      { name: 'Oil-Control Peel',         desc: 'BHA exfoliation for clear pores', price: '₹1,799' },
      { name: 'Hydra Boost Infusion',     desc: 'Balance moisture after treatment', price: '₹1,299' }
    ],
    discount: '25% OFF',
    code: 'CLEARSKIN25'
  },
  dullness: {
    type: 'Dull / Fatigued Skin',
    score: 58,
    concerns: ['Uneven Tone', 'Lack of Radiance', 'Tired Complexion'],
    services: [
      { name: 'Brightening Vitamin C Facial', desc: 'Antioxidant boost for instant glow', price: '₹1,699' },
      { name: 'Microdermabrasion',             desc: 'Resurface dead skin, reveal fresh layer', price: '₹1,999' },
      { name: 'Glow Enzyme Peel',              desc: 'Papaya & pineapple enzyme exfoliation', price: '₹1,499' },
      { name: 'Gold Radiance Mask',            desc: '24K gold collagen mask treatment', price: '₹2,199' }
    ],
    discount: '20% OFF',
    code: 'GLOW20'
  },
  tan: {
    type: 'Sun-Damaged / Pigmented',
    score: 61,
    concerns: ['Sun Tan', 'Dark Patches', 'Uneven Tone'],
    services: [
      { name: 'De-Tan Treatment',          desc: 'Professional-grade tan removal + brightening', price: '₹1,299' },
      { name: 'Kojic Acid Brightening Peel', desc: 'Targets melanin for even skin tone', price: '₹1,899' },
      { name: 'Vitamin C Infusion',         desc: 'Antioxidant shield against UV damage', price: '₹1,599' },
      { name: 'SPF Shield Package',         desc: 'Post-treatment protection combo', price: '₹799' }
    ],
    discount: '15% OFF',
    code: 'DETANFREE'
  },
  aging: {
    type: 'Mature / Dehydrated',
    score: 70,
    concerns: ['Fine Lines', 'Loss of Firmness', 'Dehydration'],
    services: [
      { name: 'Anti-Aging Collagen Facial', desc: 'Peptide-rich lifting treatment', price: '₹2,499' },
      { name: 'Microcurrent Lift Therapy',  desc: 'Non-invasive facial toning', price: '₹2,999' },
      { name: 'Hyaluronic Acid Infusion',   desc: 'Deep hydration plumping treatment', price: '₹1,899' },
      { name: 'Retinol Night Repair Mask',  desc: 'Cell renewal overnight treatment', price: '₹1,499' }
    ],
    discount: '20% OFF',
    code: 'AGELESS20'
  },
  dryness: {
    type: 'Dry / Sensitive Skin',
    score: 67,
    concerns: ['Dryness', 'Flakiness', 'Skin Tightness'],
    services: [
      { name: 'Hydra Facial',            desc: 'Intense moisture infusion + gentle cleanse', price: '₹1,899' },
      { name: 'Ceramide Repair Facial',  desc: 'Rebuilds skin barrier with lipids', price: '₹1,699' },
      { name: 'Aloe Soothing Mask',      desc: 'Calming treatment for reactive skin', price: '₹999' },
      { name: 'Rich Body Butter Wrap',   desc: 'Head-to-toe hydration ritual', price: '₹2,499' }
    ],
    discount: '20% OFF',
    code: 'MOISTME20'
  },
  oily: {
    type: 'Oily / Combination',
    score: 65,
    concerns: ['Excess Sebum', 'T-Zone Shine', 'Large Pores'],
    services: [
      { name: 'Oil-Control Deep Cleanse',  desc: 'Balances sebum, tightens pores', price: '₹1,299' },
      { name: 'Clay Detox Facial',         desc: 'Kaolin clay draws out impurities', price: '₹1,499' },
      { name: 'Pore Minimiser Treatment',  desc: 'Niacinamide + AHA for refined skin', price: '₹1,799' },
      { name: 'Mattifying Enzyme Peel',    desc: 'Controls shine for up to 4 weeks', price: '₹1,599' }
    ],
    discount: '20% OFF',
    code: 'MATTE20'
  }
};

/* ── SHOW RESULTS ── */
function showResults() {
  var concern = answers.q1 || 'dullness';
  var data    = skinData[concern];
  goTo('s6');

  document.getElementById('res-name').textContent     = 'Hey ' + (answers.name || 'there') + '!';
  document.getElementById('res-score').textContent    = data.score;
  document.getElementById('res-skintype').textContent = data.type;
  document.getElementById('res-discount').textContent = data.discount;
  document.getElementById('res-code').textContent     = data.code;

  var chipsEl = document.getElementById('res-concerns');
  chipsEl.innerHTML = data.concerns.map(function(c) {
    return '<div class="concern-chip">' + c + '</div>';
  }).join('');

  var servEl = document.getElementById('res-services');
  servEl.innerHTML = data.services.map(function(s) {
    return (
      '<div class="service-card">' +
        '<div class="service-name">'  + s.name  + '</div>' +
        '<div class="service-desc">'  + s.desc  + '</div>' +
        '<div class="service-price">' + s.price + '</div>' +
      '</div>'
    );
  }).join('');
}

/* ── BOOK NOW ── */
function bookNow() {
  var concern = answers.q1 || 'dullness';
  var data    = skinData[concern];
  var msg = [
    'Hi! I just completed my Snap & Glow skin analysis on your website.',
    '',
    'My results:',
    '- Skin Type: ' + data.type,
    '- Main concern: ' + answers.q1,
    '- Glow Score: ' + data.score + '/100',
    '',
    'I\u2019d love to book a treatment using my offer code *' + data.code + '* (' + data.discount + ').',
    '',
    'Could you help me schedule an appointment? \u2728'
  ].join('\n');

  var phone = '919876543210';
  var url   = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(msg);
  window.open(url, '_blank');
}
