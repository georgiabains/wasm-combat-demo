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
    current_hp: u32,
    total_hp: u32,
    attack: u32,
    name: String,
    // TODO: alive/dead state
}

#[wasm_bindgen]
impl Entity {
    pub fn new(current_hp_val: u32, total_hp_val: u32, attack_val: u32, name_val: String) -> Entity {
        Entity {
            current_hp: current_hp_val,
            total_hp: total_hp_val,
            attack: attack_val,
            name: name_val,
        }
    }

    pub fn get_current_hp(&self) -> u32 {
        self.current_hp
    }

    pub fn get_total_hp(&self) -> u32 {
        self.total_hp
    }

    pub fn get_attack(&self) -> u32 {
        self.attack
    }

    pub fn get_name(&self) -> String {
        self.name.clone()
    }

    pub fn set_current_hp(&mut self, new_hp: u32) {
        Self::reduce_current_hp(Self::borrow_current_hp(self), new_hp)
    }

    fn reduce_current_hp(current_hp: &mut u32, reduce_value: u32) {
        // TODO: prevent being set to less than 0
        *current_hp = *current_hp - reduce_value
    }

    fn borrow_current_hp(&mut self) -> &mut u32 {
        &mut self.current_hp
    }
}