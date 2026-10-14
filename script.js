const form     = document.getElementById('cardForm');
const bankInp  = document.getElementById('bank');
const sysInp   = document.getElementById('system');
const numInp   = document.getElementById('number');
const holdInp  = document.getElementById('holder');
const monthInp = document.getElementById('month');
const yearInp  = document.getElementById('year');

const prevBank       = document.getElementById('prevBank');
const prevSystemLogo = document.getElementById('prevSystemLogo');
const prevNumber     = document.getElementById('prevNumber');
const prevHolder     = document.getElementById('prevHolder');
const prevExp        = document.getElementById('prevExp');

const logos = {
    'Visa': 'data:image/svg+xml;utf8,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 30">' +
        '<text x="4" y="23" font-size="24" font-family="Arial" font-weight="bold" fill="#1a1f71" font-style="italic">VISA</text>' +
        '</svg>'
    ),
    'MasterCard': 'data:image/svg+xml;utf8,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 30">' +
        '<circle cx="25" cy="15" r="12" fill="#eb001b"/>' +
        '<circle cx="45" cy="15" r="12" fill="#f79e1b" opacity="0.85"/>' +
        '</svg>'
    ),
    'Мир': 'data:image/svg+xml;utf8,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 30">' +
        '<text x="4" y="23" font-size="22" font-family="Arial" font-weight="bold" fill="#0f7541">МИР</text>' +
        '</svg>'
    )
};

for (let m = 1; m <= 12; m++) {
    const opt = document.createElement('option');
    opt.value = String(m).padStart(2, '0');
    opt.textContent = opt.value;
    monthInp.appendChild(opt);
}
const currentYear = new Date().getFullYear();
for (let y = currentYear; y <= currentYear + 6; y++) {
    const opt = document.createElement('option');
    opt.value = y;
    opt.textContent = y;
    yearInp.appendChild(opt);
}

function formatNumber(value) {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
}

function cleanHolder(value) {
    return value.replace(/[^A-Za-z\s]/g, '');
}

function updatePreview() {

    prevBank.textContent = bankInp.value || 'БАНК';

    const sys = sysInp.value;
    if (sys && logos[sys]) {
        prevSystemLogo.src = logos[sys];
        prevSystemLogo.alt = sys;
        prevSystemLogo.classList.add('visible');
    } else {
        prevSystemLogo.removeAttribute('src');
        prevSystemLogo.classList.remove('visible');
    }

    const formatted = formatNumber(numInp.value);
    prevNumber.textContent = formatted || '#### #### #### ####';

    prevHolder.textContent = holdInp.value.toUpperCase() || 'ИМЯ ДЕРЖАТЕЛЯ';

    if (monthInp.value && yearInp.value) {
        prevExp.textContent = monthInp.value + '/' + yearInp.value.slice(-2);
    } else {
        prevExp.textContent = 'ММ/ГГ';
    }
}
const allInputs = [bankInp, sysInp, numInp, holdInp, monthInp, yearInp];
allInputs.forEach(function (el) {
    el.addEventListener('input', updatePreview);
    el.addEventListener('change', updatePreview);
});
numInp.addEventListener('input', function () {
    numInp.value = formatNumber(numInp.value);
});
holdInp.addEventListener('input', function () {
    const cleaned = cleanHolder(holdInp.value);
    if (cleaned !== holdInp.value) {
        holdInp.value = cleaned;
    }
    holdInp.value = holdInp.value.toUpperCase();
});
form.addEventListener('submit', function (event) {
    event.preventDefault();
    const digits = numInp.value.replace(/\D/g, '');
    if (digits.length !== 16) {
        alert('Номер карты должен содержать ровно 16 цифр! Сейчас: ' + digits.length);
        numInp.focus();
        return;
    }
    if (!/^[A-Za-z\s]+$/.test(holdInp.value.trim())) {
        alert('Имя держателя должно содержать только английские буквы!');
        holdInp.focus();
        return;
    }
    const rowData = [
        bankInp.value,
        sysInp.value,
        formatNumber(numInp.value),
        holdInp.value.toUpperCase(),
        monthInp.value + '/' + yearInp.value
    ];
    const tr = document.createElement('tr');
    rowData.forEach(function (text) {
        const td = document.createElement('td');
        td.textContent = text;
        tr.appendChild(td);
    });
    document.querySelector('#resultTable tbody').appendChild(tr);
    form.reset();
    updatePreview();
});
