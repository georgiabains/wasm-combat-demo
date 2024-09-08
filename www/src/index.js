import { Entity } from "../../pkg/wasm_combat_demo";

const selectors = {
  creature: {
    healthCurrent: '[data-creature="health-current"]',
    healthTotal: '[data-creature="health-total"]',
    healthProgress: '[data-creature="health-progress"]'
  },
  game: {
    log: '[data-game="log"]',
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
  renderEntityCurrentHealth(entity, entity.get_current_hp())
  renderEntityTotalHealth(entity.get_name(), entity.get_total_hp())
}

/**
 * Set event listeners.
 */
function setEventListeners() {
  
  /**
   * Player attacks creature.
   */
  document.querySelector(selectors.player.attackButton).addEventListener('click', () => {
    attackEntity(player, creature)
    // TODO: Send outgoing attack message
    document.querySelector(selectors.player.attackButton).setAttribute('disabled', true)

    if (!creature.get_current_hp()) {
      recordGameAction('Player wins!')
      return
    }

    setTimeout(() => {
      attackEntity(creature, player)
      document.querySelector(selectors.player.attackButton).removeAttribute('disabled')
      // TODO: add damage message
    }, 2000)
  })
}

/**
 * Message to add to game log.
 * @param {String} message 
 */
function recordGameAction(message) {
  const messageContainer = document.createElement('li')
  messageContainer.textContent = message

  document.querySelector(selectors.game.log).appendChild(messageContainer)
}

/**
 * Deal damage to target entity.
 * @param {Number} controllerEntity - Entity that deals damage.
 * @param {Entity} targetEntity - Entity that receives damage.
 */
function attackEntity(controllerEntity, targetEntity) {
  targetEntity.set_current_hp(controllerEntity.get_attack())
  renderEntityCurrentHealth(targetEntity, targetEntity.get_current_hp())

  const message = `${controllerEntity.get_name().toUpperCase()} dealt ${controllerEntity.get_attack()} damage to ${targetEntity.get_name().toUpperCase()}`
  recordGameAction(message)
}

/**
 * Set current health of entity.
 * @param {String} entityId - Entity reference in `selectors`
 * @param {Number} currentHealth - Current health value
 */
function renderEntityCurrentHealth(entity, currentHealth) {
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
function renderEntityTotalHealth(entityId, totalHealth) {
  if (!selectors[entityId]) {
    return
  }

  document.querySelector(selectors[entityId].healthTotal).textContent = totalHealth
}
