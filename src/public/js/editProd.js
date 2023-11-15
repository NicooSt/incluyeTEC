"use strict";

const installmentsInp = document.getElementById('installments-inp');
const interestInp = document.getElementById('interest-inp');
const installmentsNumInp = document.getElementById('installmentsNum-inp');
const interestRateInp = document.getElementById('interestRate-inp');
const stockInp = document.getElementById('stock-inp');
const shipmentInp = document.getElementById('shipment-inp');
const warrantyInp = document.getElementById('warranty-inp');
const warrantyDurationInp = document.getElementById('warrantyDuration-inp');

checkInputs();
installmentsInp.addEventListener('change', checkInstallmentsInp);
interestInp.addEventListener('change', checkInterestInp);
stockInp.addEventListener('change', checkStockInp);
warrantyInp.addEventListener('change', checkWarrantyInp);

// Chequeo todos los inputs
function checkInputs() {
    // Determina el estado del input de duracion de acuerdo al input garantia
    checkWarrantyInp();
    // Determina el estado de todos los inputs (envio, garantia, duracion)
    // de acuerdo al input de stock
    checkStockInp();
    // Determina el estado del input porcentaje de acuerdo al input modalidad
    checkInterestInp();
    // Determina el estado de todos los inputs (cantidad, modalidad, porcentaje)
    // de acuerdo al input cuotas
    checkInstallmentsInp(); // Necesario poner ultimo para que se ejecute al final
}

function checkInstallmentsInp() {
    if (installmentsInp.value == 'withInstallments') {
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
}

function checkInterestInp() {
    if (interestInp.value == 'freeInterest') {
        interestRateInp.disabled = true;
    } else {
        interestRateInp.disabled = false;
    }
}

function checkStockInp() {
    if (stockInp.value == 'hasntStock') {
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
}

function checkWarrantyInp() {
    if (warrantyInp.value == 'withOutWarranty') {
        warrantyDurationInp.disabled = true;
    } else {
        warrantyDurationInp.disabled = false;
    }
}