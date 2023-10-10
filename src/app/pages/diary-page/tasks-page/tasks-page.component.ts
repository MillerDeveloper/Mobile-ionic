import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Params } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { IComponentConfig, ITableConfig } from 'src/app/shared/interfaces/global.interface';
import { ITask } from 'src/app/shared/interfaces/task.interface';
import { IUserEntities } from 'src/app/shared/interfaces/user.interface';
import { ErrorHandlerService } from 'src/app/shared/services/global-services/toast-service/toast.service';
import { TasksService } from 'src/app/shared/services/tasks-service/tasks.service';
import { UsersService } from 'src/app/shared/services/users-service/users.service';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit, OnDestroy {
  @Input() item!: any
  @Input() config: IComponentConfig = {
    pageName: 'allTasks',
    pageType: 'tasks',
    params: {
      tab: this.item ? 'related' : 'personal',
      isSetedFilters: false,
      pageSize: 75,
      pageIndex: 0,
      sortBy: 'dateCreated',
      sortDirection: 'desc'
    }
  }

  @Input() tableConfig: ITableConfig = {
    filters: {
      responsible: true
    },
    itemOptions: {
      deleteItem: true,
      openCard: false,
      addItem: true
    }
  }

  constructor(
    private readonly modalController: ModalController,
    private readonly tasksService: TasksService,
    private readonly toastController: ToastController,
    private readonly errorHandlerService: ErrorHandlerService
  ) { }

  tasks: ITask[] = []
  subscription: Subscription = new Subscription()

  loadingConfig = {
    isLoading: false,
    showLoader: false
  }

  ngOnInit(): void {
    if(this.item) {
      this.tasks = this.item.tasks
    } else {
      this.fetch({
        startLoad: true,
        concatData: false
      })
    }
  }

  fetch(config: any = {
    startLoad: true,
    showLoader: true,
    concatData: false,
    infiniteEvent: null
  }): void {
    this.loadingConfig.isLoading = config.startLoad
    this.loadingConfig.showLoader = config.showLoader
    this.subscription.add(this.tasksService.fetch(this.config.params, this.item?._id, this.config?.pageType).subscribe(
      (tasks: ITask[]) => {
        if(config.concatData) {
          this.tasks = this.tasks.concat(tasks)
        } else {
          this.tasks = tasks
        }

        if(config.infiniteEvent) {
          config.infiniteEvent.target.complete()
        }
      },
      (error: any) => this.errorHandlerService.catchError(error),
      () => {
        this.loadingConfig.isLoading = false
        this.loadingConfig.showLoader = false
      }
    ))
  }

  async addItem(): Promise<void> {
    const modal = await this.modalController.create({
      component: AddTask
    })

    await modal.present()
    const { data } = await modal.onWillDismiss()

    if(data) {
      data.connectedToEssence = this.config.pageType
      this.subscription.add(this.tasksService.create(data, this.item?._id, this.config).subscribe(
        async (result: ITask) => {
          this.tasks.push(result)

          const toast = await this.toastController.create({
            message: 'Задача успешно создана',
            duration: 2500
          })

          toast.present()
          this.fetch({
            startLoad: true,
            showLoader: false,
            concatData: false
          })
        }
      ))
    }
  }

  reloadData(event: any) {
    this.config.params = event.config.params
    const fetchParams = {
      startLoad: event?.reloadConfig?.startLoad ? true : false,
      concatData: event?.reloadConfig?.concatData ? true : false,
      showLoader: event?.reloadConfig?.showLoader ? true : false,
      infiniteEvent: event.event
    }

    this.fetch(fetchParams)
  }

  async deleteItem(event: ITask) {
    await this.tasksService.delete([event._id])
    this.fetch({
      startLoad: true,
      startLoader: true,
      concatData: false,
    })

    const toast = await this.toastController.create({
      message: 'Задача успешно удалёна',
      duration: 2500
    })

    toast.present()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}

@Component({
  selector: 'add-task',
  templateUrl: 'dialogs/add-task.html'
})
export class AddTask implements OnInit {
  constructor(
    public readonly modalController: ModalController,
    private readonly usersService: UsersService
  ) {}

  userEntities!: IUserEntities
  taskFormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null),
    dateStart: new FormControl(null),
    dateEnd: new FormControl(null, Validators.required),
    responsible: new FormControl(null)
  })

  ngOnInit(): void {
    this.userEntities = this.usersService.getUsersWithCurrent()
    this.taskFormGroup.patchValue({responsible: this.userEntities.currentUser._id})
  }

  onSubmit() {
    this.modalController.dismiss(this.taskFormGroup.value)
  }
}
