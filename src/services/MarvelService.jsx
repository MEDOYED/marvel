import { MD5 } from "crypto-js";

class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  // ЗДЕСЬ БУДЕТ ВАШ КЛЮЧ, ЭТОТ КЛЮЧ МОЖЕТ НЕ РАБОТАТЬ

  _publicKey = "09f4bbc1578fd314c23453247423742f";
  _privateKey = "869893b5876b37169290858bdddf33b7b3961e1d";

  // https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=210&apikey=09f4bbc1578fd314c23453247423742f

  _generateHash = () => {
    const ts = new Date().getTime();
    const hash = MD5(ts + this._privateKey + this._publicKey).toString();
    return { ts, hash };
  };

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getAllCharacters = () => {
    const { ts, hash } = this._generateHash();
    return this.getResource(
      `${this._apiBase}characters?limit=9&offset=210&ts=${ts}&apikey=${this._publicKey}&hash=${hash}`
    );
  };

  getCharacter = (id) => {
    const { ts, hash } = this._generateHash();
    return this.getResource(
      `${this._apiBase}characters/${id}?ts=${ts}&apikey=${this._publicKey}&hash=${hash}`
    );
  };
}

export default MarvelService;
