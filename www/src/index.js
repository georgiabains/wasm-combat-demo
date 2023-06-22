import { Entity } from "../../pkg/wasm_combat_demo";


const npc = Entity.new(15, 15, 'creature')
console.log(npc)
console.log(npc.get_hp(), npc.get_attack(), npc.get_name())

const player = Entity.new(30, 30, 'player')
console.log(player)
console.log(player.get_hp(), player.get_attack(), player.get_name())
