import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Params } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { IComponentConfig, ITableConfig } from 'src/app/shared/interfaces/global.interface';
import { IMeeting } from 'src/app/shared/interfaces/meeting.interface';
import { IUserEntities } from 'src/app/shared/interfaces/user.interface';
import { ErrorHandlerService } from 'src/app/shared/services/global-services/toast-service/toast.service';
import { MeetingsService } from 'src/app/shared/services/meetings-service/meetings.service';
import { UsersService } from 'src/app/shared/services/users-service/users.service';

@Component({
  selector: 'app-meetings-page',
  templateUrl: './meetings-page.component.html',
  styleUrls: ['./meetings-page.component.scss']
})
export class MeetingsPageComponent implements OnInit, OnDestroy {
  @Input() item!: any
  @Input() config: IComponentConfig = {
    pageName: 'allMeetings',
    pageType: 'meetings',
    params: {
      tab: 'all',
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
      openCard: true,
      addItem: true
    }
  }

  constructor(
    private readonly meetingsService: MeetingsService,
    private readonly errorHandlerService: ErrorHandlerService,
    private readonly toastController: ToastController,
    private readonly modalController: ModalController,
  ) { }

  meetings: IMeeting[] = []
  subscription: Subscription = new Subscription()

  loadingConfig = {
    isLoading: false,
    showLoader: false
  }

  ngOnInit(): void {
    if(this.item) {
      this.meetings = this.item.meetings
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
    this.subscription.add(this.meetingsService.fetch(this.config.params, this.item?._id, this.config?.pageType).subscribe(
      (meetings: IMeeting[]) => {
        this.meetings = meetings
      },
      (error: any) => this.errorHandlerService.catchError(error),
      () => {
        this.loadingConfig.isLoading = false
        this.loadingConfig.showLoader = false
      }
    ))
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

  async addItem(): Promise<void> {
    const modal = await this.modalController.create({
      component: AddMeeting
    })

    await modal.present()
    const { data } = await modal.onWillDismiss()

    if(data) {
      data.connectedToEssence = this.config.pageType
      this.subscription.add(this.meetingsService.create(data, this.item?._id, this.config).subscribe(
        async (result: IMeeting) => {
          this.meetings.push(result)
          const toast = await this.toastController.create({
            message: 'Встреча успешно создана',
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

  async deleteItem(event: IMeeting) {
    await this.meetingsService.delete([event._id])
    this.fetch({
      startLoad: true,
      startLoader: true,
      concatData: false,
    })

    const toast = await this.toastController.create({
      message: 'Встреча успешно удалёна',
      duration: 2500
    })

    toast.present()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}

@Component({
  selector: 'add-meeting',
  templateUrl: 'dialogs/add-meeting.html'
})
export class AddMeeting implements OnInit {
  constructor(
    public readonly modalController: ModalController,
    private readonly usersService: UsersService
  ) {}

  userEntities!: IUserEntities
  meetingFormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    start: new FormControl(null),
    end: new FormControl(null, Validators.required),
    responsible: new FormControl(null)
  })

  ngOnInit(): void {
    this.userEntities = this.usersService.getUsersWithCurrent()
    this.meetingFormGroup.patchValue({responsible: this.userEntities.currentUser._id})
  }

  onSubmit() {
    this.modalController.dismiss(this.meetingFormGroup.value)
  }
}
