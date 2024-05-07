export class AppointmentManager {
  appointmentList: IAppointmentOfDay[];
  activeHours: IHour[];
  constructor() {
    this.appointmentList= [];
    this.activeHours = this.createActiveHoursforAppointment();
  }
  createAppointmentsOfDay(currentDate: Date) {
    const date = currentDate || new Date();

    let appointmentsOfDay = Array.from(Array(24).keys()).map((index) => ({
      title: '',
      description: '',
      date: new Date(date.setHours(index, 0, 0)),
    }));
    this.appointmentList.push({ date: currentDate, appointments: appointmentsOfDay });
    return this.appointmentList.find((dateEvent:IAppointmentOfDay) => this.isSameDates(dateEvent.date, currentDate));;
  }

  isAppointmentsOfDayExisted(currentDate: Date): boolean{
    let result =this.appointmentList.find((dateEvent:IAppointmentOfDay) => this.isSameDates(dateEvent.date, currentDate));
    return !!result;
  }

  createActiveHoursforAppointment(){
    return Array.from(Array(24).keys()).map((index) => ({
      name: index.toString() + ':00',
      time: index.toString(),
    }));
  }

  isSameDates(firstDate: Date, secondDate: Date): boolean {
    const firstYear = firstDate.getFullYear();
    const firstMonth = firstDate.getMonth();
    const firstDay = firstDate.getDate();
    const secondYear = secondDate.getFullYear();
    const secondMonth = secondDate.getMonth();
    const secondDay = secondDate.getDate();

    switch (true) {
      case firstYear === secondYear &&
        firstMonth === secondMonth &&
        firstDay === secondDay:
        return true;
      case firstYear < secondYear ||
        (firstYear === secondYear && firstMonth < secondMonth) ||
        (firstYear === secondYear &&
          firstMonth === secondMonth &&
          firstDay < secondDay):
        // "firstDate is earlier than secondDate.";
        return false;
      default:
        // "firstDate is later than secondDate.";
        return false;
    }
  }

  registerOrUpdateAppointment(result: any, index: any){
    let appointmentsOfDay: IAppointmentOfDay | undefined = this.appointmentList.find((dateEvent:IAppointmentOfDay) => this.isSameDates(dateEvent.date, result.date));

    if (appointmentsOfDay) {
      appointmentsOfDay.appointments[index] = {...result, date: appointmentsOfDay.appointments[index].date, hasEvent: true };
    } else {
      let newAppointmentsOfDay: IAppointmentOfDay = {
        date : new Date(result.date.setHours(index, 0, 0)),
        appointments:[{ ...result, date: new Date(result.date.setHours(index, 0, 0)), hasEvent: true }]
      };
      this.appointmentList.push(newAppointmentsOfDay);
    }
  }
}

export interface IAppointment {
  title: string;
  description?: string;
  date: Date;
  hasEvent?: boolean;
}

export interface IHour {
  name: string;
  time: string;
  event?: IAppointment;
}

export interface IAppointmentOfDay {
  date: Date;
  appointments: IAppointment[];
}
