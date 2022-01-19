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

function hasTag(player, tag, dimension) {
    try {
        let msg = Commands.run(`tag "${player.name}" list`, World.getDimension(dimension ?? 'overworld')).statusMessage;
        let msgSplited = msg.split(":");
        let playerTags = msgSplited.length > 1 ? msgSplited[1].match(/§a(.*?)§r/)[1].trim().split(",") : [];
        
        return playerTags.find(it => it == tag) ? true : false;
    } 
    catch (e) {}
}

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
                Commands.run(`clear @a[name="${player.name}", tag=usedBileLauncherAmmo] ${searchedItem} 0 1`, World.getDimension('overworld'));
                Commands.run(`tag @a[name="${player.name}"] remove usedBileLauncherAmmo`, World.getDimension('overworld'));
            }
        }
        catch (e) {
            continue;
        }
    }
};

World.events.tick.subscribe((ev) => {
    let players = World.getPlayers();
    for (let j = 0; j <= players.length; j++) {
        for (let l = 0; l <= bileLauncherAmmo.length; l++) {
            if (l < bileLauncherAmmo.length) {
                if (checkForItems(players[j], bileLauncherAmmo[l])) {
                    Commands.run(`event entity @a[name="${players[j].name}", tag=hasBileLauncher] borgy:has_bile_launcher_ammo`, World.getDimension('overworld'));
                    break;
                }
            }
            else {
                Commands.run(`event entity @a[name="${players[j].name}"] borgy:no_ammo`, World.getDimension('overworld'));
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