import { Injectable } from '@angular/core';
import { Expanse, Settlement, Payments } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SettlementService {

  constructor() { }

  

  settle(expanses: Expanse[]): Payments[] {
    const userTotals: { [key: string]: number } = {};
    
    expanses.forEach((expanse) => {
      userTotals[expanse.paidBy] = (userTotals[expanse.paidBy] || 0) + expanse.amount;
    });
  
    const totalAmount = Object.values(userTotals).reduce((a, b) => a + b, 0);
    const averageAmount = totalAmount / Object.keys(userTotals).length;
  
    const userDifferences: { [key: string]: number } = {};
    Object.keys(userTotals).forEach((user) => {
      userDifferences[user] = userTotals[user] - averageAmount;
    });
  
    const payments: Payments[] = [];
  
    Object.keys(userDifferences).forEach((payer) => {
      const settlements: Settlement[] = [];
  
      if (userDifferences[payer] < 0) {
        const amountOwed = Math.abs(userDifferences[payer]);
  
        Object.keys(userDifferences).forEach((payee) => {
          if (userDifferences[payee] > 0) {
            const payment = Math.min(amountOwed, userDifferences[payee]);
  
            if (payment > 0) {
              settlements.push({
                value: payment,
                payToUser: payee,
              });
  
              userDifferences[payee] -= payment;
              userDifferences[payer] += payment;
            }
          }
        });
  
        payments.push({
          user: payer,
          settlements,
        });
      }
    });
  
    return payments;
  }
}
