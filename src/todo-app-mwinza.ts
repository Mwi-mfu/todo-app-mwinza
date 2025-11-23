import type { promises } from 'dns';
import { JSONFilePreset } from 'lowdb/node';
import readlinePromises from 'readline/promises';


const rl = readlinePromises.createInterface({
  input: process.stdin,  
  output: process.stdout
});

type taskBody = {
  name: string,
  completed: boolean
}
 
let list: taskBody[] = [];
const db = await JSONFilePreset('tasks.json', { tasks: list });
const todoList = await db.data.tasks;


let active: boolean = true;
await db.read;

async function main() {
  const actions: Array<string> = ['Add task', 'View tasks', 'Mark task as completed', 'Delete task', 'Exit'];
    console.log("==========================================")
    console.log("                TO DO LIST")
    console.log("==========================================\n")

    printListNormal(actions);

    const input: string = await rl.question("PICK AN OPTION: ");


    switch (input) {
      case '1':
        addTask();
        break;
      case '2':
        viewTasksOnly();
        break;
      case '3':
        markAsComplete();
        break;
      case '4':
        deleteTask();
        break;
      case '5':
        console.log("CLOSING APP")
        exited();
        break;
      default:
        console.clear();
        console.log('ENTER A VALID OPTION! (1 - 5)');
        main();
    }
  await db.write();
}
  


function printListTyped(list: Array<taskBody>): void {
  let index: number = 1;
  let end: number = list.length;
  for (let element of list) {
    console.log(`${index}. ${element.name}`);
    index += 1;
  }
}

function printListNormal(list: Array<string>): void {
  let index: number = 1;
  let end: number = list.length;
  for (let element of list) {
    console.log(`${index}. ${element}`);

    index += 1;
  }
}

async function addTask() {
    console.clear();
    console.log("===========================================");
    console.log("                ADD A TASK");
    console.log("===========================================");


    let entry: taskBody;
    
    entry = { name: await rl.question("Enter name of task: "), completed: false};
    await todoList.push(entry);
    db.write();
    main();
}


async function viewTasks() {
  console.clear();
  console.log("====================================================");
  console.log("                THESE ARE YOUR TASKS");
  console.log("====================================================");

  if (todoList.length === 0) {
    console.log('NO TASKS\n');
    main();
  } else {
    printListTyped(todoList);
  }
}


async function viewTasksOnly() {
  console.clear();
  console.log("====================================================");
  console.log("                THESE ARE YOUR TASKS");
  console.log("====================================================");

  if (todoList.length === 0) {
    console.log('NO TASKS\n');
    main();
  } else {
    printListTyped(todoList);
    main();
  }
}


async function markAsComplete() {
  viewTasks();
  if (todoList.length > 0) {
    let elementToComplete = await rl.question("Which task do you want to mark as complete? ");
    const finalElement: number = todoList.length - 1;

  
    if (elementToComplete.match(/^\d+$/)){
      let indexToComplete = Number(elementToComplete) - 1;

      if ((indexToComplete >= 0) && (finalElement >= indexToComplete) && (indexToComplete % 1 === 0) && !((/(DONE)/).test(todoList[indexToComplete]!.name)) ) {
        todoList[indexToComplete]!.completed = true;
        todoList[indexToComplete]!.name = `${(todoList[indexToComplete]!.name)} (DONE)`;;  
        db.write();
        main();

      } else {
        console.clear();
        console.log("ENTER A VALID OPTION OR INCOMPLETE TASK");
        markAsComplete();
      }
      
    } else {
      console.clear();
      console.log("ENTER A VALID OPTION");
      markAsComplete();
    }
  } 
}

async function deleteTask() {
  viewTasks();
  if (todoList.length > 0) {
    let elementToDelete = await rl.question("Which task do you want to delete? ");
  
    const finalElement: number = todoList.length - 1;

  
    if (elementToDelete.match(/^\d+$/)){

      let indexToDelete = Number(elementToDelete) - 1;

      if ((indexToDelete >= 0) && (finalElement >= indexToDelete) && (indexToDelete % 1 === 0)) {
        todoList.splice(indexToDelete, 1);
        db.write();
        main();

      } else {
        console.clear();
        console.log("ENTER A VALID OPTION");
        deleteTask();
      }
      
    } else {
      console.clear();
      console.log("ENTER A VALID OPTION");
      deleteTask();
    }
  } else {
    console.log('No tasks to delete')
  }
}

function exited(): void {
  process.exit(0);
}

main();