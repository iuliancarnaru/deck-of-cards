import React, { Component } from "react";
import axios from "axios";
import Card from "./Card";

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
        throw new Error(`No cards left in the deck...`);
      }

      let card = response.data.cards[0];
      this.setState(prevState => ({
        drawn: [
          ...prevState.drawn,
          {
            id: card.code,
            image: card.image,
            name: `${card.value} of ${card.suit}`
          }
        ]
      }));
    } catch (error) {
      alert(error);
    }
  }

  render() {
    const cards = this.state.drawn.map(card => (
      <Card key={card.name} name={card.name} image={card.image} />
    ));
    return (
      <div>
        <h1>Card dealer</h1>
        <button onClick={this.getCard}>Get card!</button>
        <div style={{ marginTop: "80px" }}>{cards}</div>
      </div>
    );
  }
}

export default Deck;
