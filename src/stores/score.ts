import { Game } from "@/models/Entity";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useScoreStore = defineStore("score", () => {
    const game = new Game();
    const data = reactive(game);


    function validRound() {
        data.validRound();
    }

    return {
        data,
        validRound
    }
});