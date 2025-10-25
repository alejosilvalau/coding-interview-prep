import React, { useState } from "react";

const COMPLETE_NUMBER_LENGTH = 14;
const PHONE_NUMBER_PLACEHOLDER = "(555) 555-5555";

export default function PhoneInput() {
  const [phone, setPhone] = useState("");

  const onChange = event => {
    setPhone(format(event.target.value));
  };

  return (
    <>
      <input type='tel' value={phone} onChange={onChange} placeholder={PHONE_NUMBER_PLACEHOLDER} />
      <button disabled={phone.length < COMPLETE_NUMBER_LENGTH} onClick={() => setPhone("")}>
        Submit
      </button>
    </>
  );
}

function format(string) {
  const rawString = string.replace(/\D/g, "");
  let output = "";

  if (rawString.length > 0) output = `(${rawString.substring(0, 3)}`;
  if (rawString.length > 3) output += `) ${rawString.substring(3, 6)}`;
  if (rawString.length > 6) output += `-${rawString.substring(6, 10)}`;

  return output;
}
