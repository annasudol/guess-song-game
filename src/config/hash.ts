const hash:
  | {}
  | {
      access_token: string;
      token_type: string;
      expires_in: '3600';
    } = window.location.hash
  .substring(1)
  .split('&')
  .reduce(function(initial, item) {
    if (item) {
      const parts = item.split('=');

      initial[parts[0]] = decodeURIComponent(parts[1]);
    }

    return initial;
  }, {});

window.location.hash = '';
export default hash;
