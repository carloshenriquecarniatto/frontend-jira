export async function getIssuesTest() {
  let url = '../../assets/test_data.json';
  let response = await fetch(url);
  let data = await response.json();
  return data.issues;
}
