function saveTransaction(type) {
    var amount = document.getElementById(type + '_amount').value;
    var category = document.getElementById(type + '_category').value;
    var date = document.getElementById(type + '_date').value;
    var comment = document.getElementById(type + '_comment').value;

    var transaction = {
        amount: amount,
        category: category,
        date: date,
        comment: comment
    };

    var key = type === 'ingresos' ? 'ingresos' : 'gastos';
    var transactions = JSON.parse(localStorage.getItem(key)) || [];
    transactions.push(transaction);
    localStorage.setItem(key, JSON.stringify(transactions));

    alert('Transacción agregada exitosamente.');
}
