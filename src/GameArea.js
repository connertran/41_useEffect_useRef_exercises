import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";
const GameArea = () => {
  const [deck, setDeck] = useState(null);
  const [drawn, setDrawn] = useState([]);

  // this function only run once when the page is loaded or refreshed because useEffect is used and the [] is empty
  useEffect(function initDeckFromApi() {
    async function fetchData() {
      try {
        const data = await axios.get(
          `${API_BASE_URL}/new/shuffle/?deck_count=1`
        );
        setDeck(data.data);
      } catch (e) {
        console.log(`The Error: ${e}`);
      }
    }
    fetchData();
  }, []);

  async function drawACard() {
    try {
      const apiDraw = await axios.get(`${API_BASE_URL}/${deck.deck_id}/draw/`);
      if (apiDraw.data.remaining === 0) throw new Error("Deck empty!");
      const card = apiDraw.data.cards[0];
      setDrawn((d) => [
        ...d,
        {
          id: card.code,
          name: card.suit + " " + card.value,
          image: card.image,
        },
      ]);
    } catch (err) {
      alert(`${err}`);
    }
  }
  return (
    <div className="GameArea">
      <button onClick={drawACard}>GIMME A CARD!</button>
      <div>
        {drawn.map((c) => (
          <Card key={c.id} name={c.name} image={c.image} />
        ))}
      </div>
    </div>
  );
};

export default GameArea;
