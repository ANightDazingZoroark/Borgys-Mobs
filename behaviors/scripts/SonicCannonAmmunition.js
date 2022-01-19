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
        if (checkForItems(players[j], "minecraft:redstone")) {
            Commands.run(`event entity @a[name="${players[j].name}", tag=hasSonicCannon] borgy:has_sonic_cannon_ammo`, World.getDimension('overworld'));
        }
        else {
            Commands.run(`event entity @a[name="${players[j].name}"] borgy:borgy:no_ammo`, World.getDimension('overworld'));
        }
    }
});