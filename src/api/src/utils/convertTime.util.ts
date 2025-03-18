import { format } from 'date-fns';

//TODO: Сделать интерфейс

export function convertTimeObject(data: any): any {
  console.log(data);
  return {
    ...data,
    create_at: format(new Date(data.create_at), 'dd.MM.yyyy HH:mm'),
    update_at: format(new Date(data.update_at), 'dd.MM.yyyy HH:mm'),
  };
}

export function convertTimeArray(data: any[]): any[] {
  return data.map((item): any => convertTimeObject(item));
}
