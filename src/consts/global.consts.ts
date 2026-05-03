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
  },
  attack: {
    name: "Attack",
    component: AttkIcon,
  },
  defense: {
    name: "Defense",
    component: DefIcon,
  },
  spAttack: {
    name: "Sp. Atk",
    component: SpAttkIcon,
  },
  spDefense: {
    name: "Sp. Def",
    component: SpDefIcon,
  },
  speed: {
    name: "Speed",
    component: SpdIcon,
  },
}
