export class AppointmentManager {
  appointmentList: IAppointmentOfDay[];
  activeHours: IHour[];
  currentDayAppointments: IAppointmentOfDay;
  constructor() {
    this.appointmentList = [];
    this.currentDayAppointments = { date: new Date(), appointments: [] };
    this.activeHours = this.createActiveHoursforAppointment();
  }
  createAppointmentsOfDay(currentDate: Date) {
    const date = new Date(currentDate.toString()) || new Date();
    const appointmentsOfDay = Array.from(Array(24).keys()).map((index) => ({
      title: '',
      description: '',
      date: new Date(date.setHours(index, 0, 0))
    }));
    this.currentDayAppointments = { date: currentDate, appointments: appointmentsOfDay };
    this.appointmentList.push(this.currentDayAppointments);
  }

  isAppointmentsOfDayExisted(currentDate: Date): boolean {
    const result = this.appointmentList.find((appointment: IAppointmentOfDay) => this.isSameDates(appointment.date, currentDate));
    return !!result;
  }

  createActiveHoursforAppointment() {
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
      case firstYear === secondYear && firstMonth === secondMonth && firstDay === secondDay:
        return true;
      case firstYear < secondYear || (firstYear === secondYear && firstMonth < secondMonth) || (firstYear === secondYear && firstMonth === secondMonth &&
        firstDay < secondDay):
        return false;
      default:
        return false;
    }
  }

  registerOrUpdateAppointment(result: IAppointment, index: number) {
    if (this.currentDayAppointments) {
      this.currentDayAppointments.appointments[index].title = result.title;
      this.currentDayAppointments.appointments[index].description = result.description;
      this.currentDayAppointments.appointments[index].date = result.date;
      this.currentDayAppointments.appointments[index].hasEvent = true;
    }
  }

  getAppintmentOfDay(date: Date): IAppointmentOfDay  {
    const result =  this.appointmentList.find((appointment: IAppointmentOfDay) => this.isSameDates(appointment.date, date));
    if (result) {
      this.currentDayAppointments = result;
    } else {
      this.createAppointmentsOfDay(date);
    }
    return this.currentDayAppointments;
  }

  removeAppointment(index: number) {
    this.currentDayAppointments.appointments[index].hasEvent = false;
    this.currentDayAppointments.appointments[index].title = '';
    this.currentDayAppointments.appointments[index].description = '';
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
  appointment?: IAppointment;
}

export interface IAppointmentOfDay {
  date: Date;
  appointments: IAppointment[];
}
