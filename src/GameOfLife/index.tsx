import React from "react";

import GameOfLife from "./game";

export default class GameOfLifeComponent extends React.Component {
  game: GameOfLife;
  ref: HTMLElement | undefined;
  constructor(props: any) {
    super(props);
    this.game = new GameOfLife();
  }
  componentDidMount() {}
  render() {
    return (
      <div
        ref={(r) => {
          if (!r) return;
          this.ref = r;
          this.game.attach(r);
        }}
        style={{ width: "100%", height: "100%" }}
      ></div>
    );
  }
}
