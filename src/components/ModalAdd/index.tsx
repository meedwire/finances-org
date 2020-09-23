import React, {useState, Dispatch, SetStateAction} from 'react';
import {View, Text, StatusBar, TextInput, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useTransition, mix} from 'react-native-redash';
import {Easing} from 'react-native-reanimated';
import SelectButton from '../SelectButton';
import getRealm from '../../schemas';
import {TypeSpending} from '../../GlobalTypes';
import {GetRecenBalance} from '../../Helpers';

interface ModalProps {
  onClose: Dispatch<SetStateAction<boolean>>;
}

const ModalAdd: React.FC<ModalProps> = ({onClose}) => {
  const [show, setShow] = useState(false);
  const [spending, setSpending] = useState<TypeSpending>();
  const transition = useTransition(show, {
    duration: 100,
    easing: Easing.inOut(Easing.circle),
  });

  const scale = mix(transition, 0, 1);

  const Line: React.FC = () => <View style={styles.line} />;
  const TextArea: React.FC = () => (
    <TextInput style={styles.textArea} placeholder="Descrição" multiline />
  );

  async function handleSave() {
    try {
      const realm = await getRealm();
      const data = {
        id: realm.objects('Spending').length + 1,
        type: spending?.type,
        value: spending?.value,
        description: spending?.description,
        full_description: 'Alimentação sabado',
        operation: spending?.operation,
        created: new Date(),
      };

      if (spending?.type === 'MONEY') {
        const balance = GetRecenBalance(realm);
        if (balance && spending?.value) {
          const value = balance[0].value - spending?.value;

          realm.write(() => {
            realm.create('Balance', {
              id: realm.objects('Balance').length + 1,
              value,
              type: 'MONEY',
              description: 'DINHEIRO CONTA CAIXA',
              created: new Date(),
            });
          });
        }
      }

      realm.write(() => {
        realm.create('Spending', data);
      });
      onClose((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.containerOverlay}>
      <StatusBar hidden />
      <View style={styles.containerContent}>
        <Text style={styles.textHeader}>Novo Lançamento</Text>
        <Line />
        <Text style={styles.textLaunch}>LANÇAR ONDE ?</Text>
        <SelectButton
          selectedValue={(v) => {
            if (v === 'CARTÃO CRÉDITO') {
              setSpending((prev) => ({
                ...prev,
                operation: 'NEGATIVE',
                type: 'CREDIT',
              }));
            } else if (v === 'DINHEIRO') {
              setSpending((prev) => ({
                ...prev,
                operation: 'NEGATIVE',
                type: 'MONEY',
              }));
            }
          }}
          values={['CARTÃO CRÉDITO', 'CARTÃO DÉBITO', 'DINHEIRO']}
        />
        <Text style={styles.text}>QUAL O VALOR ?</Text>
        <TextInput
          onChangeText={(text) =>
            setSpending((prev) => ({...prev, value: Number(text)}))
          }
          style={styles.textInput}
          placeholder="R$"
        />
        <Text style={styles.text}>BREVE DESCRIÇÃO</Text>
        <TextInput
          onChangeText={(text) =>
            setSpending((prev) => ({...prev, description: text}))
          }
          style={styles.textInput}
          placeholder="Descrição"
        />
        <Text style={styles.text}>DESCRIÇÃO DETALHADA</Text>
        <TextArea />
        <TouchableOpacity onPress={handleSave} style={styles.button}>
          <Text style={styles.textButton}>LANÇAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export {ModalAdd};
