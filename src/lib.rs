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
    name: String,
}

#[wasm_bindgen]
impl Entity {
    pub fn new(hp_val: u32, attack_val: u32, name_val: String) -> Entity {
        Entity {
            hp: hp_val,
            attack: attack_val,
            name: name_val,
        }
    }

    pub fn get_hp(&self) -> u32 {
        self.hp
    }

    pub fn get_attack(&self) -> u32 {
        self.attack
    }

    pub fn get_name(&self) -> String {
        self.name.clone()
    }
}