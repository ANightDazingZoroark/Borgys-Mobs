import { world } from "mojang-minecraft"

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

world.events.tick.subscribe((ev) => {
    let players = Array.from(world.getPlayers());
    for (let j = 0; j <= players.length; j++) {
        if (checkForItems(players[j], "minecraft:redstone")) {
            world.getDimension('overworld').runCommand(`event entity @a[name="${players[j].name}", tag=hasSonicCannon] borgy:has_sonic_cannon_ammo`);
        }
        else {
            world.getDimension('overworld').runCommand(`event entity @a[name="${players[j].name}"] borgy:borgy:no_ammo`);
        }
    }
});