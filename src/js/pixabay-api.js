import axios from 'axios';
export async function getDataFromAPI(
  BASE_URL,
  API_KEY,
  inputValue,
  page,
  limitPageContent
) {
  const fullUrl = constructUrl(
    BASE_URL,
    API_KEY,
    inputValue,
    page,
    limitPageContent
  );
  try {
    const { data } = await axios.get(fullUrl);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
function constructUrl(BASE_URL, API_KEY, inputValue, page, limitPageContent) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: inputValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: limitPageContent,
  });
  return `${BASE_URL}?${searchParams}`;
}