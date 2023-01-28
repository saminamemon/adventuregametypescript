#!/user/bin/env node
import inquirer from "inquirer";

import chalkAnimation from "chalk-animation";

const sleep = (ms: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

async function welcome() {
    let title = chalkAnimation.rainbow(" My Adventure Game");
    await sleep(2000);
    title.stop();
}

await welcome();

let running = true;
let enemies = ["Skeleton", "Zombie", "Warrior", "Assassin"];
let maxEnemyHealth = 75;
let enemyAttackDamage = 25;
let health = 100;
let attackDamage = 50;
let numHealthPotions = 3;
let healthPotionHealAmount = 30;
let healthPotionDropChance = 50;

console.log("Welcome to the Dungeon!");

while (running) {
    let enemyHealth = Math.floor(Math.random() * maxEnemyHealth);
    const enemy = enemies[Math.floor(Math.random() * enemies.length)];
    console.log(`\t# ${enemy} has appeared! #\n`);
    console.log(`\tYour HP: ${health}`);
    console.log(`\t${enemy}'s HP: ${enemyHealth}`);
    console.log("\n\tWhat would you like to do?");
    console.log("\t1. Attack");
    console.log("\t2. Drink health potion");
    console.log("\t3. Run!");

    const input = await inquirer.prompt({
        type: "input",
        name: "input",
        message: "Enter your choice"
    });

    if (input.input === "1") {
        const damageDealt = Math.floor(Math.random() * attackDamage);
        const damageTaken = Math.floor(Math.random() * enemyAttackDamage);
        enemyHealth -= damageDealt;
        health -= damageTaken;
        console.log(`\t> You strike the ${enemy} for ${damageDealt} damage.`);
        console.log(`\t> You recieve ${damageTaken} in retaliation!`);
        if (health < 1) {
            console.log("\t> You have taken too much damage, you are too weak to go on!>");
            running = false;
        }
    } else if (input.input === "2") {
        if (numHealthPotions > 0) {
            health += healthPotionHealAmount;
            numHealthPotions--;
            console.log(`\t> You drink a health potion, healing yourself for ${healthPotionHealAmount}.` +
                `\n\t> You have ${health} HP.` +
                `\n\t> You have ${numHealthPotions} Health Potions left\n`);
        } else {
            console.log("\t> You have no health potions left! Defeat enemies for a chance to get one!");
        }
    } else if (input.input === "3") {
                console.log(`\tYou run away from the ${enemy}!`)}}