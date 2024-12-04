import DiceBox from "@3d-dice/dice-box";


const Dice = new DiceBox(
  "#dice-box", 
  {
    id: "dice-canvas", 
    assetPath: "/assets/dice-box/",
    startingHeight: 8,
    throwForce: 6,
    spinForce: 5,
    lightIntensity: 0.9
  }
);

export { Dice };
