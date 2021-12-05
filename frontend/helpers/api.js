async function extractResponseData(response) {
  try {
    const data = await response.json();
    if (response.ok) return data;
    throw data.message;
  } catch (e) {
    switch (response.status) {
      case 400:
        throw e;
      case 401:
        setTimeout(() => {
          // Since the user is logged out, this will bring them to the login screen and use the
          // ?next= argument to let them return to their current page immediately after logging in
          window.location.reload();
        }, 5000);
        throw Error('You are not logged in. Redirecting to the login page in 5 seconds...');
      case 403:
        throw Error('Permission denied');
      default: {
        // Handled errors
        if (typeof e === 'string') throw Error(e);
        // Unexpected response errors
        throw Error('Error with server response');
      }
    }
  }
}

async function postRequest(url, body) {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    body: JSON.stringify(body),
  }).catch(() => {
    throw Error('Network connectivity issue');
  });

  return extractResponseData(response);
}

export default async function pingData(options) {
  console.log('pingData');
  return postRequest('http://localhost:5000/api/ping', options);
}
