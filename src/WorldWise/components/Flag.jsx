function getCountryCodeFromFlag(flag) {
  if (!flag) return;
  const codePoints = [...flag].map((c) => c.codePointAt(0) - 127397);
  return String.fromCharCode(...codePoints).toLowerCase();
}

export function Flag({ value, size = "3rem" }) {
  // value can be either a two‑letter country code (e.g., "IN") or a flag emoji (e.g., "🇵🇹").
  // If it's a code, use it directly. If it's an emoji, convert it to the corresponding country code.
  const isCountryCode = /^[A-Za-z]{2}$/.test(value);
  const countryCode = isCountryCode
    ? value.toLowerCase()
    : getCountryCodeFromFlag(value);

  return (
    <img
      src={`https://flagcdn.com/24x18/${countryCode}.png`}
      alt={`flag-${countryCode}`}
      style={{ width: size }}
    />
  );
}
