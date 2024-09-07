import { Entity } from "../../pkg/wasm_combat_demo";

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

const creature = Entity.new(30, 30, 5, 'creature')
const player = Entity.new(30, 30, 5, 'player')

initGame()

/**
 * Run all scripts to initialise the game.
 */
function initGame() {
  initEntity(creature)
  initEntity(player)

  setEventListeners()
}

/**
 * Initialise entity using ID & entity.
 * @param {Entity} entity - Entity object
 */
function initEntity(entity) {
  // TODO: Need unique reference for every entity to allow multiple instances of the same entity
  setEntityCurrentHealth(entity.get_name(), entity.get_current_hp())
  setEntityTotalHealth(entity.get_name(), entity.get_total_hp())
}

/**
 * Set event listeners.
 */
function setEventListeners() {
  
  /**
   * Player attacks creature.
   */
  document.querySelector(selectors.player.attackButton).addEventListener('click', () => {
    attackEntity(player.get_attack(), creature)
  })
}

function attackEntity(attackValue, targetEntity) {
  console.log(attackValue, targetEntity)
  targetEntity.set_current_hp(attackValue)
  setEntityCurrentHealth(targetEntity.get_name(), targetEntity.get_current_hp())
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
