function bonAppetit(bill: number[], k: number, b: number): void {
    const itemNotConsumed = bill[k];
    const allItemsConsumedByAll = bill.filter(b => b !== itemNotConsumed);
    const totalValueConsumedByPerson = allItemsConsumedByAll.reduce((acc, v) => acc + v, 0) / 2;
    
    if (totalValueConsumedByPerson === b) {
        console.log("Bon Appetit");
        return;
    }
    
    const overcharge = b - totalValueConsumedByPerson;
    console.log(overcharge);
}
