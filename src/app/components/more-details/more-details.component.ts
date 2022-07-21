import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { bindCallback, Subscription } from 'rxjs';
import { TimelistService } from 'src/app/services/timelist.service';
import { timeInterface, timeSlotInterface } from 'src/app/timeinterface';
import { keywordTypes } from 'src/app/timeinterface';
import * as secret from 'secrets';

@Component({
  selector: 'app-more-details',
  templateUrl: './more-details.component.html',
  styleUrls: ['./more-details.component.css']
})
export class MoreDetailsComponent implements OnInit {

  editorForm!: FormGroup
  detailTopic!: FormGroup
  quillDetails!: any
  fullDetail!: timeSlotInterface
  editMode!: boolean
  addMode!: boolean

  id?: number;
  parentId!: number;
  time!: string;
  reminder!: boolean;
  topic!: string;
  description!: string;
  listCheck!: boolean;
  listItem!: string;
  start!: boolean

  categoryList!: timeInterface[]

  theme!: NgxMaterialTimepickerTheme

  private date = new Date();
  hour: any;
  minute!: string;
  second!: string;
  ampm!: string;
  currentTime!: any;
  clickedCurrentTime!: string;
  diffHours!: number;
  diffMinutes!: number;
  diffTime: any;
  inputTime: any;
  displayTime: any;
  displayLate!: boolean;


  subscription!: Subscription



  config = {
    toolbar: [
      [{ 'size': [] }, { 'align': [] }, 'bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }, 'blockquote', 'code-block', { 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],

    ]
  }

  greyTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#ffffff',
      buttonColor: '#000'
    },
    dial: {
      dialBackgroundColor: '#000',
    },
    clockFace: {
      clockFaceBackgroundColor: '#000000',
      clockHandColor: '#5c5c5c',
      clockFaceTimeInactiveColor: '#fff'
    }
  };



  constructor(
    private timeService: TimelistService
  ) {
    this.subscription = this.timeService.onRefresh().subscribe(value => this.updateCategoryList())
  }

  ngOnInit() {
    this.editMode = false

    this.editorForm = new FormGroup({
      'editor': new FormControl(null),
      'detailTopic': new FormControl(null),
      'detailCategory': new FormControl(null),
      'timePick': new FormControl(null),
    })

    // this.timeService.getTime(keywordTypes.timeslots).subscribe((value) => { this.categoryList = value, console.log(this.categoryList) })



    this.timeService.onGetDetail().subscribe((detail) => {
      this.fullDetail = detail,
        this.id = this.fullDetail.id,
        this.parentId = this.fullDetail.parentId,
        this.time = this.fullDetail.time,
        this.reminder = this.fullDetail.reminder,
        this.topic = this.fullDetail.topic,
        this.description = this.fullDetail.description,
        this.listCheck = this.fullDetail.listCheck,
        this.listItem = this.fullDetail.listItem,
        this.start = this.fullDetail.start;

      const date = new Date()
      this.updateDate(date);
    });

    this.timeService.onGetEdit().subscribe((value) => { this.onEdit(value) })
    this.timeService.onAdd().subscribe((value) => this.onAdd(value))

    setInterval(() => {
      const date = new Date()
      this.updateDate(date);
    }, 1000)

  }



  // //Not Used
  // onSubmit() {
  //   console.log(this.editorForm.get('editor')!.value)
  // }

  onSubmit2() {

    const newRow: timeSlotInterface = {
      id: this.id,
      parentId: this.parentId,
      time: this.time,
      reminder: this.reminder,
      topic: this.topic,
      description: this.description,
      listCheck: this.listCheck,
      listItem: this.listItem,
      start: this.start
    }
    // console.log(newRow)

    //If "Add Task" button is clicked
    if (!this.fullDetail.id) {
      // console.log("not")
      this.addRow(newRow)

    }
    //If "Edit" button is clicked
    else if (this.fullDetail.id) {
      // console.log("yes")
      // console.log(newRow)
      this.updateRow(newRow)

    }
    //When demoMode is "true"
    if (secret.demoMode) {
      //Update local storage session only, backend data will not be changed.
      let storedItem = localStorage.getItem("localTimeSlotList");
      if (storedItem) {
        let localTimeSlotList = JSON.parse(storedItem)
        this.timeService.toggleRefresh(localTimeSlotList)
      }
    }

    //When demoMode is "false"
    else {

      //Toggle time-space to get data from backend 
      this.timeService.getTime(keywordTypes.timeslotsItem).subscribe((value) => (this.timeService.toggleRefresh(value)))
    }


  }
  updateRow(newRow: timeSlotInterface) {


    //When demoMode is "true"
    if (secret.demoMode) {

      //Will not update backend
      let storedItem = localStorage.getItem("localTimeSlotList");
      if (storedItem) {
        let localTimeSlotList = JSON.parse(storedItem)
        // console.log("Before: " + localTimeSlotList)
        let pos = localTimeSlotList.map((val: { id: any; }) => val.id).indexOf(this.id)

        localTimeSlotList[pos].parentId = newRow.parentId
        localTimeSlotList[pos].time = newRow.time
        localTimeSlotList[pos].reminder = newRow.reminder
        localTimeSlotList[pos].topic = newRow.topic
        localTimeSlotList[pos].description = newRow.description
        localTimeSlotList[pos].listCheck = newRow.listCheck
        localTimeSlotList[pos].listItem = newRow.listItem
        localTimeSlotList[pos].start = newRow.start


        // console.log("After: " + localTimeSlotList)
        localStorage.setItem("localTimeSlotList", JSON.stringify(localTimeSlotList))
      }
    }


    //When demoMode is "false"
    else {

      // //Will update backend
      this.timeService.updateTime(newRow).subscribe()
    }


  }

  addRow(newRow: timeSlotInterface) {
    //When demoMode is "true"
    if (secret.demoMode) {

      //Will not update backend
      let storedItem = localStorage.getItem("localTimeSlotList");
      if (storedItem) {
        let localTimeSlotList = JSON.parse(storedItem)
        localTimeSlotList.push(newRow)
        localStorage.setItem("localTimeSlotList", JSON.stringify(localTimeSlotList))
      }
    }
    //When demoMode is "false"
    else {

      //Will update backend
      this.timeService.addTime(newRow).subscribe()
    }

  }

  getColor() {
    if (this.time == keywordTypes.topic1) {
      let style1 = {
        'color': 'black',
        'border-left': '1px groove #c64c40',
        'border-top': '25px solid #c64c40',
        'box-shadow': '1px 4px #c64c40, 0px 1.5px rgb(230, 228, 228)',
      }
      return style1
    }
    if (this.time == keywordTypes.topic2) {
      let style2 = {
        'color': 'black',
        'border-left': '1px groove #f79c7e',
        'border-top': '25px solid #f79c7e',
        'box-shadow': '1px 4px #f79c7e, 0px 1.5px rgb(230, 228, 228)',
      }
      return style2
    }
    if (this.time == keywordTypes.topic3) {
      let style3 = {
        'color': 'black',
        'border-left': '1px groove #2f67b1',
        'border-top': '25px solid #2f67b1',
        'box-shadow': '1px 4px #2f67b1, 0px 1.5px rgb(230, 228, 228)',
      }
      return style3
    }
    if (this.time == keywordTypes.topic4) {
      let style4 = {
        'color': 'black',
        'border-left': '1px groove black',
        'border-top': '25px solid black',
        'box-shadow': '1px 4px black, 0px 1.5px rgb(230, 228, 228)',
      }
      return style4
    }
    else {
      let style = { color: 'black' }
      return style
    }
  }

  getLate() {
    if (this.displayLate) {
      let style = {
        'color': 'red'
      }
    }
    else {
      let style = {
        'color': 'white'
      }
    }

  }

  onEdit(value: boolean) {
    if (this.addMode == true) {
      this.addMode = false
    }
    this.editMode = value
  }

  onAdd(value: boolean) {
    if (this.editMode == true) {
      this.editMode = false
    }
    this.addMode = value
  }


  readMode() {
    this.editMode = false;
    this.addMode = false
  }


  private updateDate(date: Date) {
    if (this.listItem) {
      let convListItem = this.convertTime(this.listItem)
      this.currentTime = new Date(date)
      this.inputTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), convListItem[0], convListItem[1])


      if (this.currentTime > this.inputTime) {
        this.diffTime = ((this.currentTime - this.inputTime) / 60000)
        this.diffMinutes = parseInt('' + (this.diffTime % 60))
        this.diffHours = parseInt('' + (this.diffTime - this.diffMinutes) / 60);
        if (this.diffHours < 1 && this.diffMinutes >= 2) {
          this.displayTime = `${this.diffMinutes} mins ago`
          this.displayLate = true
        }
        else if (this.diffHours < 1 && this.diffMinutes < 2 && this.diffMinutes > 0) {
          this.displayTime = `${this.diffMinutes} min ago`
          this.displayLate = true
        }
        else if (this.diffHours < 2 && this.diffHours >= 1) {
          this.displayTime = `about ${this.diffHours} hour ago`
          this.displayLate = true
        }
        else if (this.diffHours >= 2) {
          this.displayTime = `about ${this.diffHours} hours ago`
          this.displayLate = true
        }
        else {

          this.displayTime = `now`
          this.displayLate = false
        }

      }

      else if (this.currentTime < this.inputTime) {
        this.diffTime = (this.inputTime - this.currentTime) / 60000
        this.diffMinutes = parseInt('' + Math.ceil(this.diffTime % 60))
        this.diffHours = parseInt('' + Math.ceil(this.diffTime - this.diffMinutes) / 60);
        // console.log(this.diffTime)
        // console.log(this.diffHours)
        // console.log(this.diffMinutes)
        if (this.diffHours < 1 && this.diffMinutes >= 2) {
          this.displayTime = `in ${this.diffMinutes} mins`
          this.displayLate = false
        }
        else if (this.diffHours < 2 && this.diffHours >= 1) {
          this.displayTime = `in about ${this.diffHours} hour`
          this.displayLate = false
        }
        else if (this.diffHours >= 2) {
          this.displayTime = `in about ${this.diffHours} hours`
          this.displayLate = false
        }
        else {
          this.displayTime = `in 1 min`
          this.displayLate = false
        }
      }
    }

    else {
      this.displayTime = null
      return
    }


  }

  convertTime(timeValue: string): [number, number] {

    // console.log(timeValue)
    var splitByColon = timeValue.split(":");
    var hoursValue: number = +splitByColon[0];
    let splitForMins = splitByColon[1].split(" ");

    if (splitForMins[1] == "PM") {
      hoursValue += 12;
    }

    //The "+" helps turning minutesValue into number
    let minutesValue: number = +splitForMins[0];

    return [hoursValue, minutesValue]
  }

  getCurrentTime() {

    const date = new Date()
    const hours = date.getHours()
    this.ampm = hours >= 12 ? 'PM' : 'AM' //If hours > 12, then show "PM", else, show "AM"
    let hour12 = hours % 12 //Convert to 12 hour format
    let hourFinal = hour12 ? hour12 : 12 //If hour is 0, then show 12 instead (For 12:00AM, midnight)
    this.hour = hourFinal


    const minute = date.getMinutes()
    this.minute = minute < 10 ? '0' + minute : minute.toString() //If minute is single digit, then add a '0' in front

    const second = date.getSeconds()
    this.second = second < 10 ? '0' + second : second.toString() //If second is single digit, then add a '0' in front
    this.clickedCurrentTime = `${this.hour}:${this.minute} ${this.ampm}`
    return this.clickedCurrentTime
  }

  updateCategoryList() {
    let storedItem = localStorage.getItem("localTimeList");
    if (storedItem) {
      this.categoryList = JSON.parse(storedItem)
    }
  }



}
