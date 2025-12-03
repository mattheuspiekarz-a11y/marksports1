/* Auth0 SPA client (usar @auth0/auth0-spa-js bundlado ou via CDN)
   Se usar bundler: npm install @auth0/auth0-spa-js
   Se preferir CDN, substitua a importação por <script src="https://cdn..."></script> e use window.createAuth0Client
*/

(async () => {
  // se for usar bundler, troque por import createAuth0Client from ...
  // Exemplo com global (CDN) assume window.createAuth0Client disponível
  if (!window.createAuth0Client) {
    console.warn('Auth0 SPA SDK não encontrado (use CDN ou instale via npm).');
    return;
  }

  window.auth0Client = await window.createAuth0Client({
    domain: window.__ENV?.AUTH0_DOMAIN || 'SEU_TENANT.auth0.com',
    client_id: window.__ENV?.AUTH0_CLIENT_ID || 'SEU_CLIENT_ID',
    cacheLocation: 'localstorage',
    useRefreshTokens: true,
    authorizationParams: {
      redirect_uri: window.location.origin + '/marksports.base44.app-1764357656/callback.html'
    }
  });

  // Helpers
  window.loginWithRedirect = async (appState) => {
    return window.auth0Client.loginWithRedirect({ authorizationParams: { appState } });
  };

  window.handleRedirectCallback = async () => {
    const result = await window.auth0Client.handleRedirectCallback();
    return result;
  };

  window.getUser = async () => {
    return await window.auth0Client.getUser();
  };

  window.isAuthenticated = async () => {
    return await window.auth0Client.isAuthenticated();
  };

  window.getToken = async () => {
    try {
      return await window.auth0Client.getTokenSilently();
    } catch (err) {
      await window.loginWithRedirect();
    }
  };

  window.logoutAuth0 = () => {
    return window.auth0Client.logout({ logoutParams: { returnTo: window.location.origin }});
  };

})();