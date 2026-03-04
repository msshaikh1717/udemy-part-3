const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export async function getCity(lat, lng) {
  const res = await fetch(
    `${BASE_URL}?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
  );
  const data = await res.json();

  return data;
}
