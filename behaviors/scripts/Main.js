import "scripts/BileLauncherAmmunition.js";
import "scripts/HeadcrabLauncherAmmunition.js";
import "scripts/SonicCannonAmmunition.js";
import { world } from "mojang-minecraft"

world.events.tick.subscribe((ev) => {
    world.getDimension('overworld').runCommand(`event entity @a borgy:remove_warning`);
});