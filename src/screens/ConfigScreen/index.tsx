import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Colors } from '../../Constants';
import { ContextScreen } from '../../Contexts';
import { TypeAccount } from '../../GlobalTypes';
import { AccountBox } from '../../components/AccountBox';
import Button from '../../components/Button';
import { ModalAdd } from '../../components/ModalAdd';
import { Text } from '../../components/Text';
import getRealm from '../../schemas';
import { SvgBack } from './SvgBack';
import styles from './styles';

const ConfigScreen: React.FC = () => {
  const [acconunts, setAccounts] = useState<TypeAccount[]>();
  const [nothingAccount, setNothingAccount] = useState(false);
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const { setActiveScreen } = useContext(ContextScreen);

  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      setActiveScreen({ name: 'ConfigScreen', isActive: true });
    });
    return focus;
  }, [navigation, setActiveScreen]);

  async function getData() {
    try {
      const realm = await getRealm();
      const data = realm
        .objects<TypeAccount>('Accounts')
        .map(({ type, bank, created, description, id, name, value }) => ({
          type,
          bank,
          created,
          description,
          id,
          name,
          value,
        }));

      if (data.length === 0) {
        setNothingAccount(true);
        return;
      }

      setAccounts(data);
      realm.removeAllListeners();
    } catch (error) {
      Alert.alert('Error:', `Error message: ${JSON.stringify(error)}`);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    (async () => {
      const realm = await getRealm();
      realm.addListener('change', () => getData());
    })();
  }, []);

  return (
    <LinearGradient colors={[Colors.BG, Colors.CYAN]} style={styles.container}>
      <StatusBar animated backgroundColor={Colors.CYAN} />
      <View style={styles.boxContainer}>
        <Text size={40}>Configurações</Text>
        <Text size={25} style={styles.textRegisterAccounts}>
          {!nothingAccount ? 'Contas cadastradas:' : 'Você não possui contas '}
        </Text>
        {acconunts ? (
          acconunts?.map((account) => {
            return <AccountBox key={account.id} account={account} />;
          })
        ) : (
          <View style={styles.boxNothingAccounts}>
            <Text style={styles.textNothingAccount}>
              SEM CONTAS CADASTRADAS
            </Text>
            <EvilIcons name="exclamation" size={80} color={Colors.RED} />
          </View>
        )}

        <SvgBack />
      </View>
      <Button onPress={() => setOpen(true)} style={styles.buttonAdd}>
        <Text style={styles.textButtonAdd}>NOVA CONTA</Text>
      </Button>
      <ModalAdd onClose={setOpen} open={open} />
    </LinearGradient>
  );
};

export { ConfigScreen };
