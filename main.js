document.getElementById('bill').addEventListener('input', () => handleBill());
document.getElementById('tip-5').addEventListener('click', setTip);
document.getElementById('tip-10').addEventListener('click', setTip);
document.getElementById('tip-15').addEventListener('click', setTip);
document.getElementById('tip-25').addEventListener('click', setTip);
document.getElementById('tip-50').addEventListener('click', setTip);
document.getElementById('custom').addEventListener('input', setTip);
document.getElementById('people').addEventListener('input', () => handleBill());
document.getElementById('reset').addEventListener('click', reset);

function reset() {
    document.getElementById('bill').value = '';
    document.getElementById('people').value = '';
    document.getElementById('custom').value = '';
    document.getElementById('tip').innerText = '$0.00';
    document.getElementById('total').innerText = '$0.00';

    const prevSelected = document.querySelector('button[name="tip"].bg-teal-900');
    if (prevSelected) {
        prevSelected.classList.remove('bg-teal-900');
        prevSelected.classList.add('bg-cyan-700'); 
    }
}

function calculate(bill, people, tip, typeOfTip) {
    if (bill > 0 && tip >= 0 && people > 0) {
       tipPerPerson(bill, people, tip, typeOfTip); 
    }
}

function handleBill() {
    const bill = document.getElementById('bill').value;
    const people = validatePeople();
    const selection = document.querySelector('button[name="tip"].bg-teal-900')
    let tip = 0;
    let typeOfTip = '';
    if (selection) {
        tip = selection.id.split('-')[1];
        typeOfTip = 'fixed';
    } else {
        tip = validateCustomTip();
        typeOfTip = 'custom';
    }
    
    if (bill <= 0 || people <= 0) {
        document.getElementById('tip').innerText = '$0.00';
        document.getElementById('total').innerText = '$0.00';
    } else {
        calculate(bill, people, tip, typeOfTip);
    }
}

function tipPerPerson(bill, people, tip, typeOfTip) {
    if (typeOfTip == 'custom') {
        document.getElementById('tip').innerText = '$' + (Number(tip) / people).toFixed(2);
        document.getElementById('total').innerText = '$' + ((Number(bill) + Number(tip)) / people).toFixed(2);
    } else {
        document.getElementById('tip').innerText = '$' + (Number(bill) * Number(tip) / 100 / people).toFixed(2);
        document.getElementById('total').innerText = '$' + (Number(bill) * (Number(tip) / 100 + 1) / people).toFixed(2);
    }
}

function setTip() {
    const prevSelected = document.querySelector('button[name="tip"].bg-teal-900');
    if (prevSelected) {
        prevSelected.classList.remove('bg-teal-900');
        prevSelected.classList.add('bg-cyan-700'); 
    }

    if (this.id !== 'custom') {
        document.getElementById('custom').value = '';
        this.classList.add('bg-teal-900');

        if(prevSelected) {
            if(prevSelected.id == this.id) {
                this.classList.remove('bg-teal-900');
                this.classList.add('bg-cyan-700'); 
            }
        }
    }

    handleBill();
}

validatePeople = () => {
    const people = document.getElementById('people').value;
    document.getElementById('people').value = people.replace(/[^0-9]/g, '');

    return people;
}

function validateCustomTip() {
    let customTip = document.getElementById('custom').value;
    customTip = customTip.replace(/[^0-9.]/g, '');

    if ((customTip.match(/\./g) || []).length > 1) {
        customTip = customTip.split('.').slice(0, 1).join('') + '.' + customTip.split('.').slice(1).join('');
    }
    if ((customTip.match(/\./g) || []).length == 1) {
        customTip = customTip.split('.')[0] + '.' + customTip.split('.')[1].split('').slice(0, 2).join('');
    }

    document.getElementById('custom').value = customTip;

    return customTip;
}