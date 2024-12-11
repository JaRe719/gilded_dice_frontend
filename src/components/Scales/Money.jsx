import React from 'react';
import "./Scales.css";


export default function Money(props) {
  return (
    <div className='moneyWrapper'>
        <p className='moneyLabel'>Aktueller Kontostand: <span className='moneyValue'>{props.money}</span></p>
        <p className='moneyLabel'>Monatliches Einkommen: <span className='moneyValue'>{props.income}</span></p>
        <p className='moneyLabel'>Monatliche Ausgaben: <span className='moneyValue negativeValue'>{props.outcome}</span></p>
        <p className='moneyLabel'>Aktuell investiertes Kapital: <span className='moneyValue'>{props.invest}</span></p>
      
    </div>
  )
}
