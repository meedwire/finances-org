import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Colors } from '../../Constants';
import { ContextScreen } from '../../Contexts';
import { TypeAccount } from '../../GlobalTypes';
import { AccountBox } from '../../components/AccountBox';
import Button from '../../components/Button';
import { Text } from '../../components/Text';
import getRealm from '../../schemas';
import { SvgBack } from './SvgBack';
import styles from './styles';

const ConfigScreen: React.FC = () => {
  const [acconunts, setAccounts] = useState<
    Realm.Results<Realm.Object & TypeAccount>
  >();
  const navigation = useNavigation();
  const { setActiveScreen } = useContext(ContextScreen);

  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      setActiveScreen({ name: 'ConfigScreen', isActive: true });
    });
    return focus;
  }, [navigation, setActiveScreen]);

  useEffect(() => {
    async function getData() {
      try {
        const realm = await getRealm();

        // realm.write(() => {
        //   realm.create<TypeAccount>('Accounts', {
        //     id: realm.objects('Accounts').length + 1,
        //     bank: 'BRADESCO',
        //     name: 'CONTA SECUNDARIA',
        //     value: 1636.98,
        //     type: '0',
        //     description: 'Conta de uso dia a dia',
        //     created: new Date(),
        //   });
        // });

        console.log(realm.objects<TypeAccount>('Accounts'));

        setAccounts(realm.objects<TypeAccount>('Accounts'));
      } catch (error) {
        alert(JSON.stringify(error));
      }
    }
    getData();
  }, []);

  return (
    <LinearGradient colors={[Colors.BG, Colors.CYAN]} style={styles.container}>
      <View style={styles.boxContainer}>
        <Text size={40}>Configurações</Text>
        <Text size={25} style={styles.textRegisterAccounts}>
          Contas cadastradas:
        </Text>
        {!!acconunts &&
          acconunts?.map((account) => {
            return <AccountBox key={account.id} account={account} />;
          })}

        <SvgBack />
      </View>
      <Button style={styles.buttonAdd}>
        <Text style={styles.textButtonAdd}>NOVA CONTA</Text>
      </Button>
    </LinearGradient>
  );
};

export { ConfigScreen };
