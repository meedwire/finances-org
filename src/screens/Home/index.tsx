import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useValue } from 'react-native-redash';

import { Colors } from '../../Constants';
import { ContextScreen } from '../../Contexts';
import { TypeAccount, TypeConfig, TypeSpending } from '../../GlobalTypes';
import { GetRecenBalance } from '../../Helpers';
import { money } from '../../Utils';
import AnimatedColumn from '../../components/AnimatedColumn';
import ListItemTransations from '../../components/ListItemTransations';
import SelectButton from '../../components/SelectButton';
import { Text } from '../../components/Text';
import getRealm from '../../schemas';
import SvgBack from './SvgBack';
import styles from './styles';

const Home: React.FC = () => {
  const [currBalance, setCurrBalance] = useState(200.4);
  const navigation = useNavigation();
  const { setActiveScreen } = useContext(ContextScreen);

  const [data, setData] = useState<TypeSpending[]>();
  const opacity = useValue(1);

  async function loadData(): Promise<void> {
    try {
      const realm = await getRealm();

      // realm.write(() => {
      //   realm.create('Balance', {
      //     id: realm.objects('Balance').length + 1,
      //     value: 2500.45,
      //     type: 'MONEY',
      //     description: '1',
      //     created: new Date(),
      //   });
      // });

      const currbank = realm.objects<TypeConfig>('Config');

      const spendings = realm
        .objects<TypeSpending>('Spending')
        .sorted('id', true)
        .map((sp) => sp);

      if (currbank.length > 0) {
        const [bal] = realm
          .objects<TypeAccount>('Accounts')
          .filtered('type == $0', currbank[0].currAccount);
        if (bal) {
          setCurrBalance(bal.value);
        }
      } else {
        const bal = GetRecenBalance(realm, '1');
        if (bal) {
          setCurrBalance(bal.value);
        }
      }

      setData(spendings);
      realm.removeAllListeners();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    (async () => {
      const realm = await getRealm();
      realm.addListener('change', () => {
        loadData();
      });
    })();
  }, []);

  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      setActiveScreen({ name: 'Home', isActive: true });
    });

    return focus;
  }, [navigation, setActiveScreen]);

  async function handleChangeBank(value: {
    text: string;
    value: string;
  }): Promise<void> {
    try {
      const realm = await getRealm();
      const bal = GetRecenBalance(realm, value.value);
      const [currbank] = realm.objects<TypeConfig>('Config');

      console.log('CurrentBank', currbank);

      if (currbank) {
        realm.write(() => {
          currbank.currAccount = value.value;
        });
      } else {
        realm.write(() => {
          realm.create<TypeConfig>('Config', {
            id: realm.objects('Config').length + 1,
            currAccount: value.value,
          });
        });
      }

      if (bal) {
        setCurrBalance(bal?.value);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <LinearGradient colors={[Colors.BG, Colors.CYAN]} style={styles.container}>
      <StatusBar animated backgroundColor={Colors.CYAN} />
      <View style={styles.boxHeader}>
        <Text style={styles.textWallet}>Carteira</Text>
      </View>
      <View style={styles.boxResume}>
        <View style={styles.boxContentResume}>
          <Text lite size={25}>
            Balanço
          </Text>
          <Text size={35} style={styles.textBalance}>
            {money(currBalance)}
          </Text>
          <SelectButton
            minWidth={200}
            values={[
              { value: '0', text: 'BRADESCO' },
              { value: '1', text: 'CAIXA' },
            ]}
            selectedValue={handleChangeBank}
          />
        </View>
        <View />
        <AnimatedColumn {...{ opacity }} />
        <View style={styles.containerSvg}>
          <SvgBack />
        </View>
      </View>
      <FlatList
        style={styles.listTransations}
        contentContainerStyle={styles.listTransationsContent}
        keyExtractor={(item) => String(item.id)}
        data={data}
        renderItem={({ item }) => <ListItemTransations item={item} />}
      />
    </LinearGradient>
  );
};

export default Home;
