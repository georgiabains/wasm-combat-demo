import init, { Entity } from "../../pkg/wasm_combat_demo";

const creatureSelectors = {
  healthCurrent: '[data-creature="health-current"]',
  healthMax: '[data-creature="health-max"]',
  healthProgress: '[data-creature="health-progress"]'
}

const playerSelectors = {
  attackButton: '[data-player="attack-button"]',
  healthCurrent: '[data-player="health-current"]',
  healthMax: '[data-player="health-max"]',
  healthProgress: '[data-player="health-progress"]'
}

init().then(() => {
  const creature = Entity.new(15, 15, 'creature')
  const player = Entity.new(30, 30, 'player')

  setCreatureHealth(creature.get_hp())
  setPlayerHealth(player.get_hp())
})

const setCreatureHealth = (health) => {
  document.querySelector(creatureSelectors.healthCurrent).insertAdjacentText('afterbegin', health)
  document.querySelector(creatureSelectors.healthMax).insertAdjacentText('afterbegin', health)
}

const setPlayerHealth = (health) => {
  document.querySelector(playerSelectors.healthCurrent).insertAdjacentText('afterbegin', health)
  document.querySelector(playerSelectors.healthMax).insertAdjacentText('afterbegin', health)
}
