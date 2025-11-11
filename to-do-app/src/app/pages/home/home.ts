import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AddEditTask } from '../add-edit-task/add-edit-task';
import { TaskService } from '../../services/taskService/task-service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-home',
  imports: [CommonModule, AddEditTask, HttpClientModule],
  providers: [TaskService],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  showAddEditTask: boolean = false;
  tasks: any;

  constructor(private taskService: TaskService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getTasks();
  }

  toggleAddEditTask() {
    this.showAddEditTask = !this.showAddEditTask;
  }

  toggleAddEditTaskAndRefresh() {
    this.showAddEditTask = !this.showAddEditTask;
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe({
      next: (res) => {
        console.log(res);
        this.tasks = res;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.log(`Error while fetching tasks: ${err}`);
      }
    });
  }
}
