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

    let input = await rl.question("PICK AN OPTION: ");

    switch (input) {
      case '1':
        addTask();
        break;
      case '2':
        viewTasks();
        break;
      case '3':
        markAsComplete();
        break;
      case '5':
        exit();
        break
      default:
        console.clear;
        console.log('ENTER A VALID OPTION! (1 - 5)');
        main()
    }
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