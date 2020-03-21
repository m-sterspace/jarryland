let idToken = null;  


const getFetchOptions = (method, contentType, body, includeAuth, customIdToken) => { 
    if(typeof(includeAuth) === 'undefined'){
      includeAuth = true;
    }
    if (!method) { method = 'GET' }
    const opt = {};
    opt.method = method;
    if (body) { opt.body = body }
  
    opt.headers = {};
    opt.headers['X-FP-API-KEY'] = 'iphone'; //it can be iPhone or your any other attribute
    if (contentType) { opt.headers['content-type'] = contentType }
    let sendToken = idToken;
    if(customIdToken){ sendToken = customIdToken; }
    if (includeAuth) {
      if (sendToken && sendToken.rawIdToken) {
        opt.withCredentials = true;
        opt.credentials = 'include';
        opt.headers.Authorization = 'Bearer ' + sendToken.rawIdToken;
      }
    }
    //console.log('fetch options:')
    //console.log(opt);
    return opt;
  }; 
  export default getFetchOptions;