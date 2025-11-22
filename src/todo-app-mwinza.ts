import { JSONFilePreset } from 'lowdb/node';
import readline from 'readline/promises';

const db = await JSONFilePreset('tasks.json', { tasks: [] });

const rl = await readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

type taskBody = {
  name: string,
  completed: boolean
}

let active: boolean = true;


async function main() {
  await db.read;
  const actions: Array<string> = ['Add task', 'View tasks', 'Mark task as completed', 'Delete task', 'Exit'];

  while (active){
    console.log("==========================================")
    console.log("                TO DO LIST")
    console.log("==========================================\n\n")

    printList(actions);
  }
}

async function addTask() {

}

async function viewTasks() {

}

async function markAsComplete() {

}

async function deleteTask() {

}

function exit(): void {
  active = false;
}

function printList(list: Array<string>): void {
  let index: number = 1;
  for (let element of list) {
    console.log(`${index}. ${element}`);
  }
}

main();