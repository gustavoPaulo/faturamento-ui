import moment from 'moment';

export class Faturamento {

    code: number = 0;
    description: string = '';
    price: number = 0.00;
    dateRelease: string = '';
    type = 'RECEITA';
    registration: string = '';

    static toJson(faturamento: Faturamento): any {

        if (!(faturamento.dateRelease.toString().indexOf('/') > 0) && !faturamento.dateRelease) {
          return {
            ...faturamento,
            dateRelease: moment(faturamento.dateRelease).format('DD/MM/YYYY')
          };
        } else if (!(faturamento.dateRelease.toString().indexOf('/') > 0)
            && !(faturamento.dateRelease.toString().indexOf('/') > 0)) {
              return {
                ...faturamento,
                dateRelease: moment(faturamento.dateRelease).format('DD/MM/YYYY')
              };
        }
        
        return {
          ...faturamento
        };
    }
}