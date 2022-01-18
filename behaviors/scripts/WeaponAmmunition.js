import { World, Commands } from "mojang-minecraft"

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

World.events.tick.subscribe((ev) => {
    let players = World.getPlayers();
    for (let j = 0; j <= players.length; j++) {
        //for headcrab launcher ammo
        try {
            if (checkForItems(players[j], "minecraft:ender_pearl")) {
                Commands.run(`say headcrab launcher ammo`, World.getDimension('overworld'));
                Commands.run(`tag "${players[j].name}" add hasHeadcrabLauncherAmmo`, World.getDimension('overworld'));
            }
            else {
                Commands.run(`tag "${players[j].name}" remove hasHeadcrabLauncherAmmo`, World.getDimension('overworld'));
            }
        }
        catch (e) {
            continue;
        }
        
        //for sonic cannon ammo
        try {
            if (checkForItems(players[j], "minecraft:redstone")) {
                Commands.run(`say sonic cannon ammo`, World.getDimension('overworld'));
                Commands.run(`tag "${players[j].name}" add hasSonicCannonAmmo`, World.getDimension('overworld'));
            }
            else {
                Commands.run(`tag "${players[j].name}" remove hasSonicCannonAmmo`, World.getDimension('overworld'));
            }
        }
        catch (e) {
            continue;
        }

        //for bile launcher ammo
        for (let l = 0; l <= bileLauncherAmmo.length; l++) {
            if (l < bileLauncherAmmo.length) {
                if (checkForItems(players[j], bileLauncherAmmo[l])) {
                    Commands.run(`say bile launcher ammo`, World.getDimension('overworld'));
                    Commands.run(`tag "${players[j].name}" add hasBileLauncherAmmo`, World.getDimension('overworld'));
                    break;
                }
            }
            else {
                Commands.run(`tag "${players[j].name}" remove hasBileLauncherAmmo`, World.getDimension('overworld'));
            }
        }
    }
});