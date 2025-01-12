class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  // ЗДЕСЬ БУДЕТ ВАШ КЛЮЧ, ЭТОТ КЛЮЧ МОЖЕТ НЕ РАБОТАТЬ
  _apiKey = "apikey=09f4bbc1578fd314c23453247423742f";
  //   _apiKey = "apikey=869893b5876b37169290858bdddf33b7b3961e1d";

  // https://gateway.marvel.com:443/v1/public/characters?apikey=09f4bbc1578fd314c23453247423742f

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getAllCharacters = () => {
    return this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
  };

  getCharacter = (id) => {
    return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
  };
}

export default MarvelService;
