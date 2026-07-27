import "./AmountSelector.css";

export default function AmountSelector({ amounts, selectedAmount, customAmount, onSelectAmount, onCustomChange }) {
  return (
    <div className="amount-selector">
      <div className="amount-chip-grid">
        {amounts.map((amt) => (
          <button
            type="button"
            key={amt}
            className={`amount-chip ${selectedAmount === amt && !customAmount ? "is-selected" : ""}`}
            onClick={() => onSelectAmount(amt)}
          >
            ₹{amt.toLocaleString("en-IN")}
          </button>
        ))}
      </div>
      <div className="amount-custom-field">
        <label htmlFor="customAmount">Or Enter a Custom Amount</label>
        <div className="amount-custom-input-wrap">
          <span>₹</span>
          <input
            id="customAmount"
            type="number"
            min="1"
            placeholder="Enter amount"
            value={customAmount}
            onChange={(e) => onCustomChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
