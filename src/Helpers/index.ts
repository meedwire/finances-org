import Realm from 'realm';
import {TypeBalance} from '../GlobalTypes';

function GetRecenBalance(realm: Realm, value: string) {
  try {
    const balancesData = realm
      .objects<TypeBalance>('Balance')
      .filtered('description == $0', value);

    const mostRecentValues = balancesData.map((balance) =>
      balance.created.getTime(),
    );

    var largest = Math.max.apply(Math, mostRecentValues);

    const [bal] = realm
      .objects<TypeBalance>('Balance')
      .filtered('created == $0', new Date(largest).toISOString());

    return bal;
  } catch (error) {
    console.log(error);
  }
}

export {GetRecenBalance};
