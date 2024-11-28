const setCookie = (name: string, value: string, days = 2) => {
  const expires = new Date();
  const domain = document.location.hostname;
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${
    'CORUM_TEST_' + name
  }=${value};expires=${expires.toUTCString()};domain=${domain};path=/`;
};

const getCookie = (name: string) => {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];

    while (cookie.charAt(0) === ' ') cookie = cookie.substring(1);

    if (cookie.indexOf(`CORUM_TEST_${name}=`) === 0)
      return cookie.substring(`CORUM_TEST_${name}=`.length, cookie.length);
  }
  return '';
};

const deleteCookie = (name: string) => {
  setCookie(name, '', -1);
};

export { setCookie, getCookie, deleteCookie };
