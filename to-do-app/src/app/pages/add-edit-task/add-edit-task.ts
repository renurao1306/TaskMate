import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/taskService/task-service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-edit-task',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  providers: [TaskService],
  templateUrl: './add-edit-task.html',
  styleUrl: './add-edit-task.css',
})
export class AddEditTask implements OnInit {
  taskForm: any;
  tasks: any;
  @Output() closeAddEditTask = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      status: ['']
    });
  }

  onTaskSubmit() {
    if (this.taskForm.valid) {
      console.log('Task submitted:: ', this.taskForm.value);
      this.taskService.addTask(this.taskForm.value).subscribe({
        next: (res) => {
          console.log('Successfully added task: ', JSON.stringify(res));
          this.closeAddEditTask.emit();
        },
        error: (err) => {
          console.log('Error while adding task: ', err.message);
        }
      })
    }
  }
}
