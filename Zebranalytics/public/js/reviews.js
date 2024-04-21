window.onload = function() {
    toggleYearInput(); // Verifica el estado de la casilla de verificación al cargar la página
};


function submitForm() {
    document.getElementById("filterForm").submit();
}

function toggleYearInput() {
    const yearInput = document.getElementById('year');
    const disableCheckbox = document.getElementById('disableYear');
    yearInput.disabled = disableCheckbox.checked;
}