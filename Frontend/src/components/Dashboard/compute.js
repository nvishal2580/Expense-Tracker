
export const computeIncome = (transections) => {
    let amount = 0;
    transections.map(transection => {
        if (transection.amount > 0) amount += transection.amount;
    })
    return amount;
}

export const computeExpense = (transections) => {
    let amount = 0;
    transections.map(transection => {
        if (transection.amount < 0) amount += transection.amount;
    })
    return amount * (-1);
}


export const totalAmount = (transections) => {
    let amount = 0;
    transections.map(transection => {
        amount += transection.amount;
    })
    return amount;
}