use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}

#[wasm_bindgen]
pub struct Entity {
    hp: u32,
    attack: u32,
}

#[wasm_bindgen]
impl Entity {
    pub fn new(hp_val: u32, attack_val: u32) -> Entity {
        Entity {
            hp: hp_val,
            attack: attack_val,
        }
    }

    pub fn get_hp(&self) -> u32 {
        self.hp
    }

    pub fn get_attack(&self) -> u32 {
        self.attack
    }
}