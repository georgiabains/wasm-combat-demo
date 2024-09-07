import init, { Entity } from "../../pkg/wasm_combat_demo";

const creatureSelectors = {
  healthCurrent: '[data-creature="health-current"]',
  healthTotal: '[data-creature="health-total"]',
  healthProgress: '[data-creature="health-progress"]'
}

const playerSelectors = {
  attackButton: '[data-player="attack-button"]',
  healthCurrent: '[data-player="health-current"]',
  healthTotal: '[data-player="health-total"]',
  healthProgress: '[data-player="health-progress"]'
}

init().then(() => {
  const creature = Entity.new(30, 30, 5, 'creature')
  const player = Entity.new(30, 30, 5, 'player')

  setCreatureHealth(creature.get_current_hp(), creature.get_total_hp())
  setPlayerHealth(player.get_current_hp(), player.get_total_hp())

  document.querySelector(playerSelectors.attackButton).addEventListener('click', () => {
    console.log('test')

    creature.set_current_hp(player.get_attack())
    setCreatureHealth(creature.get_current_hp(), creature.get_total_hp())
  })
})

const setCreatureHealth = (current, total) => {
  document.querySelector(creatureSelectors.healthCurrent).textContent = current
  document.querySelector(creatureSelectors.healthTotal).textContent = total
}

const setPlayerHealth = (current, total) => {
  document.querySelector(playerSelectors.healthCurrent).textContent = current
  document.querySelector(playerSelectors.healthTotal).textContent = total
}
