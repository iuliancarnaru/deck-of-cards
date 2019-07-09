import React, { Component } from "react";
import axios from "axios";

const API_BASE_URL = `https://deckofcardsapi.com/api/deck/`;

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { deck: null, drawn: [] };

    this.getCard = this.getCard.bind(this);
  }

  async componentDidMount() {
    let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
    this.setState({ deck: deck.data });
  }

  async getCard() {
    let id = this.state.deck.deck_id;

    try {
      let cardUrl = `${API_BASE_URL}/${id}/draw/`;
      let response = await axios.get(cardUrl);

      if (!response.data.success) {
        throw new Error(`No cards left in the deck`);
      }

      let card = response.data.cards[0];
      this.setState(prevState => ({
        drawn: [
          ...prevState.drawn,
          {
            id: card.code,
            img: card.image,
            name: `${card.value} of ${card.suit}`
          }
        ]
      }));
    } catch (error) {
      alert(error);
    }
  }

  render() {
    return (
      <div>
        <h1>Card dealer</h1>
        <button onClick={this.getCard}>Get card!</button>
      </div>
    );
  }
}

export default Deck;
