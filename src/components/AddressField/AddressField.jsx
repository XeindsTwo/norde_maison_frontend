import { useEffect, useState } from "react";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";
import "./AddressField.scss";

const DADATA_TOKEN = "70c6ce6dc9f5fcd6e1547fce1dd21fe117eafcb9";

const AddressField = ({ value = "", onChange, name = "address" }) => {
  const [innerValue, setInnerValue] = useState();

  useEffect(() => {
    if (!value) {
      setInnerValue(undefined);
      return;
    }

    setInnerValue((prev) => ({
      ...(prev || {}),
      value,
    }));
  }, [value]);

  const handleChange = (suggestion) => {
    setInnerValue(suggestion);
    onChange?.(suggestion?.value || "");
  };

  const handleInputChange = (e) => {
    const newVal = e.target.value;
    setInnerValue((prev) => ({
      ...(prev || {}),
      value: newVal,
    }));
    onChange?.(newVal);
  };

  return (
    <div className="address-field-wrapper">
      <AddressSuggestions
        token={DADATA_TOKEN}
        value={innerValue}
        onChange={handleChange}
        containerClassName="dadata-container"
        suggestionsClassName="dadata-suggestions"
        suggestionClassName="dadata-suggestion-item"
        inputProps={{
          placeholder: "Адрес",
          value: innerValue?.value || "",
          onChange: handleInputChange,
          className: "dadata-input",
          name,
          autoComplete: "off",
        }}
      />
    </div>
  );
};

export default AddressField;