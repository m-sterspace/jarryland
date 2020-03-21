import getFetchOptions from './getFetchOptions';
const baseAPI = '/api/';


const getCurrentIP = async (idToken) => {
  try {
    const bod = {
      msg: "howdy!",
    };

    const res = await fetch(`${baseAPI}/general/ip`,
      getFetchOptions('GET', 'application/json', null, true, idToken));
    if (!res.ok) {
      throw Error(res.status + " " + res.statusText)
    }
    const jsonRes = await res.json();
    console.log(jsonRes)
    if (jsonRes.err) {
      console.log(jsonRes.err)
    } else if (jsonRes.res && jsonRes.res.ipaddress) {
      return jsonRes.res.ipaddress;
    } else {
      throw Error('no response')
    }
  } catch (err) {
    console.log(err);
  }
};

export default {
  getCurrentIP
}