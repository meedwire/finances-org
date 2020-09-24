import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Colors } from '../../Constants';
import { ContextScreen } from '../../Contexts';
import { TypeAccount, TypeConfig, TypeSpending } from '../../GlobalTypes';
import { GetRecenBalance } from '../../Helpers';
import SelectButton from '../../components/SelectButton';
import { Text } from '../../components/Text';
import getRealm from '../../schemas';
import { SvgBack } from './SvgBack';
import styles from './styles';

const AddRelease: React.FC = () => {
  const navigation = useNavigation();
  const [spending, setSpending] = useState<TypeSpending>();

  const { setActiveScreen } = useContext(ContextScreen);

  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      setActiveScreen({ name: 'AddRelese', isActive: true });
    });
    return focus;
  }, [navigation, setActiveScreen]);

  async function handleSave() {
    try {
      const realm = await getRealm();
      const lenght =
        realm
          .objects<TypeSpending>('Spending')
          .map(({ id: prevId }) => Number(prevId)).length === 0
          ? [0]
          : realm
              .objects<TypeSpending>('Spending')
              .map(({ id: prevId }) => Number(prevId));

      const id = Math.max(...lenght);

      const data: TypeSpending = {
        id: id + 1,
        type: spending?.type,
        value: spending?.value,
        description: spending?.description,
        full_description: 'Alimentação sabado',
        operation: spending?.operation,
        created: new Date(),
      };

      const [currBank] = realm.objects<TypeConfig>('Config');

      if (spending?.type === 'MONEY') {
        const balance = GetRecenBalance(realm, currBank.currAccount);
        if (balance && spending?.value) {
          const value = balance.value - spending?.value;

          realm.write(() => {
            realm.create('Spending', data);

            realm.create('Balance', {
              id: realm.objects('Balance').length + 1,
              value,
              type: 'MONEY',
              description: currBank.currAccount,
              created: new Date(),
            });

            const [account] = realm
              .objects<TypeAccount>('Accounts')
              .filtered('type == $0', currBank.currAccount);

            if (account) {
              account.value = value;
            }
          });
        } else {
          const [currValue] = realm
            .objects<TypeAccount>('Accounts')
            .filtered('type == $0', currBank.currAccount);

          const value = currValue.value - spending?.value;

          realm.write(() => {
            realm.create('Spending', data);

            realm.create('Balance', {
              id: realm.objects('Balance').length + 1,
              value,
              type: 'MONEY',
              description: currBank.currAccount,
              created: new Date(),
            });

            const [account] = realm
              .objects<TypeAccount>('Accounts')
              .filtered('type == $0', currBank.currAccount);

            if (account) {
              account.value = value;
            }
          });
        }
        navigation.navigate('Home');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <LinearGradient colors={[Colors.BG, Colors.CYAN]} style={styles.container}>
      <StatusBar backgroundColor={Colors.CYAN} />
      <View style={styles.boxContainer}>
        <Text size={40}>Lançamento</Text>
        <Text size={25} style={styles.textLaunch}>
          Lançar Onde?
        </Text>
        <SelectButton
          selectedValue={(v) => {
            if (v.value === 'CREDIT') {
              setSpending((prev) => ({
                ...prev,
                operation: 'NEGATIVE',
                type: 'CREDIT',
              }));
            } else if (v.value === 'MONEY') {
              setSpending((prev) => ({
                ...prev,
                operation: 'NEGATIVE',
                type: 'MONEY',
              }));
            }
          }}
          values={[
            { text: 'CARTÃO CRÉDITO', value: 'CREDIT' },
            { text: 'CARTÃO DÉBITO', value: '' },
            { text: 'DINHEIRO', value: 'MONEY' },
          ]}
        />
        <Text style={styles.text}>QUAL O VALOR ?</Text>
        <TextInput
          onChangeText={(text) =>
            setSpending((prev) => ({ ...prev, value: Number(text) }))
          }
          style={styles.textInput}
          placeholder="R$"
        />
        <Text style={styles.text}>BREVE DESCRIÇÃO</Text>
        <TextInput
          onChangeText={(text) =>
            setSpending((prev) => ({ ...prev, description: text }))
          }
          style={styles.textInput}
          placeholder="Descrição"
        />
        <Text style={styles.text}>DESCRIÇÃO DETALHADA</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Descrição"
          multiline
          numberOfLines={8}
        />
        <SvgBack />
      </View>

      <TouchableOpacity onPress={handleSave} style={styles.button}>
        <Text style={styles.textButton}>LANÇAR</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export { AddRelease };
