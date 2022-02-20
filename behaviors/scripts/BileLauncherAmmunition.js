import { world } from "mojang-minecraft"

let bileLauncherAmmo = [
    "minecraft:beef",
    "minecraft:cooked_beef",
    "minecraft:chicken",
    "minecraft:cooked_chicken",
    "minecraft:mutton",
    "minecraft:cooked_mutton",
    "minecraft:porkchop",
    "minecraft:cooked_porkchop",
    "minecraft:rabbit",
    "minecraft:cooked_rabbit",
    "minecraft:cod",
    "minecraft:cooked_cod",
    "minecraft:salmon",
    "minecraft:cooked_salmon",
    "minecraft:tropical_fish",
    "minecraft:pufferfish",
    "minecraft:rotten_flesh",
    "borgy:raw_alien_meat",
    "borgy:cooked_alien_meat",
    "borgy:raw_headcrab",
    "borgy:cooked_headcrab"
]

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

function removeOneAtATime(player, searchedItem) {
    const container = player.getComponent("minecraft:inventory").container;
    for (let i = 0; i < 36; i++){
        const item = container.getItem(i);
        try {
            if (item.id == searchedItem) {
                world.getDimension('overworld').runCommand(`clear @a[name="${player.name}", tag=usedBileLauncherAmmo] ${searchedItem} 0 1`);
                world.getDimension('overworld').runCommand(`tag @a[name="${player.name}"] remove usedBileLauncherAmmo`);
            }
        }
        catch (e) {
            continue;
        }
    }
};

world.events.tick.subscribe((ev) => {
    let players = Array.from(world.getPlayers());
    for (let j = 0; j <= players.length; j++) {
        for (let l = 0; l <= bileLauncherAmmo.length; l++) {
            if (l < bileLauncherAmmo.length) {
                if (checkForItems(players[j], bileLauncherAmmo[l])) {
                    world.getDimension('overworld').runCommand(`event entity @a[name="${players[j].name}", tag=hasBileLauncher] borgy:has_bile_launcher_ammo`);
                    break;
                }
            }
            else {
                world.getDimension('overworld').runCommand(`event entity @a[name="${players[j].name}"] borgy:no_ammo`);
            }
        }
        for (let m = 0; m <= bileLauncherAmmo.length; m++) {
            if(checkForItems(players[j], bileLauncherAmmo[m])) {
                removeOneAtATime(players[j], bileLauncherAmmo[m]);
                break;
            }
        }
    }
});