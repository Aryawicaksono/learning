export class Task {
  constructor(name, isCompleted = false){
    this.id = String(Date.now());
    this.name = name;
    this.isCompleted = isCompleted;
    this.isEditing = false;
  }
}