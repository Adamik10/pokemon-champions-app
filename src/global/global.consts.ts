import AttkIcon from "@/assets/AttkIcon.vue"
import DefIcon from "@/assets/DefIcon.vue"
import HpIcon from "@/assets/HpIcon.vue"
import SpAttkIcon from "@/assets/SpAttkIcon.vue"
import SpDefIcon from "@/assets/SpDefIcon.vue"
import SpdIcon from "@/assets/SpdIcon.vue"

export const stats = {
  hp: {
    name: "HP",
    component: HpIcon,
    APIName: "hp",
    key: "hp",
  },
  attack: {
    name: "Attack",
    component: AttkIcon,
    APIName: "attack",
    key: "attack",
  },
  defense: {
    name: "Defense",
    component: DefIcon,
    APIName: "defense",
    key: "defense",
  },
  spAttack: {
    name: "Sp. Atk",
    component: SpAttkIcon,
    APIName: "special-attack",
    key: "spAttack",
  },
  spDefense: {
    name: "Sp. Def",
    component: SpDefIcon,
    APIName: "special-defense",
    key: "spDefense",
  },
  speed: {
    name: "Speed",
    component: SpdIcon,
    APIName: "speed",
    key: "speed",
  },
}

export const pokemonActionButtons = ["mega", "tera", "tailwind"]
