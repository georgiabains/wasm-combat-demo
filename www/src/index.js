import init, { Entity } from "../../pkg/wasm_combat_demo";

const selectors = {
  creature: {
    healthCurrent: '[data-creature="health-current"]',
    healthTotal: '[data-creature="health-total"]',
    healthProgress: '[data-creature="health-progress"]'
  },
  player: {
    attackButton: '[data-player="attack-button"]',
    healthCurrent: '[data-player="health-current"]',
    healthTotal: '[data-player="health-total"]',
    healthProgress: '[data-player="health-progress"]'
  }
}

init().then(() => {
  const creature = Entity.new(30, 30, 5, 'creature')
  const player = Entity.new(30, 30, 5, 'player')

  initEntity('creature', creature)
  initEntity('player', player)

  document.querySelector(selectors.player.attackButton).addEventListener('click', () => {
    creature.set_current_hp(player.get_attack())
    setEntityCurrentHealth('creature', creature.get_current_hp())
  })
})

/**
 * Initialise entity using ID & entity.
 * @param {String} entityId - Entity reference in `selectors`
 * @param {Entity} entity - Entity object
 */
function initEntity(entityId, entity) {
  setEntityCurrentHealth(entityId, entity.get_current_hp())
  setEntityTotalHealth(entityId, entity.get_total_hp())
}

/**
 * Set current health of entity.
 * @param {String} entityId - Entity reference in `selectors`
 * @param {Number} currentHealth - Current health value
 */
function setEntityCurrentHealth(entityId, currentHealth) {
  if (!selectors[entityId]) {
    return
  }

  document.querySelector(selectors[entityId].healthCurrent).textContent = currentHealth
}

/**
 * Set total health of entity.
 * @param {String} entityId - Entity reference in `selectors`
 * @param {Number} totalHealth - Total health value
 */
function setEntityTotalHealth(entityId, totalHealth) {
  if (!selectors[entityId]) {
    return
  }

  document.querySelector(selectors[entityId].healthTotal).textContent = totalHealth
}
