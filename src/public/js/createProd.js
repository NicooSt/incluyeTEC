"use strict";

const installmentsInp = document.getElementById('installments-inp');
const interestInp = document.getElementById('interest-inp');
const installmentsNumInp = document.getElementById('installmentsNum-inp');
const interestRateInp = document.getElementById('interestRate-inp');
const stockInp = document.getElementById('stock-inp');
const shipmentInp = document.getElementById('shipment-inp');
const warrantyInp = document.getElementById('warranty-inp');
const warrantyDurationInp = document.getElementById('warrantyDuration-inp');

installmentsInp.addEventListener('change', (e) => {
    if (e.target.value == 'withInstallments') {
        interestInp.disabled = false;
        installmentsNumInp.disabled = false;
        if (interestInp.value == 'freeInterest') {
            interestRateInp.disabled = true;
        } else {
            interestRateInp.disabled = false;
        }
    } else {
        interestInp.disabled = true;
        installmentsNumInp.disabled = true;
        interestRateInp.disabled = true;
    }
})

interestInp.addEventListener('change', (e) => {
    if (e.target.value == 'freeInterest') {
        interestRateInp.disabled = true;
    } else {
        interestRateInp.disabled = false;

    }
})

stockInp.addEventListener('change', (e) => {
    if (e.target.value == 'hasntStock') {
        warrantyInp.disabled = true;
        warrantyDurationInp.disabled = true;
        shipmentInp.disabled = true;
    } else {
        warrantyInp.disabled = false;
        shipmentInp.disabled = false;
        if (warrantyInp.value == 'withWarranty') {
            warrantyDurationInp.disabled = false;
        } else {
            warrantyDurationInp.disabled = true;
        }
    }
})

warrantyInp.addEventListener('change', (e) => {
    if (e.target.value == 'withOutWarranty') {
        warrantyDurationInp.disabled = true;
    } else {
        warrantyDurationInp.disabled = false;
    }
})