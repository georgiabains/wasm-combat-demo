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

  console.dir(document.querySelector(selectors.creature.healthProgress))
}

/**
 * Initialise entity using ID & entity.
 * @param {Entity} entity - Entity object
 */
function initEntity(entity) {
  // TODO: Need unique reference for every entity to allow multiple instances of the same entity
  setEntityCurrentHealth(entity, entity.get_current_hp())
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
    // TODO: Send outgoing attack message
    document.querySelector(selectors.player.attackButton).setAttribute('disabled', true)

    if (!creature.get_current_hp()) {
      return
    }

    setTimeout(() => {
      attackEntity(creature.get_attack(), player)
      document.querySelector(selectors.player.attackButton).removeAttribute('disabled')
      // TODO: add damage message
    }, 3000)
  })
}

/**
 * Deal damage to target entity.
 * @param {Number} attackValue - Attack value.
 * @param {Entity} targetEntity - Entity that receives damage.
 */
function attackEntity(attackValue, targetEntity) {
  targetEntity.set_current_hp(attackValue)
  setEntityCurrentHealth(targetEntity, targetEntity.get_current_hp())
}

/**
 * Set current health of entity.
 * @param {String} entityId - Entity reference in `selectors`
 * @param {Number} currentHealth - Current health value
 */
function setEntityCurrentHealth(entity, currentHealth) {
  if (!selectors[entity.get_name()]) {
    return
  }

  document.querySelector(selectors[entity.get_name()].healthCurrent).textContent = currentHealth
  document.querySelector(selectors[entity.get_name()].healthProgress).value = entity.get_current_hp() / entity.get_total_hp() * 100
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
