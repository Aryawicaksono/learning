import {SegmentedControl} from './segmented-control.js';
import {StatWidget} from './stat-widget.js';
import { TaskForm } from './task-form.js';


const segmentControl = new SegmentedControl(
  document.getElementsByClassName('segmented-control')[0]
);

segmentControl.setSegments(['All', 'Active', 'Completed']);

segmentControl.onSelectSegment = (index)=>{
  console.log(`Clicked segment index is: ${index}`);
}

const taskStatWidget = new StatWidget(
  document.getElementsByClassName('stat-widget')[0]
);

const activeStatWidget = new StatWidget(
  document.getElementsByClassName('stat-widget')[1]
);

const doneStatWidget = new StatWidget(
  document.getElementsByClassName('stat-widget')[2]
)

taskStatWidget.setCount(3);
activeStatWidget.setCount(2);
doneStatWidget.setCount(1);

const taskForm = new TaskForm(
  document.getElementsByClassName('task-form')[0]
);

taskForm.onClickedButton = (inputtedText)=>{
  //create task menggunakan input text
}