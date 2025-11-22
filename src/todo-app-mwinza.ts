import { JSONFilePreset } from 'lowdb/node';

const list = await JSONFilePreset('tasks.json', { tasks: [] })
type taskBody = {
  name: string,
  completed: boolean
}

let active: boolean = true;


function main(): void {
  while (active){

  }
}

function addTask(): void {

}

function viewTasks(): void {

}

function markAsComplete(): void {

}

function deleteTask(): void {

}

function exit(): void {
  active = false;
}

