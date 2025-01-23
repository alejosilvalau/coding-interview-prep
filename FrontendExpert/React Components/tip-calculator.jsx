import React, { useState } from "react";

export default function TipCalculator() {
  const [bill, setBill] = useState(50);
  const [tipPercentage, setTipPercentage] = useState(18);
  const [people, setPeople] = useState(1);

  const totalTip = (bill * tipPercentage) / 100;
  const perPersonTip = totalTip / people;

  return (
    <>
      <label htmlFor='bill'>Bill</label>
      <input
        type='number'
        id='bill'
        min='0'
        value={bill}
        onChange={event => setBill(parseInt(event.target.value))}
      />

      <label htmlFor='tipPercentage'>Tip Percentage</label>
      <input
        type='number'
        id='tipPercentage'
        min='0'
        value={tipPercentage}
        onChange={event => setTipPercentage(parseInt(event.target.value))}
      />

      <label htmlFor='people'>Number of People</label>
      <input
        type='number'
        id='people'
        min='1'
        value={people}
        onChange={event => setPeople(parseInt(event.target.value))}
      />

      <p>Total Tip: {isNaN(totalTip) ? "-" : `$${totalTip.toFixed(2)}`}</p>
      <p>
        Tip Per Person:{" "}
        {isNaN(perPersonTip) ? "-" : `$${perPersonTip.toFixed(2)}`}
      </p>
    </>
  );
}
