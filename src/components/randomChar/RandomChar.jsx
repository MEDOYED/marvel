import { Component } from "react";

import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/spinner";

import mjolnir from "../../resources/img/mjolnir.png";

import "./randomChar.scss";

class RandomChar extends Component {
  constructor(props) {
    super(props);
    this.updateChar();
  }

  state = {
    // name: null,
    // description: null,
    // thumbnail: null, // прев'ю (маленьке зображення)
    // homepage: null,
    // wiki: null,
    char: {},
  };

  marvelService = new MarvelService();

  onCharLoaded = (char) => {
    if (!char.description) {
      char.description = "There is no description for this character";
    } else if (char.description.length > 100) {
      char.description = char.description.slice(0, 100) + "...";
    }

    this.setState({ char });
    // this.setState({ char: char });  те саме що вище строчка
  };

  updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.marvelService.getCharacter(id).then(this.onCharLoaded);
  };

  render() {
    const {
      char: { name, description, thumbnail, homepage, wiki },
    } = this.state;

    return (
      <div className="randomchar">
        <Spinner />
        <div className="randomchar__block">
          <img src={thumbnail} alt="Random character" className="randomchar__img" />
          <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">{description}</p>
            <div className="randomchar__btns">
              <a href={homepage} className="button button__main">
                <div className="inner">homepage</div>
              </a>
              <a href={wiki} className="button button__secondary">
                <div className="inner">Wiki</div>
              </a>
            </div>
          </div>
        </div>
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button className="button button__main">
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

export default RandomChar;
