export const totalByType = (txns, type) =>
    txns.filter(t => t.type === type)
        .reduce((sum, { amount }) => sum + amount, 0);

export const generateReceipts = (txns) =>
    txns.map(({ customer, amount, type }) => 
        `Receipt -> Customer: ${customer} | Value: ${amount} ETB | Action: ${type.toUpperCase()}`
    );

export const correctTransactionAmount = (txn, newAmount) => ({
    ...txn,
    amount: newAmount
});
