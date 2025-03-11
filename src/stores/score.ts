import { Game } from "@/models/Entity";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useScoreStore = defineStore("score", () => {
    const game = new Game();
    const data = reactive(game);

    function saveData() {
        const json = JSON.stringify(game);
        localStorage.setItem("data", json);
    }

    function loadData() {
        const json = localStorage.getItem("data");
        if (json != null){
            data.fromJson(json);
        }
    }

    function removeData() {
        localStorage.removeItem("data");
        window.location.reload();
    }

    function validRound() {
        data.validRound();
        saveData();
    }


    return {
        data,
        validRound,
        loadData,
        saveData,
        removeData
    }
});