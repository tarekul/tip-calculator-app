document.getElementById('bill').addEventListener('input', calculate);
document.getElementById('tip-5').addEventListener('click', setTip);
document.getElementById('tip-10').addEventListener('click', setTip);
document.getElementById('tip-15').addEventListener('click', setTip);
document.getElementById('tip-25').addEventListener('click', setTip);
document.getElementById('tip-50').addEventListener('click', setTip);
document.getElementById('custom').addEventListener('input', setTip);
document.getElementById('people').addEventListener('input', calculate);

let tip = 0;
function calculate() {
    const bill = document.getElementById('bill').value;
    const people = document.getElementById('people').value;
    const customTip = document.getElementById('custom').value;

    if (customTip > 0) {
        tip = customTip;
    }

    console.log(bill, tip, people);
    if (bill > 0 && tip > 0 && people > 0) {
        document.getElementById('tip').innerText = '$' + (bill * tip / 100 / people).toFixed(2);
        document.getElementById('total').innerText = '$' + (bill * (tip / 100 + 1) / people).toFixed(2);
    }
}

function setTip() {
    let customTip = document.getElementById('custom').value;
    customTip = customTip.replace(/[^0-9.]/g, '');
    customTip = validateCustomTip(customTip);

    document.getElementById('custom').value = customTip;
    const tipButtons = document.querySelectorAll('button[name="tip"]');
    tipButtons.forEach(button => {
        button.classList.remove('bg-sky-700');
        button.classList.add('bg-cyan-700'); 

        if(parseInt(customTip)) {
            button.classList.remove('hover:bg-sky-700');
        }
    });

    if (this.id !== 'custom' && !parseInt(customTip)) {
        this.classList.add('bg-sky-700'); 
        this.classList.remove('bg-cyan-700'); 
    }

    this.id === 'custom' ? tip = customTip : tip = parseInt(this.id.slice(4));
    calculate();
}

function validateCustomTip(customTip) {
    if ((customTip.match(/\./g) || []).length > 1) {
        customTip = customTip.split('.').slice(0, 1).join('') + '.' + customTip.split('.').slice(1).join('');
    }
    if ((customTip.match(/\./g) || []).length == 1) {
        customTip = customTip.split('.')[0] + '.' + customTip.split('.')[1].split('').slice(0, 2).join('');
    }

    return customTip;
}