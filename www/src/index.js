import { Entity } from "../../pkg/wasm_combat_demo";


const npc = Entity.new(15, 15)
console.log(npc)
console.log(npc.get_hp(), npc.get_attack())

const player = Entity.new(30, 30)
console.log(player)
console.log(player.get_hp(), player.get_attack())
