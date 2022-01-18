import { World, Commands } from "mojang-minecraft"

function checkForItems(player, searchedItem) {
    const container = player.getComponent("minecraft:inventory").container;
    for (let i = 0; i <= 36; i++){
        if (i < 36) {
            const item = container.getItem(i);
            try {
                if (item.id == searchedItem) {
                    return true;
                }
            }
            catch (e) {
                continue;
            }
        }
        else {
            return false;
        }
    }
};

World.events.tick.subscribe((ev) => {
    let players = World.getPlayers();
    for (let j = 0; j <= players.length; j++) {
        if (checkForItems(players[j], "minecraft:ender_pearl")) {
            Commands.run(`tag "${players[j].name}" add hasHeadcrabLauncherAmmo`, World.getDimension('overworld'));
        }
        else {
            Commands.run(`tag "${players[j].name}" remove hasHeadcrabLauncherAmmo`, World.getDimension('overworld'));
        }
    }
});